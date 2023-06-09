<?php

namespace App\Http\Controllers\Administrator;

use App\Facades\Notification;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\IndexUsersRequest;
use App\Http\Requests\User\RejectUserVerificationRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User as Model;
use App\Packages\JsonResponse;
use App\Services\UserService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(JsonResponse $response, public UserService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexUsersRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->username, $request->name, $request->email, $request->_pn, $request->_pi), $this->service->count($request->username, $request->name, $request->email));
    }

    public function indexVerifyRequests(Request $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginateVerifyRequests($request->_pn, $request->_pi), $this->service->countVerifyRequests());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function store(StoreUserRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->username, $request->password, $request->name, $request->family, $request->email, null, null, null, $request->role, $request->is_active));
    }

    public function update(Model $model, UpdateUserRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->family, $request->email, $request->role, $request->is_active));
    }

    public function changePassword(Model $model, ChangePasswordRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changePassword($model, $request->new_password));
    }

    public function verifyRequest(Model $model): HttpJsonResponse
    {
        $result = $this->service->verifyRequest($model);
        if ($result) {
            Notification::onUserVerificationVerified(auth()->user(), $model);
        }
        return $this->onUpdate($result);
    }

    public function rejectRequest(RejectUserVerificationRequest $request, Model $model): HttpJsonResponse
    {
        $result = $this->service->rejectRequest($model, $request->reject_reason);
        if ($result) {
            Notification::onUserVerificationRejected(auth()->user(), $model, $request->reject_reason);
        }
        return $this->onUpdate($result);
    }
}
