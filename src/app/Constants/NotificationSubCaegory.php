<?php

namespace App\Constants;

use ReflectionClass;

abstract class NotificationSubCaegory
{
    const LOGIN_SUCCEED = 111;
    const LOGIN_FAILED = 112;
    const SIGNUP_SUCCEED = 113;
    const USER_VERIFICATION_REQUESTED = 121;
    const USER_VERIFICATION_VERIFIED = 122;
    const USER_VERIFICATION_FAILED = 123;
    const TICKET_REGISTERED = 211;
    const TICKET_ANSWERED = 212;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
