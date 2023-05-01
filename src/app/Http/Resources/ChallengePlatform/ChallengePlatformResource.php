<?php

namespace App\Http\Resources\ChallengePlatform;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengePlatformResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'value' => $this->value,
            'free' => intval($this->free),
            'real' => intval($this->real),
        ];
    }
}
