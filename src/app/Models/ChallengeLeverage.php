<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeLeverage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenge_leverages';

    protected $fillable = [
        'value',
    ];
}
