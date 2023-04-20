<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\Administrator\AppRuleController;
use App\Http\Controllers\Administrator\CampaignController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\User\AppRuleController as UserAppRuleController;
use App\Http\Controllers\User\CampaignController as UserCampaignController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\UserController as UserUserController;
use App\Http\Resources\AppRule\AppRuleResource;
use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\AppRuleService;
use App\Services\CampaignService;
use App\Services\ErrorService;
use App\Services\SendMail;
use App\Services\UserService;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

require_once __DIR__ . '/../../server-config.php';

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('helper', function () {
            return new Helper();
        });

        $this->app->bind('send_mail', function () {
            return new SendMail();
        });
    }

    public function boot()
    {
        $this->app->bind('path.public', function () {
            return PUBLIC_PATH;
        });

        View::share('THEME', Theme::class);

        $this->app->bind(ErrorController::class, function ($app) {
            return new ErrorController(new JsonResponse(ErrorResource::class), $app->make(ErrorService::class));
        });

        $this->app->bind(DashboardController::class, function ($app) {
            return new DashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserDashboardController::class, function ($app) {
            return new UserDashboardController($app->make(JsonResponse::class));
        });

        $this->app->bind(UserController::class, function ($app) {
            return new UserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(UserUserController::class, function ($app) {
            return new UserUserController(new JsonResponse(UserResource::class), $app->make(UserService::class));
        });

        $this->app->bind(AppRuleController::class, function ($app) {
            return new AppRuleController(new JsonResponse(AppRuleResource::class), $app->make(AppRuleService::class));
        });

        $this->app->bind(UserAppRuleController::class, function ($app) {
            return new UserAppRuleController(new JsonResponse(AppRuleResource::class), $app->make(AppRuleService::class));
        });

        $this->app->bind(CampaignController::class, function ($app) {
            return new CampaignController(new JsonResponse(CampaignResource::class), $app->make(CampaignService::class));
        });

        $this->app->bind(UserCampaignController::class, function ($app) {
            return new UserCampaignController(new JsonResponse(CampaignResource::class), $app->make(CampaignService::class));
        });
    }
}
