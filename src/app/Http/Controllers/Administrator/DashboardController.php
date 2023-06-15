<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ChallengeStatus;
use App\Constants\NotificationType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationResource;
use App\Packages\JsonResponse;
use App\Services\ChallengeService;
use App\Services\NotificationService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function index(): HttpJsonResponse
    {
        $userService = new UserService();
        $challengeService = new ChallengeService();
        $notificationService = new NotificationService();
        $systemNotifications = $notificationService->getReview(auth()->user()->id, NotificationType::SYSTEM);
        $userNotifications = $notificationService->getReview(auth()->user()->id, NotificationType::USER);
        $data = [
            'usersCount' => $userService->countAll(),
            'verifyUserRequestsCount' => $userService->countVerifyRequests(),
            'waitingChallengesCount' => $challengeService->count(null, ChallengeStatus::WAITING_VERIFICATION),
            'systemNotifications' => NotificationResource::collection($systemNotifications),
            'userNotifications' => NotificationResource::collection($userNotifications)
        ];
        return $this->onItems($data);
    }
}
