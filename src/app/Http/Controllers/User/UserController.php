<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Constants\StoragePath;
use App\Constants\UploadedFile;
use App\Facades\Notification;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileUploaderController;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\ForgotPasswordRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\SignupUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\VerifyEmailRequest;
use App\Http\Requests\User\VerifyUserRequest1Request;
use App\Http\Requests\User\VerifyUserRequest2Request;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    public function __construct(JsonResponse $response, public UserService $service)
    {
        parent::__construct($response);
    }

    public function showAuth(): HttpJsonResponse
    {
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function changePassword(ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword(auth()->user(), $request->new_password));
    }

    public function forgotPassword(ForgotPasswordRequest $request): HttpJsonResponse
    {
        $user = $this->service->getByEmail($request->email);
        if (!$user) {
            return $this->onError(['_error' => __('user.email_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }
        return $this->onUpdate($this->service->forgotPassword($user, $request->email));
    }

    public function setLocale(Request $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->setLocale(auth()->user(), $request->_locale));
    }

    public function login(LoginRequest $request): HttpJsonResponse
    {
        return $this->handleLogin(['username' => $request->username, 'password' => $request->password, 'is_active' => 1]);
    }

    public function logout(): HttpJsonResponse
    {
        auth()->logout();
        return $this->onOk();
    }

    public function signup(SignupUserRequest $request): HttpJsonResponse
    {
        if ($this->service->store($request->username, $request->password, $request->name, $request->family, $request->email, null, null, null, Role::USER, 1)) {
            return $this->handleLogin(['username' => $request->username, 'password' => $request->password, 'is_active' => 1]);
        }
        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function loginByGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function loginByGoogleCallback(): HttpJsonResponse
    {
        if (!$googleUser = Socialite::driver('google')->user()) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }
        $user = $this->service->getByEmail($googleUser->email);
        if ($user) {
            return $this->handleLogin(['email' => $googleUser->email, 'is_active' => 1]);
        } else if ($user = $this->service->store($googleUser->email, '', $googleUser->name, '', $googleUser->email, $googleUser->id, $googleUser->avatar, $googleUser->avatar_original, Role::USER, 1)) {
            return $this->handleLogin(['email' => $googleUser->email, 'is_active' => 1]);
        }
        return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
    }

    private function handleLogin(array $data): HttpJsonResponse
    {
        if (!auth()->attempt($data)) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }
        Notification::onLoginSuccess(auth()->user());
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function verifyRequest1(VerifyUserRequest1Request $request): HttpJsonResponse
    {
        if (auth()->user()->verify_request_1_at || auth()->user()->email_verified_at || auth()->user()->verify_request_3_at) {
            return $this->onError(['_error' => __('user.edit_not_allowed'), '_errorCode' => ErrorCode::CLIENT_ERROR]);
        }
        return $this->onUpdate($this->service->verifyRequest1(auth()->user(), $request->name, $request->family, $request->father_name, $request->national_no, $request->identity_no, $request->birth_date, $request->gender));
    }

    public function verifyRequest2(VerifyUserRequest2Request $request): HttpJsonResponse
    {
        if (!auth()->user()->verify_request_1_at || auth()->user()->email_verified_at || auth()->user()->verify_request_3_at) {
            return $this->onError(['_error' => __('user.edit_not_allowed'), '_errorCode' => ErrorCode::CLIENT_ERROR]);
        }
        return $this->onUpdate($this->service->verifyRequest2(auth()->user(), $request->mobile, $request->tel, $request->email, $request->address), ['emailVerifiedAt' => auth()->user()->email_verified_at ? true : false]);
    }

    public function verifyEmail(VerifyEmailRequest $request): HttpJsonResponse
    {
        if (!auth()->user()->verify_request_1_at || auth()->user()->email_verified_at || auth()->user()->verify_request_3_at) {
            return $this->onError(['_error' => __('user.edit_not_allowed'), '_errorCode' => ErrorCode::CLIENT_ERROR]);
        }
        $result = $this->service->verifyEmail(auth()->user(), $request->token);
        if ($result) {
            Notification::onUserEmailVerified(auth()->user());
        }
        return $this->onUpdate($result);
    }

    public function verifyRequest3(Request $request): HttpJsonResponse
    {
        if (!auth()->user()->verify_request_1_at || !auth()->user()->email_verified_at || auth()->user()->verify_request_3_at) {
            return $this->onError(['_error' => __('user.edit_not_allowed'), '_errorCode' => ErrorCode::CLIENT_ERROR]);
        }
        $user = $this->service->get(auth()->user()->id);
        $uploadSelfieResult = (new FileUploaderController(StoragePath::USER_SELFIE))->uploadFile($user, $request, 'selfie', 'selfie_file', 4 * 1024 * 1024, ['image/jpeg', 'image/png']);
        $uploadIdentityResult = (new FileUploaderController(StoragePath::USER_IDENTITY))->uploadFile($user, $request, 'identity', 'identity_file', 4 * 1024 * 1024, ['image/jpeg', 'image/png']);
        $uploadResult = $uploadSelfieResult === UploadedFile::OK && $uploadIdentityResult === UploadedFile::OK ? true : false;
        if ($uploadResult) {
            $result = $this->service->verifyRequest3(auth()->user());
            if ($result) {
                Notification::onUserVerificationRequested(auth()->user());
                return $this->onUpdate(true);
            }
        }
        return $this->onUpdate(false);
    }
}
