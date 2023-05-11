<?php

use App\Http\Controllers\Administrator\AppRuleController;
use App\Http\Controllers\Administrator\CampaignController;
use App\Http\Controllers\Administrator\ChallengeBalanceController;
use App\Http\Controllers\Administrator\ChallengeController;
use App\Http\Controllers\Administrator\ChallengeLeverageController;
use App\Http\Controllers\Administrator\ChallengePlatformController;
use App\Http\Controllers\Administrator\ChallengeRuleController;
use App\Http\Controllers\Administrator\ChallengeServerController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\TicketController;
use App\Http\Controllers\Administrator\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('app_rules/store', [AppRuleController::class, 'store']);
    Route::post('app_rules/update/{model}', [AppRuleController::class, 'update']);

    Route::post('campaigns/store', [CampaignController::class, 'store']);
    Route::post('campaigns/update/{model}', [CampaignController::class, 'update']);

    Route::post('tickets/{user}', [TicketController::class, 'index']);
    Route::post('tickets/show/{model}', [TicketController::class, 'show']);
    Route::post('tickets/show_seen/{model}', [TicketController::class, 'showAndSeen']);
    Route::post('tickets/store/{user}', [TicketController::class, 'store']);
    Route::post('tickets/store_thread/{model}', [TicketController::class, 'storeThread']);
    Route::post('tickets/seen/{model}', [TicketController::class, 'seen']);
    Route::post('tickets/change_status/{model}', [TicketController::class, 'changeStatus']);

    Route::post('challenge_servers/store', [ChallengeServerController::class, 'store']);
    Route::post('challenge_servers/update/{model}', [ChallengeServerController::class, 'update']);

    Route::post('challenge_balances/store', [ChallengeBalanceController::class, 'store']);
    Route::post('challenge_balances/update/{model}', [ChallengeBalanceController::class, 'update']);

    Route::post('challenge_leverages/store', [ChallengeLeverageController::class, 'store']);
    Route::post('challenge_leverages/update/{model}', [ChallengeLeverageController::class, 'update']);

    Route::post('challenge_rules/update', [ChallengeRuleController::class, 'update']);

    Route::post('challenge_platforms/store', [ChallengePlatformController::class, 'store']);
    Route::post('challenge_platforms/update/{model}', [ChallengePlatformController::class, 'update']);

    Route::post('challenges', [ChallengeController::class, 'index']);
    Route::post('challenges/show/{model}', [ChallengeController::class, 'show']);
    Route::post('challenges/update/{model}', [ChallengeController::class, 'update']);
    Route::post('challenges/change_status/{model}', [ChallengeController::class, 'changeStatus']);
});
