<?php

namespace App\Http\Resources\ChallengeDeal;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeDealResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'challenge_id' => intval($this->challenge_id),
            'dealId' => $this->deal_id ?? '',
            'platform' => $this->platform ?? '',
            'type' => $this->type ?? '',
            'time' => $this->time ?? '',
            'brokerTime' => $this->broker_time ?? '',
            'commission' => doubleval($this->commission),
            'swap' => doubleval($this->swap),
            'profit' => doubleval($this->profit),
            'symbol' => $this->symbol ?? '',
            'magic' => intval($this->magic),
            'orderId' => $this->order_id ?? '',
            'positionId' => $this->position_id ?? '',
            'reason' => $this->reason ?? '',
            'entryType' => $this->entry_type ?? '',
            'volume' => doubleval($this->volume),
            'price' => doubleval($this->price),
            'accountCurrencyExchangeRate' => doubleval($this->account_currency_exchange_rate),
            'updateSequenceNumber' => intval($this->update_sequence_number),
            'comment' => $this->comment ?? '',
        ];
    }
}
