<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ChallengeTradeService;

class ChallengeTradeController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeTradeService $service)
    {
        parent::__construct($response);
    }
}
