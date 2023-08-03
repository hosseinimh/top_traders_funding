<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeDeal extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenge_deals';

    protected $fillable = [
        'challenge_id',
        'deal_id',
        'platform',
        'type',
        'time',
        'broker_time',
        'commission',
        'swap',
        'profit',
        'symbol',
        'magic',
        'order_id',
        'position_id',
        'reason',
        'entry_type',
        'volume',
        'price',
        'account_currency_exchange_rate',
        'update_sequence_number',
        'comment',
    ];
}
