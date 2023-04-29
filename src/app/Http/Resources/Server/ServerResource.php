<?php

namespace App\Http\Resources\Server;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class ServerResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => $this->name,
            'title' => Helper::localeNumbers($this->title),
        ];
    }
}
