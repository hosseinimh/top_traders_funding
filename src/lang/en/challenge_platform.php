<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'value_required' => $requiredMessage('پلتفرم'),
    'value_min' => $minStringMessage('پلتفرم', 3),
    'value_max' => $maxStringMessage('پلتفرم', 50),
    'value_unique' => 'این پلتفرم قبلا ثبت شده است.',
];
