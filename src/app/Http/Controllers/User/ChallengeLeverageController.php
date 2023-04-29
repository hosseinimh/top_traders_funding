<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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

    public function index(): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
