<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengePlatform\StoreChallengePlatformRequest;
use App\Http\Requests\ChallengePlatform\UpdateChallengePlatformRequest;
use App\Models\ChallengePlatform as Model;
use App\Packages\JsonResponse;
use App\Services\ChallengePlatformService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengePlatformController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengePlatformService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreChallengePlatformRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->value, $request->free, $request->real));
    }

    public function update(Model $model, UpdateChallengePlatformRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->value, $request->free, $request->real));
    }
}
