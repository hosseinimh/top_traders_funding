<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\StoreCampaignRequest;
use App\Http\Requests\Campaign\UpdateCampaignRequest;
use App\Models\Campaign as Model;
use App\Packages\JsonResponse;
use App\Services\CampaignService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class CampaignController extends Controller
{
    public function __construct(JsonResponse $response, public CampaignService $service)
    {
        parent::__construct($response);
    }

    public function store(StoreCampaignRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($request->title, $request->is_active));
    }

    public function update(Model $model, UpdateCampaignRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->title, $request->is_active));
    }
}
