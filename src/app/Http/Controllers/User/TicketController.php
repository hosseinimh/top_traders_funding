<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
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
use App\Packages\JsonResponse;
use App\Services\TicketService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class TicketController extends Controller
{
    public function __construct(JsonResponse $response, public TicketService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexTicketsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate(auth()->user()->id, $request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        if ($model->admin_created || $model->user_id !== auth()->user()->id) {
            return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
        }

        $data = ['item' => new TicketResource($model), 'threads' => TicketThreadResource::collection($this->service->threads($model->id))];
        return $this->onOk($data);
    }

    public function store(StoreTicketRequest $request): HttpJsonResponse
    {
        if (($thread = $this->service->store($request->type, auth()->user()->id, auth()->user()->id, 0, $request->subject, $request->content, TicketStatus::OPEN))) {
            $response = [];
            $uploadResult = (new FileUploaderController(StoragePath::TICKET_THREAD_FILE))->uploadFile($thread, $request, 'file', 'file');
            $response['uploaded'] = $uploadResult['uploaded'];
            $response['uploadedText'] = $uploadResult['uploadedText'];

            return $this->onOk($response);
        }

        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function storeThread(Model $model, StoreTicketThreadRequest $request): HttpJsonResponse
    {
        if (($model->user_id === auth()->user()->id) && ($model->status === TicketStatus::OPEN) && ($thread = $this->service->storeThread($model->id, auth()->user()->id, 0, $request->content))) {
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
        if ($model->user_id === auth()->user()->id) {
            return $this->onUpdate($this->service->userSeen($model->id));
        }

        return $this->onError(['_error' => __('general.update_error'), '_errorCode' => ErrorCode::UPDATE_ERROR]);
    }

    public function changeStatus(Model $model): HttpJsonResponse
    {
        if ($model->user_id === auth()->user()->id) {
            return $this->onUpdate($this->service->changeStatus($model, TicketStatus::CLOSED));
        }

        return $this->onError(['_error' => __('general.update_error'), '_errorCode' => ErrorCode::UPDATE_ERROR]);
    }
}
