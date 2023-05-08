<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('users/logout', [UserController::class, 'logout']);

Route::get('signup', function () {
    $locale = session('_locale', 'fa');
    $dir = $locale === 'fa' ? 'rtl' : 'ltr';
    $username = 'mahmoud';
    $password = '123456';
    return view('emails.user.signup', compact('locale', 'dir', 'username', 'password'));
});

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
