<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'value_required' => $requiredMessage('بالانس اکانت'),
    'value_numeric' => $numericMessage('بالانس اکانت'),
    'value_min' => $minNumericMessage('بالانس اکانت', 1000),
    'value_max' => $maxNumericMessage('بالانس اکانت', 50000),
    'value_unique' => 'این بالانس اکانت قبلا ثبت شده است.',
];
