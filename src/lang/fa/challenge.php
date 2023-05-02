<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'level_undefined' => "نامشخص",
    'level_1' => "مرحله اول",
    'level_2' => "مرحله دوم",
    'level_3' => "حساب Real",
    'level_4' => "حساب رایگان",
    'status_undefined' => "نامشخص",
    'status_1' => "در انتظار تایید",
    'status_2' => "در انتظار اولین ترید",
    'status_3' => "در حال ترید",
    'status_4' => "پایان چالش",
    'level_required' => $requiredMessage('نوع چالش'),
    'level_numeric' => $numericMessage('نوع چالش'),
    'level_min' => $minNumericMessage('نوع چالش', 1),
    'level_max' => $maxNumericMessage('نوع چالش', 4),
];
