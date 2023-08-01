<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static void getAccountInfo(string $token, string $accountId)
 */
class MetaApi extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'meta_api';
    }
}
