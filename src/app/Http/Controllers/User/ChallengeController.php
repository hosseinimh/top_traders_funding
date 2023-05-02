<?php

namespace App\Http\Controllers\User;

use App\Constants\ChallengeLevel;
use App\Http\Controllers\Controller;
use App\Http\Requests\Challenge\IndexChallengesRequest;
use App\Http\Requests\Challenge\StoreChallengeRequest;
use App\Http\Resources\ChallengeBalance\ChallengeBalanceResource;
use App\Http\Resources\ChallengeLeverage\ChallengeLeverageResource;
use App\Http\Resources\ChallengePlatform\ChallengePlatformResource;
use App\Http\Resources\ChallengeRule\ChallengeRuleResource;
use App\Http\Resources\ChallengeServer\ChallengeServerResource;
use App\Models\ChallengeBalance;
use App\Models\ChallengeLeverage;
use App\Models\ChallengePlatform;
use App\Models\ChallengeServer;
use App\Packages\JsonResponse;
use App\Services\ChallengeBalanceService;
use App\Services\ChallengeLeverageService;
use App\Services\ChallengePlatformService;
use App\Services\ChallengeRuleService;
use App\Services\ChallengeServerService;
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
        return $this->onItems($this->service->getPaginate(auth()->user()->id, 0, $request->_pn, $request->_pi), $this->service->count(auth()->user()->id, 0));
    }

    public function take(IndexChallengesRequest $request): HttpJsonResponse
    {
        $isFree = $request->level === ChallengeLevel::FREE ? true : false;
        $balances = $isFree ?  ChallengeBalanceResource::collection((new ChallengeBalanceService())->getAllFree()) : ChallengeBalanceResource::collection((new ChallengeBalanceService())->getAllReal());
        $servers = $isFree ?  ChallengeServerResource::collection((new ChallengeServerService())->getAllFree()) : ChallengeServerResource::collection((new ChallengeServerService())->getAllReal());
        $platforms = $isFree ?  ChallengePlatformResource::collection((new ChallengePlatformService())->getAllFree()) : ChallengePlatformResource::collection((new ChallengePlatformService())->getAllReal());
        $leverages = $isFree ?  ChallengeLeverageResource::collection((new ChallengeLeverageService())->getAllFree()) : ChallengeLeverageResource::collection((new ChallengeLeverageService())->getAllReal());
        $rules = new ChallengeRuleResource((new ChallengeRuleService())->get());
        $items = [
            'balances' => $balances,
            'servers' => $servers,
            'platforms' => $platforms,
            'leverages' => $leverages,
            'rules' => $rules,
        ];
        return $this->onItems($items);
    }

    public function store(StoreChallengeRequest $request, ChallengeBalance $balance, ChallengeServer $server, ChallengePlatform $platform, ChallengeLeverage $leverage): HttpJsonResponse
    {
        return $this->onStore($this->service->store(auth()->user()->id, $balance->id, $server->id,  $platform->id, $leverage->id, $request->level, $balance->value));
    }
}
