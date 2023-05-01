<?php

namespace App\Providers;

use App\Constants\Theme;
use App\Http\Controllers\Administrator\AppRuleController;
use App\Http\Controllers\Administrator\CampaignController;
use App\Http\Controllers\Administrator\ChallengeBalanceController;
use App\Http\Controllers\Administrator\ChallengeLeverageController;
use App\Http\Controllers\Administrator\ChallengePlatformController;
use App\Http\Controllers\Administrator\ChallengeRuleController;
use App\Http\Controllers\Administrator\ChallengeServerController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\TicketController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\User\AppRuleController as UserAppRuleController;
use App\Http\Controllers\User\CampaignController as UserCampaignController;
use App\Http\Controllers\User\ChallengeBalanceController as UserChallengeBalanceController;
use App\Http\Controllers\User\ChallengeLeverageController as UserChallengeLeverageController;
use App\Http\Controllers\User\ChallengePlatformController as UserChallengePlatformController;
use App\Http\Controllers\User\ChallengeRuleController as UserChallengeRuleController;
use App\Http\Controllers\User\ChallengeServerController as UserChallengeServerController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\TicketController as UserTicketController;
use App\Http\Controllers\User\UserController as UserUserController;
use App\Http\Resources\AppRule\AppRuleResource;
use App\Http\Resources\Campaign\CampaignResource;
use App\Http\Resources\ChallengeBalance\ChallengeBalanceResource;
use App\Http\Resources\ChallengeLeverage\ChallengeLeverageResource;
use App\Http\Resources\ChallengePlatform\ChallengePlatformResource;
use App\Http\Resources\ChallengeRule\ChallengeRuleResource;
use App\Http\Resources\ChallengeServer\ChallengeServerResource;
use App\Http\Resources\Error\ErrorResource;
use App\Http\Resources\Ticket\TicketResource;
use App\Http\Resources\User\UserResource;
use App\Packages\Helper;
use App\Packages\JsonResponse;
use App\Services\AppRuleService;
use App\Services\CampaignService;
use App\Services\ChallengeBalanceService;
use App\Services\ChallengeLeverageService;
use App\Services\ChallengePlatformService;
use App\Services\ChallengeRuleService;
use App\Services\ChallengeServerService;
use App\Services\ErrorService;
use App\Services\SendMail;
use App\Services\TicketService;
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

        $this->app->bind(TicketController::class, function ($app) {
            return new TicketController(new JsonResponse(TicketResource::class), $app->make(TicketService::class));
        });

        $this->app->bind(UserTicketController::class, function ($app) {
            return new UserTicketController(new JsonResponse(TicketResource::class), $app->make(TicketService::class));
        });

        $this->app->bind(ChallengeServerController::class, function ($app) {
            return new ChallengeServerController(new JsonResponse(ChallengeServerResource::class), $app->make(ChallengeServerService::class));
        });

        $this->app->bind(UserChallengeServerController::class, function ($app) {
            return new UserChallengeServerController(new JsonResponse(ChallengeServerResource::class), $app->make(ChallengeServerService::class));
        });

        $this->app->bind(ChallengeBalanceController::class, function ($app) {
            return new ChallengeBalanceController(new JsonResponse(ChallengeBalanceResource::class), $app->make(ChallengeBalanceService::class));
        });

        $this->app->bind(UserChallengeBalanceController::class, function ($app) {
            return new UserChallengeBalanceController(new JsonResponse(ChallengeBalanceResource::class), $app->make(ChallengeBalanceService::class));
        });

        $this->app->bind(ChallengeLeverageController::class, function ($app) {
            return new ChallengeLeverageController(new JsonResponse(ChallengeLeverageResource::class), $app->make(ChallengeLeverageService::class));
        });

        $this->app->bind(UserChallengeLeverageController::class, function ($app) {
            return new UserChallengeLeverageController(new JsonResponse(ChallengeLeverageResource::class), $app->make(ChallengeLeverageService::class));
        });

        $this->app->bind(ChallengeRuleController::class, function ($app) {
            return new ChallengeRuleController(new JsonResponse(ChallengeRuleResource::class), $app->make(ChallengeRuleService::class));
        });

        $this->app->bind(UserChallengeRuleController::class, function ($app) {
            return new UserChallengeRuleController(new JsonResponse(ChallengeRuleResource::class), $app->make(ChallengeRuleService::class));
        });

        $this->app->bind(ChallengePlatformController::class, function ($app) {
            return new ChallengePlatformController(new JsonResponse(ChallengePlatformResource::class), $app->make(ChallengePlatformService::class));
        });

        $this->app->bind(UserChallengePlatformController::class, function ($app) {
            return new UserChallengePlatformController(new JsonResponse(ChallengePlatformResource::class), $app->make(ChallengePlatformService::class));
        });
    }
}
