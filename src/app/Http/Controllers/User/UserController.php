<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\ForgotPasswordRequest;
use App\Http\Requests\User\LoginUserRequest as LoginRequest;
use App\Http\Requests\User\SignupUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

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

    public function update(UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update(auth()->user(), $request->name, $request->family, auth()->user()->email, Role::USER, 1));
    }

    public function changePassword(ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword(auth()->user(), $request->new_password));
    }

    public function forgotPassword(ForgotPasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->forgotPassword($request->email));
    }

    public function setLocale(Request $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->setLocale(auth()->user(), $request->_locale));
    }

    public function login(LoginRequest $request): HttpJsonResponse
    {
        if (!$this->handleLogin($request->username, $request->password)) {
            return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
        }
        return $this->onItem($this->service->get(auth()->user()->id));
    }

    public function logout(): HttpJsonResponse
    {
        auth()->logout();

        return $this->onOk();
    }

    public function signup(SignupUserRequest $request): HttpJsonResponse
    {
        if ($this->service->store($request->username, $request->password, $request->name, $request->family, $request->email, Role::USER, 1)) {
            if (!$this->handleLogin($request->username, $request->password)) {
                return $this->onError(['_error' => __('user.user_not_found'), '_errorCode' => ErrorCode::USER_NOT_FOUND]);
            }
            return $this->onItem($this->service->get(auth()->user()->id));
        }
        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    private function handleLogin(string $username, string $password): bool
    {
        if (!auth()->attempt(['username' => $username, 'password' => $password, 'role' => Role::USER, 'is_active' => 1])) {
            return false;
        }

        return true;
    }
}
