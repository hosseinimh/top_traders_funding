<?php

namespace App\Http\Resources\ChallengeServer;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeServerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name,
            'title' => Helper::localeNumbers($this->title),
            'free' => intval($this->free),
            'real' => intval($this->real),
        ];
    }
}
