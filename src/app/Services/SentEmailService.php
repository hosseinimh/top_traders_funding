<?php

namespace App\Services;

use App\Models\SentEmail as Model;

class SentEmailService
{
    public function store(string $from, string $to, string $type, string $messageFields): mixed
    {
        $data = [
            'from' => $from,
            'to' => $to,
            'type' => $type,
            'message_fields' => $messageFields,
        ];
        return Model::create($data);
    }
}
