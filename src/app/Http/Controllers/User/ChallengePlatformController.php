<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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

    public function index(): HttpJsonResponse
    {
        return $this->onItems($this->service->getAll());
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
