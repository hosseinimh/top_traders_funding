<?php

namespace App\Services;

use App\Constants\ChallengeLevel;
use App\Constants\ErrorCode;
use App\Constants\Locale;
use App\Constants\Role;
use App\Constants\Status;
use App\Constants\StoragePath;
use App\Facades\Helper;
use App\Facades\AppMailer;
use App\Models\PersoanlAccessToken;
use App\Models\User as Model;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
    const MAX_SENT_EMAIL_TOKEN_COUNTER = 5;

    public function get(int $id): mixed
    {
        return Model::leftJoin('tbl_challenges', function ($join) {
            $join->on('tbl_users.id', '=', 'tbl_challenges.user_id')->where('role', Role::USER)->where('level', ChallengeLevel::FREE);
        })->where('tbl_users.id', $id)->select('tbl_users.*', 'tbl_challenges.id AS free_challenge_id')->first();
    }

    public function getByEmail(string $email): mixed
    {
        return Model::where('email', $email)->first();
    }

    public function getAdministrator(): mixed
    {
        return Model::where('role', Role::ADMINISTRATOR)->where('is_active', 1)->first();
    }

    public function getPaginate(string|null $username, string|null $name, string|null $family, string|null $email, int $page, int $pageItems): mixed
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->where('email', 'LIKE', '%' . $email . '%')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getPaginateVerifyRequests(int $page, int $pageItems): mixed
    {
        return Model::where('role', Role::USER)->whereNotNull('verify_request_3_at')->whereNull('verified_at')->orderBy('family', 'ASC')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $username, string $password, string $name, string $family, string $email, string|null $googleId, string|null $avatar, string|null $avatarOriginal, int $role, int $isActive): mixed
    {
        $this->throwIfEmailNotUnique($email);
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $isActive = $isActive === Status::ACTIVE ? Status::ACTIVE : Status::NOT_ACTIVE;
        $data = [
            'username' => $username,
            'password' => $password,
            'name' => $name,
            'family' => $family,
            'email' => $email,
            'google_id' => $googleId,
            'avatar' => $avatar,
            'avatar_original' => $avatarOriginal,
            'role' => $role,
            'is_active' => $isActive,
        ];
        $model = Model::create($data);

        if ($model) {
            AppMailer::sendUserSignupMail($email, $username, $password);
        }

        return $model ?? null;
    }

    public function update(Model $model, string $name, string $family, string $email, int $role, int $isActive): bool
    {
        $this->throwIfEmailNotUnique($email, $model);
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $isActive = $isActive === Status::ACTIVE ? Status::ACTIVE : Status::NOT_ACTIVE;
        $data = [
            'name' => $name,
            'family' => $family,
            'email' => $email,
            'role' => $role,
            'is_active' => $isActive,
        ];

        return $model->update($data);
    }

    public function updateByGoogle(Model $model, string $googleId, string $avatar, string $avatarOriginal): bool
    {
        $data = [
            'google_id' => $googleId,
            'avatar' => $avatar,
            'avatar_original' => $avatarOriginal,
        ];
        return $model->update($data);
    }

    public function loginByToken(string $token): bool
    {
        $record = PersoanlAccessToken::where('name', 'google_login')->where('token', $token)->orderBy('id', 'DESC')->first();
        if ($record && Auth::loginUsingId($record->tokenable_id)) {
            PersoanlAccessToken::where('name', 'google_login')->where('tokenable_id', $record->tokenable_id)->delete();
            return true;
        }
        return false;
    }

    public function changePassword(Model $user, string $password): bool
    {
        $password = Hash::make($password);

        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }

    public function forgotPassword(Model $user, string $email): mixed
    {
        $code = Helper::randomString(10);
        if ($this->changePassword($user, $code)) {
            AppMailer::sendUserForgotPasswordMail($email, $user->username, $code);
            return true;
        }
        return false;
    }

    public function setLocale(Model|null $model, string $locale): bool
    {
        $locales = Locale::toArray();
        if (!in_array($locale, $locales) || !$model) {
            return false;
        }

        $data = [
            'locale' => $locale
        ];
        return $model->update($data);
    }

    public function verifyRequest1(Model $model, string $name, string $family, string $fatherName, string $nationalNo, string $identityNo, string $birthDate, int $gender): mixed
    {
        if (app()->getLocale() === Locale::short(Locale::FA)) {
            $year = substr($birthDate, 0, 4);
            $month = substr($birthDate, 4, 2);
            $day = substr($birthDate, 6, 2);
            $jDate = Helper::jalaliToGregorian($year, $month, $day);
            $jDate[1] = $jDate[1] < 10 ? '0' . $jDate[1] : $jDate[1];
            $jDate[2] = $jDate[2] < 10 ? '0' . $jDate[2] : $jDate[2];
            $birthDate = $jDate[0] . '/' . $jDate[1] . '/' . $jDate[2];
        }
        $gender = in_array($gender, [1, 2]) ? $gender : 1;
        $data = [
            'name' => $name,
            'family' => $family,
            'father_name' => $fatherName,
            'national_no' => $nationalNo,
            'identity_no' => $identityNo,
            'birth_date' => $birthDate,
            'gender' => $gender,
            'verify_request_1_at' => date('Y:m:d H:i:s')
        ];
        return $model->update($data);
    }

    public function verifyRequest2(Model $model, string $mobile, string $tel, string $email, string $address): mixed
    {
        $this->throwIfEmailNotUnique($email, $model);
        if ($model->email_verified_at) {
            $token = Helper::randomString(20);
            $data = [
                'mobile' => $mobile,
                'tel' => $tel,
                'address' => $address,
            ];
            return $model->update($data);
        } else {
            $this->throwIfSentEmailTokenExceeded($model);
            $token = Helper::randomString(20);
            $data = [
                'mobile' => $mobile,
                'tel' => $tel,
                'email' => $email,
                'email_token' => $token,
                'sent_email_token_counter' => $model->sent_email_token_counter + 1,
                'address' => $address,
            ];
            if ($model->update($data)) {
                AppMailer::sendUserEmailTokenMail($email, $token);
                return true;
            }
        }
        return false;
    }

    public function verifyEmail(Model $model, string $token): mixed
    {
        if ($model->email_token === $token) {
            $data = [
                'email_verified_at' => date('Y:m:d H:i:s'),
            ];
            return $model->update($data);
        }
        return false;
    }

    public function verifyRequest3(Model $model): mixed
    {
        $data = [
            'verify_request_3_at' => date('Y:m:d H:i:s'),
        ];
        return $model->update($data);
    }

    public function verifyRequest(Model $model): mixed
    {
        $data = [
            'verified_at' => date('Y:m:d H:i:s'),
        ];
        return $model->update($data);
    }

    public function rejectRequest(Model $model, int $rejectReason): mixed
    {
        $selfieFile = $model->selfie_file;
        $identityFile = $model->identity_file;
        $data = [
            'verify_request_1_at' => null,
            'email_token' => null,
            'sent_email_token_counter' => 0,
            'email_verified_at' => null,
            'selfie_file' => null,
            'identity_file' => null,
            'verify_request_3_at' => null,
            'verified_at' => null,
            'reject_reason' => $rejectReason,
        ];
        $result = $model->update($data);
        if ($result) {
            @unlink(storage_path('app') . '/' . StoragePath::USER_SELFIE . '/' . $selfieFile);
            @unlink(storage_path('app') . '/' . StoragePath::USER_IDENTITY . '/' . $identityFile);
        }
        return $result;
    }

    public function count(string|null $username, string|null $name, string|null $family, string|null $email): int
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where('name', 'LIKE', '%' . $name . '%')->where('family', 'LIKE', '%' . $family . '%')->where('email', 'LIKE', '%' . $email . '%')->count();
    }

    public function countVerifyRequests(): int
    {
        return Model::where('role', Role::USER)->whereNotNull('verify_request_3_at')->whereNull('verified_at')->count();
    }

    public function countAll(): int
    {
        return Model::count();
    }

    private function throwIfEmailNotUnique(string $email, mixed $targetModel = null)
    {
        $user = $this->getByEmail($email);
        if (!$user || ($targetModel instanceof Model && $targetModel->id === $user->id)) {
            return;
        }
        throw new Exception(__('user.email_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function throwIfSentEmailTokenExceeded(Model $model)
    {
        if ($model->sent_email_token_counter > UserService::MAX_SENT_EMAIL_TOKEN_COUNTER) {
            throw new Exception(__('user.sent_email_token_exceeded'), ErrorCode::CUSTOM_ERROR);
        }
    }
}
