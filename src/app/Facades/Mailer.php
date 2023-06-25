<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void SendUserSignupMail(string $email, string $username, string $password)
 * @method static void SendUserForgotPasswordMail(string $email, string $username, string $password)
 * @method static void SendUserEmailTokenMail(string $email, string $token)
 */
class Mailer extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'mailer';
    }
}
