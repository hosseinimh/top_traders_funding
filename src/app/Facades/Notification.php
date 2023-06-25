<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void onLoginSuccess(User $user)
 * @method static void onTicketRegistered(int $ticketId, string $subject, string $name, string $family, string $username)
 * @method static void onTicketAnswered(int $ticketId, string $subject, int $administratorId, int $userId)
 */
class Notification extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'notification';
    }
}
