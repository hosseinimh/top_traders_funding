<?php

use App\Constants\NotificationSubCaegory;
use App\Facades\Mailer;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get('emails/token', function () {
    $locale = 'fa';
    $dir = 'rtl';
    $token = 'jlkj1jlj1233';
    $email = 'hosseinimh@gmail.com';
    Mailer::SendUserEmailTokenMail($email, $token);
    return view('emails.user.email_token', compact('locale', 'dir', 'token'));
});
Route::get('emails/forgot', function () {
    $locale = 'fa';
    $dir = 'rtl';
    $username = 'hosseinimh@gmail.com';
    $password = '1';
    return view('emails.user.forgot_password', compact('locale', 'dir', 'username', 'password'));
});

Route::get('emails/signup', function () {
    $locale = 'fa';
    $dir = 'rtl';
    $username = 'hosseinimh@gmail.com';
    $password = '1';
    return view('emails.user.signup', compact('locale', 'dir', 'username', 'password'));
});

Route::get('test', function () {
    $d = NotificationSubCaegory::toArray();
    dd($d);
});

Route::get('panel/users/logout', [UserController::class, 'logout']);
Route::get('panel/users/login_google', [UserController::class, 'loginByGoogle']);
Route::get('panel/users/login_google_callback', [UserController::class, 'loginByGoogleCallback']);
Route::get('panel/users/verify_email', [UserController::class, 'verifyEmail']);

Route::get('{path}', function () {
    return view('index');
})->where('path', '^((?!api).)*$');
