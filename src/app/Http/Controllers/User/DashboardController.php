<?php

namespace App\Http\Controllers\User;

use App\Constants\NotificationType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationResource;
use App\Packages\JsonResponse;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function index(): HttpJsonResponse
    {
        $notificationService = new NotificationService();
        $systemNotifications = $notificationService->getReview(auth()->user()->id, NotificationType::SYSTEM);
        $userNotifications = $notificationService->getReview(auth()->user()->id, NotificationType::USER);
        $data = ['systemNotifications' => NotificationResource::collection($systemNotifications), 'userNotifications' => NotificationResource::collection($userNotifications)];
        return $this->onItems($data);
    }
}
