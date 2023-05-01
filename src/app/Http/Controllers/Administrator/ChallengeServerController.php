<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeServer\StoreChallengeServerRequest;
use App\Http\Requests\ChallengeServer\UpdateChallengeServerRequest;
use App\Models\ChallengeServer as Model;
use App\Packages\JsonResponse;
use App\Services\ChallengeServerService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeServerController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeServerService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreChallengeServerRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->name, $request->title, $request->free, $request->real));
    }

    public function update(Model $model, UpdateChallengeServerRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->title, $request->free, $request->real));
    }
}
