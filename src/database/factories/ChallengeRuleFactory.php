<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class ChallengeRuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'duration_1' => 30,
            'duration_2' => 60,
            'duration_real' => 0,
            'duration_free' => 7,
            'daily_sl_1' => 5,
            'daily_sl_2' => 5,
            'daily_sl_real' => 5,
            'daily_sl_free' => 5,
            'total_sl_1' => 12,
            'total_sl_2' => 12,
            'total_sl_real' => 12,
            'total_sl_free' => 12,
            'target_1' => 8,
            'target_2' => 4,
            'target_real' => 0,
            'target_free' => 0,
            'trade_days_1' => 5,
            'trade_days_2' => 5,
            'trade_days_real' => 0,
            'trade_days_free' => 5,
        ];
    }
}
