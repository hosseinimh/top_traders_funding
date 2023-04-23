<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AppRule as Model;
use App\Packages\JsonResponse;
use App\Services\AppRuleService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class AppRuleController extends Controller
{
    public function __construct(JsonResponse $response, public AppRuleService $service)
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
