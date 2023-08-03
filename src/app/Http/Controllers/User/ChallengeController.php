<?php

namespace App\Http\Controllers\User;

use App\Constants\ChallengeLevel;
use App\Constants\ErrorCode;
use App\Constants\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Challenge\IndexChallengesRequest;
use App\Http\Requests\Challenge\StoreChallengeRequest;
use App\Http\Resources\Challenge\ChallengeResource;
use App\Http\Resources\ChallengeBalance\ChallengeBalanceResource;
use App\Http\Resources\ChallengeLeverage\ChallengeLeverageResource;
use App\Http\Resources\ChallengePlatform\ChallengePlatformResource;
use App\Http\Resources\ChallengeRule\ChallengeRuleResource;
use App\Http\Resources\ChallengeServer\ChallengeServerResource;
use App\Http\Resources\ChallengeDeal\ChallengeDealResource;
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
use App\Models\Challenge as Model;
use App\Services\ChallengeDealService;
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

    public function show(Model $model): HttpJsonResponse
    {
        return $this->handleShow($model);
    }

    public function showWithDeals(Model $model): HttpJsonResponse
    {
        return $this->handleShow($model, true);
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

    private function handleShow(Model $model, bool $fetchDeals = false): HttpJsonResponse
    {
        if ($model->user_id === auth()->user()->id || auth()->user()->role === Role::ADMINISTRATOR) {
            $challengeDealService = new ChallengeDealService();
            $deals = $challengeDealService->getAll($model, $fetchDeals);
            $dealsDetails = $challengeDealService->getDealsDetails($deals);
            $deals = ChallengeDealResource::collection($deals);
            $item = new ChallengeResource($this->service->get($model->id));
            $data = [];
            $data['item'] = $item;
            $data['deals'] = $deals;
            $data['dealsDetails'] = $dealsDetails;
            if (!$fetchDeals) {
                $challengeRuleService = new ChallengeRuleService();
                $data['challengeRule'] = new ChallengeRuleResource($challengeRuleService->get());
            }
            return $this->onItems($data);
        }
        return $this->onError(['_error' => __('general.item_not_found'), '_errorCode' => ErrorCode::ITEM_NOT_FOUND]);
    }
}
