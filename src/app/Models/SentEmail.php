<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SentEmail extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_sent_emails';

    protected $fillable = [
        'from',
        'to',
        'type',
        'message_fields',
    ];
}
