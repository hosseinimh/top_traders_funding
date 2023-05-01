<?php

namespace App\Services;

use App\Models\ChallengeRule as Model;

class ChallengeRuleService
{
    public function get(): mixed
    {
        return Model::where('id', 1)->first();
    }

    public function update(int $duration1, int $duration2, int $durationReal, int $durationFree, int $dailySl1, int $dailySl2, int $dailySlReal, int $dailySlFree, int $totalSl1, int $totalSl2, int $totalSlReal, int $totalSlFree, int $target1, int $target2, int $targetReal, int $targetFree, int $tradeDays1, int $tradeDays2, int $tradeDaysReal, int $tradeDaysFree): bool
    {
        $data = [
            'duration_1' => $duration1,
            'duration_2' => $duration2,
            'duration_real' => $durationReal,
            'duration_free' => $durationFree,
            'daily_sl_1' => $dailySl1,
            'daily_sl_2' => $dailySl2,
            'daily_sl_real' => $dailySlReal,
            'daily_sl_free' => $dailySlFree,
            'total_sl_1' => $totalSl1,
            'total_sl_2' => $totalSl2,
            'total_sl_real' => $totalSlReal,
            'total_sl_free' => $totalSlFree,
            'target_1' => $target1,
            'target_2' => $target2,
            'target_real' => $targetReal,
            'target_free' => $targetFree,
            'trade_days_1' => $tradeDays1,
            'trade_days_2' => $tradeDays2,
            'trade_days_real' => $tradeDaysReal,
            'trade_days_free' => $tradeDaysFree,
        ];
        return Model::where('id', 1)->update($data);
    }
}
