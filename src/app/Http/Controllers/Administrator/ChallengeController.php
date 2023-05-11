<?php

namespace App\Http\Controllers\Administrator;

use App\Constants\ChallengeStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Challenge\ChangeStatusChallengeRequest;
use App\Http\Requests\Challenge\IndexChallengesRequest;
use App\Http\Requests\Challenge\UpdateChallengeeRequest;
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
        return $this->onItems($this->service->getPaginate(null, 0, $request->_pn, $request->_pi), $this->service->count(null, 0));
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function update(Model $model, UpdateChallengeeRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->account_no, $request->password, $request->investor_password));
    }

    public function changeStatus(Model $model, ChangeStatusChallengeRequest $request): HttpJsonResponse
    {
        $result = $this->service->changeStatus($model, $request->challenge_status);
        if ($result) {
            $challengeService = new ChallengeService();
            return $this->onUpdate($result, ['waitingChallengesCount' => $challengeService->count(null, ChallengeStatus::WAITING_VERIFICATION)]);
        } else {
            return $this->onUpdate($result);
        }
    }
}
