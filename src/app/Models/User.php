<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'tbl_users';
    protected $fillable = [
        'username',
        'password',
        'name',
        'family',
        'father_name',
        'national_no',
        'identity_no',
        'birth_date',
        'gender',
        'verify_request_1_at',
        'mobile_country_code',
        'mobile',
        'tel_country_code',
        'tel',
        'email',
        'email_token',
        'sent_email_token_counter',
        'email_verified_at',
        'address',
        'selfie_file',
        'identity_file',
        'verify_request_3_at',
        'verified_at',
        'reject_reason',
        'google_id',
        'avatar',
        'avatar_original',
        'locale',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
    ];

    public function setPasswordAttribute(string $password): void
    {
        $this->attributes['password'] = Hash::make($password);
    }
}
