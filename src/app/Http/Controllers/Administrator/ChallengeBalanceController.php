<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeBalance\StoreChallengeBalanceRequest;
use App\Http\Requests\ChallengeBalance\UpdateChallengeBalanceRequest;
use App\Models\ChallengeBalance as Model;
use App\Packages\JsonResponse;
use App\Services\ChallengeBalanceService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeBalanceController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeBalanceService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreChallengeBalanceRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->value, $request->free, $request->real));
    }

    public function update(Model $model, UpdateChallengeBalanceRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->value, $request->free, $request->real));
    }
}
