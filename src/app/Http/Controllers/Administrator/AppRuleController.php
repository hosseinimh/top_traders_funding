<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppRule\StoreAppRuleRequest;
use App\Http\Requests\AppRule\UpdateAppRuleRequest;
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

    public function store(StoreAppRuleRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->title, $request->body));
    }

    public function update(Model $model, UpdateAppRuleRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->title, $request->body));
    }
}
