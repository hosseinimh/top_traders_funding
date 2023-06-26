<?php

namespace App\Http\Resources\User;

use DateTime;
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
            'genderText' => $this->getGenderText(intval($this->gender)),
            'verifyRequest1At' => $this->verify_request_1_at ? (new DateTime($this->verify_request_1_at))->format('Y-m-d H:i:s') : null,
            'mobile_country_code' => $this->mobile_country_code,
            'mobile' => $this->mobile ?? '',
            'tel_country_code' => $this->tel_country_code,
            'tel' => $this->tel ?? '',
            'address' => $this->address ?? '',
            'email' => $this->email ?? '',
            'emailToken' => $this->email_token,
            'emailVerifiedAt' => $this->email_verified_at ? (new DateTime($this->email_verified_at))->format('Y-m-d H:i:s') : null,
            'selfieFile' => $this->selfie_file,
            'identityFile' => $this->identity_file,
            'verifyRequest3At' => $this->verify_request_3_at ? (new DateTime($this->verify_request_3_at))->format('Y-m-d H:i:s') : null,
            'verifiedAt' => $this->verified_at ? (new DateTime($this->verified_at))->format('Y-m-d H:i:s') : null,
            'googleId' => $this->google_id,
            'avatar' => $this->avatar,
            'avatarOriginal' => $this->avatar_original,
            'locale' => $this->locale,
            'role' => intval($this->role),
            'isActive' => intval($this->is_active),
            'freeChallengeRegistered' => intval($this->free_challenge_id) > 0 ? 1 : 0,
        ];
    }

    private function getGenderText(int $gender)
    {
        $text = __('general.gender_undefined');

        if ($gender >= 1 && $gender <= 2) {
            $text = __('general.gender_' . $gender);
        }

        return $text;
    }
}
