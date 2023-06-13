<?php

namespace App\Http\Resources\AppRule;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class AppRuleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'title' => $this->title,
            'body' => $this->body,
        ];
    }
}
