<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Server\StoreServerRequest;
use App\Http\Requests\Server\UpdateServerRequest;
use App\Models\Server as Model;
use App\Packages\JsonResponse;
use App\Services\ServerService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ServerController extends Controller
{
    public function __construct(JsonResponse $response, public ServerService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreServerRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name, $request->title));
    }

    public function update(Model $model, UpdateServerRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->title));
    }
}
