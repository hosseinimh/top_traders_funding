<?php

namespace App\Services;

use App\Constants\ChallengeLevel;
use App\Constants\ErrorCode;
use App\Constants\Locale;
use App\Constants\Role;
use App\Constants\Status;
use App\Facades\Helper;
use App\Facades\SendMail;
use App\Models\User as Model;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserService
{
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

    public function getPaginate(string|null $username, string|null $name, string|null $email, int $page, int $pageItems): mixed
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where(function ($query) use ($name) {
            $query->where('name', 'LIKE', '%' . $name . '%')->orWhere('family', 'LIKE', '%' . $name . '%');
        })->where('email', 'LIKE', '%' . $email . '%')->orderBy('name', 'ASC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $username, string $password, string $name, string $family, string $email, int $role, int $isActive): mixed
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
            'role' => $role,
            'is_active' => $isActive,
        ];
        $model = Model::create($data);

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

    public function changePassword(Model $user, string $password): bool
    {
        $password = Hash::make($password);

        return DB::statement("UPDATE `tbl_users` SET `password`='$password' WHERE `id`=$user->id");
    }

    public function setLocale(Model|null $model, string $locale): bool
    {
        $locales = [Locale::EN, Locale::FA];
        if (!in_array($locale, $locales) || !$model) {
            return false;
        }

        $data = [
            'locale' => $locale
        ];
        return $model->update($data);
    }

    public function forgotPassword(string $email): mixed
    {
        $code = Helper::randomNumbersString(6);
        SendMail::ForgotPassword($email, $code);
    }

    public function count(string|null $username, string|null $name, string|null $email): int
    {
        return Model::where('username', 'LIKE', '%' . $username . '%')->where(function ($query) use ($name) {
            $query->where('name', 'LIKE', '%' . $name . '%')->orWhere('family', 'LIKE', '%' . $name . '%');
        })->where('email', 'LIKE', '%' . $email . '%')->count();
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
}
