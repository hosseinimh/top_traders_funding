<?php

namespace App\Mail;

use App\Constants\Locale;
use Illuminate\Mail\Mailable;

class SendUserForgotPasswordMail extends Mailable
{
    public function __construct(private string $username, private string $newPassword)
    {
    }

    public function build()
    {
        $locale = session('_locale', Locale::FA);
        $dir = $locale === Locale::FA ? 'rtl' : 'ltr';
        $username = $this->username;
        $password = $this->newPassword;
        return $this->subject(__('user.forgot_password_subject'))
            ->view('emails.user.forgot_password', compact('locale', 'dir', 'username', 'password'));
    }
}
