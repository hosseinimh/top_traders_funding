<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeTrade\StoreChallengeTradeRequest;
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

    //public function index(IndexChallengesRequest $request): HttpJsonResponse
    //{
    //return $this->onItems($this->service->getPaginate(null, 0, $request->_pn, $request->_pi), $this->service->count(null, 0));
    // }

    public function store(Challenge $challenge, StoreChallengeTradeRequest $request): HttpJsonResponse
    {
        return $this->onStore($this->service->store($challenge->id, $request->deal_id, $request->platform, $request->type, $request->time, $request->broker_time, $request->commission, $request->swap, $request->profit, $request->symbol, $request->magic, $request->order_id, $request->position_id, $request->reason, $request->entry_type, $request->volume, $request->price, $request->account_currency_exchange_rate, $request->update_sequence_number));
    }
}
