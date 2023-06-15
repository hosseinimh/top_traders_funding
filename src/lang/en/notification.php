<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'type_required' => $requiredMessage('نوع'),
    'type_numeric' => $numericMessage('نوع'),
    'type_gte' => $gteNumericMessage('نوع', 0),
    'category_required' => $requiredMessage('دسته‌بندی'),
    'category_numeric' => $numericMessage('دسته‌بندی'),
    'category_gte' => $gteNumericMessage('دسته‌بندی', 0),
];
