<?php

require __DIR__ . '/Helper/MessageHelper.php';

return [
    'title_required' => $requiredMessage('عنوان'),
    'title_min' => $minStringMessage('عنوان', 6),
    'title_max' => $maxStringMessage('عنوان', 200),
];
