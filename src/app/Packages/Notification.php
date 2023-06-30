<?php

namespace App\Packages;

use App\Constants\NotificationCategory;
use App\Constants\NotificationPriority;
use App\Constants\NotificationSubCaegory;
use App\Constants\NotificationType;
use App\Models\Ticket;
use App\Models\User;
use App\Services\NotificationService;
use App\Services\UserService;

class Notification
{
    public function onLoginSuccess(User $user): void
    {
        $device = is_numeric(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]), "mobile")) ? 'mobile' : 'pc';
        $messageFields = $device;
        $service = new NotificationService();
        $service->store($user->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::LOGIN_SUCCEED, $messageFields, NotificationPriority::NORMAL, date('Y-m-d H:i:s'));
    }

    public function onUserEmailVerified(User $user): void
    {
        $messageFields = '';
        $service = new NotificationService();
        $service->store($user->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::USER_EMAIL_VERIFIED, $messageFields, NotificationPriority::NORMAL, date('Y-m-d H:i:s'));
    }

    public function onUserVerificationRequested(User $user): void
    {
        $userService = new UserService();
        $administrator = $userService->getAdministrator();
        $messageFields = implode("|", [$user->name, $user->family, $user->username]);
        $service = new NotificationService();
        $service->store($administrator->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::USER_VERIFICATION_REQUESTED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onUserVerificationVerified(User $administrator, User $user): void
    {
        $messageFields = implode("|", [$administrator->id]);
        $service = new NotificationService();
        $service->store($user->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::USER_VERIFICATION_VERIFIED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onUserVerificationRejected(User $administrator, User $user, int $rejectReason): void
    {
        $messageFields = implode("|", [$administrator->id, $rejectReason]);
        $service = new NotificationService();
        $service->store($user->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::USER_VERIFICATION_REJECTED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onTicketUserRegistered(Ticket $ticket, User $user): void
    {
        $userService = new UserService();
        $administrator = $userService->getAdministrator();
        $subject = str_replace("|", " ", $ticket->subject);
        $messageFields = implode("|", [$ticket->id, $subject, $user->name, $user->family, $user->username]);
        $service = new NotificationService();
        $service->store($administrator->id, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_USER_REGISTERED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onTicketThreadUserRegistered(Ticket $ticket, User $user): void
    {
        $userService = new UserService();
        $administrator = $userService->getAdministrator();
        $subject = str_replace("|", " ", $ticket->subject);
        $messageFields = implode("|", [$ticket->id, $subject, $user->name, $user->family, $user->username]);
        $service = new NotificationService();
        $service->store($administrator->id, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_THREAD_USER_REGISTERED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onTicketAdministratorRegistered(Ticket $ticket, User $administrator): void
    {
        $subject = str_replace("|", " ", $ticket->subject);
        $messageFields = implode("|", [$ticket->id, $subject, $administrator->name, $administrator->family]);
        $service = new NotificationService();
        $service->store($ticket->user_id, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_ADMINISTRATOR_REGISTERED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onTicketThreadAdministratorRegistered(Ticket $ticket, User $administrator): void
    {
        $subject = str_replace("|", " ", $ticket->subject);
        $messageFields = implode("|", [$ticket->id, $subject, $administrator->name, $administrator->family]);
        $service = new NotificationService();
        $service->store($ticket->user_id, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_THREAD_ADMINISTRATOR_REGISTERED, $messageFields, NotificationPriority::NORMAL);
    }
}
