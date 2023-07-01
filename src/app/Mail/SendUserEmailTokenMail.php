<?php

namespace App\Mail;

use App\Constants\Locale;
use Illuminate\Mail\Mailable;

class SendUserEmailTokenMail extends Mailable
{
    public function __construct(private string $token)
    {
    }

    public function build()
    {
        $locale = session('_locale', Locale::FA);
        $locale = Locale::short($locale);
        $dir = $locale === Locale::FA ? 'rtl' : 'ltr';
        $token = $this->token;
        return $this->subject(__('user.email_token_subject'))
            ->view('emails.user.email_token', compact('locale', 'dir', 'token'));
    }
}
