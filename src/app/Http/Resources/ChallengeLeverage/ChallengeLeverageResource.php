<?php

namespace App\Http\Resources\ChallengeLeverage;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeLeverageResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'value' => intval($this->value),
        ];
    }
}
