<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ChallengeStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Challenge\IndexChallengesRequest;
use App\Models\Challenge as Model;
use App\Packages\JsonResponse;
use App\Services\ChallengeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexChallengesRequest $request): HttpJsonResponse
    {
        return $this->onItems($this->service->getPaginate(null, 0, $request->_pn, $request->_pi), $this->service->count(auth()->user()->id, 0));
    }

    public function changeStatus(Model $model): HttpJsonResponse
    {
        return $this->onUpdate($this->service->changeStatus($model, ChallengeStatus::WAITING_TRADE));
    }
}
