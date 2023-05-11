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
    'account_no_required' => $requiredMessage('حساب'),
    'account_no_numeric' => $numericMessage('حساب'),
    'password_required' => $requiredMessage('کلمه عبور'),
    'password_min' => $minStringMessage('کلمه عبور', 5),
    'password_max' => $maxStringMessage('کلمه عبور', 50),
    'investor_password_required' => $requiredMessage('کلمه عبور سرمایه‌گذار'),
    'investor_password_min' => $minStringMessage('کلمه عبور سرمایه‌گذار', 5),
    'investor_password_max' => $maxStringMessage('کلمه عبور سرمایه‌گذار', 50),
    'challenge_status_required' => $requiredMessage('وضعیت'),
    'challenge_status_numeric' => $numericMessage('وضعیت'),
    'challenge_status_min' => $minNumericMessage('وضعیت', 1),
    'challenge_status_max' => $maxNumericMessage('وضعیت', 4),
];
