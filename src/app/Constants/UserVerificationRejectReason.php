<?php

namespace App\Constants;

use ReflectionClass;

abstract class UserVerificationRejectReason
{
    const IMAGE_NOT_VALID = 1;
    const IMAGE_NOT_CLEAR = 2;
    const IMAGE_NOT_MATCH = 3;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
