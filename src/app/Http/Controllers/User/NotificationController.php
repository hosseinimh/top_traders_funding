<?php

namespace App\Http\Controllers\User;

use App\Constants\NotificationCategory;
use App\Constants\NotificationType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Notification\IndexNotificationsRequest;
use App\Http\Resources\Notification\NotificationResource;
use App\Packages\JsonResponse;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class NotificationController extends Controller
{
    public function __construct(JsonResponse $response, public NotificationService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexNotificationsRequest $request): HttpJsonResponse
    {
        $type = in_array($request->type, range(NotificationType::SYSTEM, NotificationType::USER)) ? $request->type : 0;
        $category = in_array($request->category, range(NotificationCategory::ACCOUNT, NotificationCategory::USER_VERIFIATION)) ? $request->category : 0;
        return $this->onItems($this->service->getPaginate(auth()->user()->id, $type, $category, $request->_pn, $request->_pi), $this->service->count(auth()->user()->id, $type, $category));
    }

    public function review(): HttpJsonResponse
    {
        $systemNotifications = $this->service->getReview(auth()->user()->id, NotificationType::SYSTEM);
        $userNotifications = $this->service->getReview(auth()->user()->id, NotificationType::USER);
        $data = ['systemNotifications' => NotificationResource::collection($systemNotifications), 'userNotifications' => NotificationResource::collection($userNotifications)];
        return $this->onItems($data);
    }
}
