<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\ChallengeDealService;

class ChallengeDealController extends Controller
{
    public function __construct(JsonResponse $response, public ChallengeDealService $service)
    {
        parent::__construct($response);
    }
}
