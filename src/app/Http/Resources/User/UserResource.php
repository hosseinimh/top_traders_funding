<?php

namespace App\Http\Resources\User;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'username' => $this->username,
            'name' => Helper::localeNumbers($this->name),
            'family' => Helper::localeNumbers($this->family),
            'email' => $this->email,
            'googleId' => $this->google_id,
            'avatar' => $this->avatar,
            'avatarOriginal' => $this->avatar_original,
            'role' => intval($this->role),
            'isActive' => intval($this->is_active),
            'freeChallengeRegistered' => intval($this->free_challenge_id) > 0 ? 1 : 0,
        ];
    }
}
