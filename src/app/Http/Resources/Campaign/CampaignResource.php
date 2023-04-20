<?php

namespace App\Http\Resources\Campaign;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class CampaignResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => Helper::localeNumbers($this->title),
            'isActive' => intval($this->is_active),
        ];
    }
}
