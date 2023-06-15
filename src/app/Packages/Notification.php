<?php

namespace App\Packages;

use App\Constants\NotificationCategory;
use App\Constants\NotificationPriority;
use App\Constants\NotificationSubCaegory;
use App\Constants\NotificationType;
use App\Models\User;
use App\Services\NotificationService;

class Notification
{
    public function onLoginSuccess(User $user)
    {
        $date = date('Y-m-d');
        $time = date('H:i:s');
        $device = is_numeric(strpos(strtolower($_SERVER["HTTP_USER_AGENT"]), "mobile")) ? 'mobile' : 'pc';
        $messageFields = implode("|", [$date, $time, $device]);
        $service = new NotificationService();
        $service->store($user->id, NotificationType::USER, NotificationCategory::ACCOUNT, NotificationSubCaegory::LOGIN_SUCCEED, $messageFields, NotificationPriority::NORMAL);
    }
}
