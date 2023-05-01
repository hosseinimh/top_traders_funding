<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeRule extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenge_rules';

    protected $fillable = [
        'duration_1',
        'duration_2',
        'duration_real',
        'duration_free',
        'daily_sl_1',
        'daily_sl_2',
        'daily_sl_real',
        'daily_sl_free',
        'total_sl_1',
        'total_sl_2',
        'total_sl_real',
        'total_sl_free',
        'target_1',
        'target_2',
        'target_real',
        'target_free',
        'trade_days_1',
        'trade_days_2',
        'trade_days_real',
        'trade_days_free',
    ];
}
