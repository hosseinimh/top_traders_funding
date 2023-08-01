<?php

namespace App\Http\Controllers\User;

use App\Constants\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeTrade\StoreChallengeTradesRequest;
use App\Models\Challenge;
use App\Packages\JsonResponse;
use App\Services\ChallengeTradeService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeTradeController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeTradeService $service)
    {
        parent::__construct($response);
    }

    public function store(Challenge $challenge, StoreChallengeTradesRequest $request): HttpJsonResponse
    {
        if ($challenge->user_id === auth()->user()->id) {
            return $this->onStore($this->service->updateTrades($challenge->id, $request->trades));
        }
        return $this->onError(['_error' => __('general.store_error'), '_errorCode' => ErrorCode::STORE_ERROR]);
    }

    public function getAccountInfo(Challenge $challenge): HttpJsonResponse
    {
        return $this->onStore($this->service->getAndUpdateAccountInfo($challenge));
    }
}
