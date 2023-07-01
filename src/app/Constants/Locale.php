<?php

namespace App\Constants;

use ReflectionClass;

abstract class Locale
{
    const EN = 'en-US';
    const FA = 'fa-IR';

    public static function short($locale)
    {
        if ($locale === Locale::EN) {
            return 'en';
        } else {
            return 'fa';
        }
    }

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
