<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void sendUserSignupMail(string $email, string $username, string $password)
 * @method static void sendUserForgotPasswordMail(string $email, string $username, string $password)
 * @method static void sendUserEmailTokenMail(string $email, string $token)
 */
class Mailer extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'mailer';
    }
}
