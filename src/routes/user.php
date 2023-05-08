<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\AppRuleController;
use App\Http\Controllers\User\CampaignController;
use App\Http\Controllers\User\ChallengeBalanceController;
use App\Http\Controllers\User\ChallengeController;
use App\Http\Controllers\User\ChallengeLeverageController;
use App\Http\Controllers\User\ChallengePlatformController;
use App\Http\Controllers\User\ChallengeRuleController;
use App\Http\Controllers\User\ChallengeServerController;
use App\Http\Controllers\User\TicketController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('users/forgot_password', [UserController::class, 'forgotPassword']);
    Route::post('users/signup', [UserController::class, 'signup']);
    Route::post('users/logout', [UserController::class, 'logout']);
    Route::post('users/set_locale', [UserController::class, 'setLocale']);
});

// 'user' type users
Route::middleware(['auth:sanctum', 'auth.user'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users/update', [UserController::class, 'update']);
    Route::post('users/change_password', [UserController::class, 'changePassword']);

    Route::post('tickets', [TicketController::class, 'index']);
    Route::post('tickets/show/{model}', [TicketController::class, 'show']);
    Route::post('tickets/show_seen/{model}', [TicketController::class, 'showAndSeen']);
    Route::post('tickets/store', [TicketController::class, 'store']);
    Route::post('tickets/store_thread/{model}', [TicketController::class, 'storeThread']);
    Route::post('tickets/seen/{model}', [TicketController::class, 'seen']);
    Route::post('tickets/change_status/{model}', [TicketController::class, 'changeStatus']);

    Route::post('challenges', [ChallengeController::class, 'index']);
});

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
    Route::post('users/auth', [UserController::class, 'showAuth']);

    Route::post('app_rules', [AppRuleController::class, 'index']);
    Route::post('app_rules/show/{model}', [AppRuleController::class, 'show']);

    Route::post('campaigns', [CampaignController::class, 'index']);
    Route::post('campaigns/show/{model}', [CampaignController::class, 'show']);

    Route::post('challenge_servers', [ChallengeServerController::class, 'index']);
    Route::post('challenge_servers/show/{model}', [ChallengeServerController::class, 'show']);

    Route::post('challenge_balances', [ChallengeBalanceController::class, 'index']);
    Route::post('challenge_balances/show/{model}', [ChallengeBalanceController::class, 'show']);

    Route::post('challenge_leverages', [ChallengeLeverageController::class, 'index']);
    Route::post('challenge_leverages/show/{model}', [ChallengeLeverageController::class, 'show']);

    Route::post('challenge_rules/show', [ChallengeRuleController::class, 'show']);

    Route::post('challenge_platforms', [ChallengePlatformController::class, 'index']);
    Route::post('challenge_platforms/show/{model}', [ChallengePlatformController::class, 'show']);

    Route::post('challenges/take', [ChallengeController::class, 'take']);
    Route::post('challenges/store/{balance}/{server}/{platform}/{leverage}', [ChallengeController::class, 'store']);
});
