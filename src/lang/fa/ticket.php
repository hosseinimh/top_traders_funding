<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'type_undefined' => "نامشخص",
    'type_1' => "مورد شکایت",
    'type_2' => "پیشنهاد",
    'type_3' => "اعلام خرابی",
    'type_4' => "پشتیبانی فنی، مالی",
    'type_5' => "سایر موارد",
    'status_undefined' => "نامشخص",
    'status_1' => "باز",
    'status_2' => "تکمیل شده",
    'type_required' => $requiredMessage('موضوع'),
    'type_numeric' => $numericMessage('موضوع'),
    'type_min' => $minNumericMessage('موضوع', 1),
    'type_max' => $maxNumericMessage('موضوع', 5),
    'subject_required' => $requiredMessage('موضوع پیام'),
    'subject_min' => $minStringMessage('موضوع پیام', 10),
    'subject_max' => $maxStringMessage('موضوع پیام', 200),
    'content_required' => $requiredMessage('متن پیام'),
    'content_min' => $minStringMessage('متن پیام', 10),
    'content_max' => $maxStringMessage('متن پیام', 1000),
];
