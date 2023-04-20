<?php

namespace App\Services;

use App\Models\AppRule as Model;

class AppRuleService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(): mixed
    {
        return Model::orderBy('id', 'ASC')->get();
    }

    public function store(string $title, string $body): mixed
    {
        $data = [
            'title' => $title,
            'body' => $body,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $title, string $body): bool
    {
        $data = [
            'title' => $title,
            'body' => $body,
        ];

        return $model->update($data);
    }
}
