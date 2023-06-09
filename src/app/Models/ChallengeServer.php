<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChallengeServer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_challenge_servers';

    protected $fillable = [
        'name',
        'title',
        'free',
        'real',
    ];
}
