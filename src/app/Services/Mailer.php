<?php

namespace App\Services;

use App\Facades\Helper;
use App\Mail\SendUserEmailTokenMail;
use App\Mail\SendUserForgotPasswordMail;
use App\Mail\SendUserSignupMail;
use Exception;
use Illuminate\Support\Facades\Mail;

class Mailer
{
    public static function SendUserSignupMail(string $email, string $username, string $password)
    {
        try {
            Mail::to($email)->send(new SendUserSignupMail($username, $password));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }

    public static function SendUserForgotPasswordMail(string $email, string $username, string $password)
    {
        try {
            Mail::to($email)->send(new SendUserForgotPasswordMail($username, $password));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }

    public static function SendUserEmailTokenMail(string $email, string $token)
    {
        try {
            Mail::to($email)->send(new SendUserEmailTokenMail($token));
        } catch (Exception $e) {
            Helper::logError($e);
        }
    }
}
