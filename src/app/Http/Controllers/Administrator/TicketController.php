<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Constants\StoragePath;
use App\Constants\TicketStatus;
use App\Http\Controllers\Controller;
use App\Http\Controllers\FileUploaderController;
use App\Http\Requests\Ticket\IndexTicketsRequest;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\StoreTicketThreadRequest;
use App\Http\Resources\Ticket\TicketResource;
use App\Http\Resources\Ticket\TicketThreadResource;
use App\Models\Ticket as Model;
use App\Models\User;
use App\Packages\JsonResponse;
use App\Services\TicketService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class TicketController extends Controller
{
    public function __construct(JsonResponse $response, public TicketService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexTicketsRequest $request, User $user): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($user->id, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        $data = ['item' => new TicketResource($model), 'threads' => TicketThreadResource::collection($this->service->threads($model->id))];
        return $this->onOk($data);
    }

    public function store(StoreTicketRequest $request, User $user): HttpJsonResponse
    {
        if ($user->role === Role::USER) {
            return $this->onStore($this->service->store($user->id, $request->type, auth()->user()->id, 1, $request->subject, $request->content, TicketStatus::OPEN));
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function storeThread(Model $model, StoreTicketThreadRequest $request): HttpJsonResponse
    {
        if (($model->status === TicketStatus::OPEN) && ($thread = $this->service->storeThread($model->id, auth()->user()->id, 1, $request->content))) {
            $response = [];
            $uploadResult = (new FileUploaderController(StoragePath::TICKET_THREAD_FILE))->uploadFile($thread, $request, 'file', 'file');
            $response['uploaded'] = $uploadResult['uploaded'];
            $response['uploadedText'] = $uploadResult['uploadedText'];

            return $this->onOk($response);
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function seen(Model $model): HttpJsonResponse
    {
        return $this->onUpdate($this->service->adminSeen($model->id));
    }

    public function changeStatus(Model $model): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changeStatus($model, TicketStatus::CLOSED));
    }
}
