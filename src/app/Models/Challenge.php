<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Challenge extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenges';

    protected $fillable = [
        'user_id',
        'server_id',
        'balance_id',
        'leverage_id',
        'platform_id',
        'level',
        'status',
        'account_no',
        'password',
        'investor_password',
        'meta_api_token',
        'meta_api_account_id',
        'equity',
    ];
}
