<?php

use App\Http\Controllers\Administrator\AppRuleController;
use App\Http\Controllers\Administrator\CampaignController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\ServerController;
use App\Http\Controllers\Administrator\TicketController;
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

    Route::post('tickets/{user}', [TicketController::class, 'index']);
    Route::post('tickets/show/{model}', [TicketController::class, 'show']);
    Route::post('tickets/show_seen/{model}', [TicketController::class, 'showAndSeen']);
    Route::post('tickets/store/{user}', [TicketController::class, 'store']);
    Route::post('tickets/store_thread/{model}', [TicketController::class, 'storeThread']);
    Route::post('tickets/seen/{model}', [TicketController::class, 'seen']);
    Route::post('tickets/change_status/{model}', [TicketController::class, 'changeStatus']);

    Route::post('servers/store', [ServerController::class, 'store']);
    Route::post('servers/update/{model}', [ServerController::class, 'update']);
});
