<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method \App\Packages\Helper deleteAll(string $dir)
 * @method \App\Packages\Helper localeNumbers(int|float $number)
 * @method \App\Packages\Helper randomNumbersString(int $length = 4)
 */
class Helper extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'helper';
    }
}
