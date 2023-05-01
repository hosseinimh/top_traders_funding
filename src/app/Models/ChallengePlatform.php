<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengePlatform extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenge_platforms';

    protected $fillable = [
        'value',
    ];
}
