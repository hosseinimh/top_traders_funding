<?php

use App\Http\Controllers\Administrator\AppRuleController;
use App\Http\Controllers\Administrator\CampaignController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\UserController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
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
});
