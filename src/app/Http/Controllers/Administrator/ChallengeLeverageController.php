<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeLeverage\StoreChallengeLeverageRequest;
use App\Http\Requests\ChallengeLeverage\UpdateChallengeLeverageRequest;
use App\Models\ChallengeLeverage as Model;
use App\Packages\JsonResponse;
use App\Services\ChallengeLeverageService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeLeverageController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeLeverageService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreChallengeLeverageRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->value));
    }

    public function update(Model $model, UpdateChallengeLeverageRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->value));
    }
}
