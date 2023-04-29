<?php

namespace App\Http\Resources\ChallengeBalance;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeBalanceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'value' => intval($this->value),
        ];
    }
}
