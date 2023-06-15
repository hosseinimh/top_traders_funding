<?php

namespace App\Http\Resources\User;

use App\Constants\Locale;
use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => $this->name,
            'family' => $this->family,
            'fatherName' => $this->father_name ?? '',
            'nationalNo' => $this->national_no ?? '',
            'identityNo' => $this->identity_no ?? '',
            'birthDate' => $this->birth_date ?? '',
            'gender' => intval($this->gender),
            'verifyRequest1At' => $this->verify_request_1_at,
            'verifyRequest1AtLocale' => app()->getLocale() === Locale::FA ? ($this->verify_request_1_at ? Helper::faDate2($this->verify_request_1_at) : null) : $this->verify_request_1_at,
            'mobile_country_code' => $this->mobile_country_code,
            'mobile' => $this->mobile ?? '',
            'tel_country_code' => $this->tel_country_code,
            'tel' => $this->tel ?? '',
            'address' => $this->address ?? '',
            'email' => $this->email ?? '',
            'emailToken' => $this->email_token,
            'emailVerifiedAt' => $this->email_verified_at,
            'emailVerifiedAtLocale' => app()->getLocale() === Locale::FA ? ($this->email_verified_at ? Helper::faDate2($this->email_verified_at) : null) : $this->email_verified_at,
            'selfieFile' => $this->selfie_file,
            'identityFile' => $this->identity_file,
            'verifyRequest3At' => $this->verify_request_3_at,
            'verifyRequest3AtLocale' => app()->getLocale() === Locale::FA ? ($this->verify_request_3_at ? Helper::faDate2($this->verify_request_3_at) : null) : $this->verify_request_3_at,
            'verifiedAt' => $this->verified_at,
            'verifiedAtLocale' => app()->getLocale() === Locale::FA ? ($this->verified_at ? Helper::faDate2($this->verified_at) : null) : $this->verified_at,
            'googleId' => $this->google_id,
            'avatar' => $this->avatar,
            'avatarOriginal' => $this->avatar_original,
            'locale' => $this->locale,
            'role' => intval($this->role),
            'isActive' => intval($this->is_active),
            'freeChallengeRegistered' => intval($this->free_challenge_id) > 0 ? 1 : 0,
        ];
    }
}
