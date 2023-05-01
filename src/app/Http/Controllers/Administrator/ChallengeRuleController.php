<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChallengeRule\UpdateChallengeRuleRequest;
use App\Packages\JsonResponse;
use App\Services\ChallengeRuleService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeRuleController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeRuleService $service)
    {
        parent::__construct($response);
    }

    public function update(UpdateChallengeRuleRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($request->duration_1, $request->duration_2, $request->duration_real, $request->duration_free, $request->daily_sl_1, $request->daily_sl_2, $request->daily_sl_real, $request->daily_sl_free, $request->total_sl_1, $request->total_sl_2, $request->total_sl_real, $request->total_sl_free, $request->target_1, $request->target_2, $request->target_real, $request->target_free, $request->trade_days_1, $request->trade_days_2, $request->trade_days_real, $request->trade_days_free));
    }
}
