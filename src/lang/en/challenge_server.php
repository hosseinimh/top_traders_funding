<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'name_required' => $requiredMessage('سرور'),
    'name_min' => $minStringMessage('سرور', 3),
    'name_max' => $maxStringMessage('سرور', 50),
    'name_unique' => 'این سرور قبلا ثبت شده است.',
    'title_required' => $requiredMessage('عنوان'),
    'title_min' => $minStringMessage('عنوان', 3),
    'title_max' => $maxStringMessage('عنوان', 50),
    'title_unique' => 'این عنوان قبلا ثبت شده است.',
];
