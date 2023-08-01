<?php

namespace App\Mail;

use App\Constants\Locale;
use Illuminate\Mail\Mailable;

class SendUserSignupMail extends Mailable
{
    public function __construct(private string $username, private string $password)
    {
    }

    public function build()
    {
        $locale = session('_locale', Locale::FA);
        $dir = $locale === Locale::FA ? 'rtl' : 'ltr';
        $locale = Locale::short($locale);
        $username = $this->username;
        $password = $this->password;
        return $this->subject(__('user.signup_subject'))
            ->view('emails.user.signup', compact('locale', 'dir', 'username', 'password'));
    }
}
