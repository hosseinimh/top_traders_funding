<?php

namespace App\Services;

use App\Mail\SendUserForgotPasswordMail;
use App\Mail\SendUserSignupMail;
use Illuminate\Support\Facades\Mail;

class Mailer
{
    public static function SendUserSignupMail(string $email, string $username, string $password)
    {
        Mail::to($email)->send(new SendUserSignupMail($username, $password));
    }

    public static function SendUserForgotPasswordMail(string $email, string $username, string $password)
    {
        Mail::to($email)->send(new SendUserForgotPasswordMail($username, $password));
    }
}
