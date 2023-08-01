<?php

namespace App\Http\Resources\ChallengeTrade;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeTradeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'challenge_id' => intval($this->challenge_id),
            'deal_id' => intval($this->deal_id),
            'platform' => $this->platform ?? '',
            'type' => intval($this->type),
            'time' => $this->time ?? '',
            'broker_time' => $this->broker_time ?? '',
            'commission' => doubleval($this->commission),
            'swap' => doubleval($this->swap),
            'profit' => doubleval($this->profit),
            'symbol' => $this->symbol ?? '',
            'magic' => intval($this->magic),
            'order_id' => intval($this->order_id),
            'position_id' => intval($this->position_id),
            'reason' => intval($this->reason),
            'entry_type' => intval($this->entry_type),
            'volume' => doubleval($this->volume),
            'price' => doubleval($this->price),
            'account_currency_exchange_rate' => doubleval($this->account_currency_exchange_rate),
            'update_sequence_number' => intval($this->update_sequence_number),
        ];
    }
}
