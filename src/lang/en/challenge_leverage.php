<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'value_required' => $requiredMessage('اهرم'),
    'value_numeric' => $numericMessage('اهرم'),
    'value_min' => $minNumericMessage('اهرم', 50),
    'value_max' => $maxNumericMessage('اهرم', 1000),
    'value_unique' => 'این اهرم قبلا ثبت شده است.',
];
