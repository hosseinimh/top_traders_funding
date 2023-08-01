<?php

use App\Http\Controllers\User\ChallengeTradeController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('panel/users/logout', [UserController::class, 'logout']);
Route::get('panel/users/login_google', [UserController::class, 'loginByGoogle']);
Route::get('panel/users/login_google_callback', [UserController::class, 'loginByGoogleCallback']);

Route::get('ai/{challenge}', [ChallengeTradeController::class, 'getAccountInfo']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
