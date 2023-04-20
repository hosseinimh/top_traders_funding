<?php

namespace App\Services;

use App\Mail\UserForgotPassword;
use Illuminate\Support\Facades\Mail;

class SendMail
{
    public function ForgotPassword(string $to, string $code): mixed
    {
        return Mail::to($to)->send(new UserForgotPassword($code));
    }
}
