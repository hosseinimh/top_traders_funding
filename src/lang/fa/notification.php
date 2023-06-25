<?php

require_once __DIR__ . '/Helper/MessageHelper.php';

return [
    'sub_category_undefined' => 'نامشخص',
    'sub_category_111' => 'ورود موفق به حساب',
    'sub_category_211' => 'ثبت تیکت پشتیبانی',
    'sub_category_text_undefined' => 'نامشخص',
    'sub_category_text_111' => 'ورود موفق به حساب کاربری در تاریخ :field1 ساعت :field2 با دستگاه :field3',
    'sub_category_text_211' => 'ثبت تیکت #:field1 با موضوع \':field2\' توسط \':field3 :field4\' [ :field5 ]',
    'sub_category_text_212' => 'پاسخ به تیکت #:field1 با موضوع \':field2\'',
    'category_numeric' => $numericMessage('دسته‌بندی'),
    'category_gte' => $gteNumericMessage('دسته‌بندی', 0),
];
