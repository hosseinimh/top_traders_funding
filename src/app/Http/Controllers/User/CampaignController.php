<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Campaign\IndexCampaignsRequest;
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

    public function index(IndexCampaignsRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate($request->_pn, $request->_pi));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }
}
