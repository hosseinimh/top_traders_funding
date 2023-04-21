<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \App\Services\SendMail ForgotPassword(string $email, string $code)
 */
class SendMail extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'send_mail';
    }
}
