<?php

namespace App\Http\Resources\ChallengeRule;

use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeRuleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'duration1' => intval($this->duration_1),
            'duration2' => intval($this->duration_2),
            'durationReal' => intval($this->duration_real),
            'durationFree' => intval($this->duration_free),
            'dailySl1' => intval($this->daily_sl_1),
            'dailySl2' => intval($this->daily_sl_2),
            'dailySlReal' => intval($this->daily_sl_real),
            'dailySlFree' => intval($this->daily_sl_free),
            'totalSl1' => intval($this->total_sl_1),
            'totalSl2' => intval($this->total_sl_2),
            'totalSlReal' => intval($this->total_sl_real),
            'totalSlFree' => intval($this->total_sl_free),
            'target1' => intval($this->target_1),
            'target2' => intval($this->target_2),
            'targetReal' => intval($this->target_real),
            'targetFree' => intval($this->target_free),
            'tradeDays1' => intval($this->trade_days_1),
            'tradeDays2' => intval($this->trade_days_2),
            'tradeDaysReal' => intval($this->trade_days_real),
            'tradeDaysFree' => intval($this->trade_days_free),
        ];
    }
}
