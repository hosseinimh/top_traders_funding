<?php

use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\AppRuleController;
use App\Http\Controllers\User\CampaignController;
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
});

// 'user' | 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.logged'])->group(function () {
    Route::post('app_rules', [AppRuleController::class, 'index']);
    Route::post('app_rules/show/{model}', [AppRuleController::class, 'show']);

    Route::post('campaigns', [CampaignController::class, 'index']);
    Route::post('campaigns/show/{model}', [CampaignController::class, 'show']);
});
