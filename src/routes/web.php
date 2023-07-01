<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('panel/users/logout', [UserController::class, 'logout']);
Route::get('panel/users/login_google', [UserController::class, 'loginByGoogle']);
Route::get('panel/users/login_google_callback', [UserController::class, 'loginByGoogleCallback']);
Route::get('panel/users/verify_email', [UserController::class, 'verifyEmail']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
