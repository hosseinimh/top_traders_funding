<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void onLoginSuccess(User $user)
 * @method static void onUserEmailVerified(User $user)
 * @method static void onUserVerificationRequested(User $user)
 * @method static void onUserVerificationVerified(User $administrator, User $user)
 * @method static void onUserVerificationRejected(User $administrator, User $user, int $rejectReason)
 * @method static void onTicketUserRegistered(Ticket $ticket, User $user)
 * @method static void onTicketThreadUserRegistered(Ticket $ticket, User $user)
 * @method static void onTicketAdministratorRegistered(Ticket $ticket, User $administrator)
 * @method static void onTicketThreadAdministratorRegistered(Ticket $ticket, User $administrator)
 */
class Notification extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'notification';
    }
}
