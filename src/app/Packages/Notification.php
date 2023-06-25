<?php

namespace App\Packages;

use App\Constants\NotificationCategory;
use App\Constants\NotificationPriority;
use App\Constants\NotificationSubCaegory;
use App\Constants\NotificationType;
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

    public function onTicketRegistered(int $ticketId, string $subject, string $name, string $family, string $username): void
    {
        $userService = new UserService();
        $administrator = $userService->getAdministrator();
        $subject = str_replace("|", " ", $subject);
        $messageFields = implode("|", [$ticketId, $subject, $name, $family, $username]);
        $service = new NotificationService();
        $service->store($administrator->id, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_REGISTERED, $messageFields, NotificationPriority::NORMAL);
    }

    public function onTicketAnswered(int $ticketId, string $subject, int $administratorId, int $userId): void
    {
        $subject = str_replace("|", " ", $subject);
        $messageFields = implode("|", [$ticketId, $subject, $administratorId]);
        $service = new NotificationService();
        $service->store($userId, NotificationType::USER, NotificationCategory::TICKET, NotificationSubCaegory::TICKET_ANSWERED, $messageFields, NotificationPriority::NORMAL);
    }
}
