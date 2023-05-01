<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ChallengeRuleService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class ChallengeRuleController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeRuleService $service)
    {
        parent::__construct($response);
    }

    public function show(): HttpJsonResponse
    {
        return $this->onItem($this->service->get());
    }
}
