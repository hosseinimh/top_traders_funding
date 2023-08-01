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
        $dir = $locale === Locale::FA ? 'rtl' : 'ltr';
        $locale = Locale::short($locale);
        $token = $this->token;
        return $this->subject(__('user.email_token_subject'))
            ->view('emails.user.email_token', compact('locale', 'dir', 'token'));
    }
}
