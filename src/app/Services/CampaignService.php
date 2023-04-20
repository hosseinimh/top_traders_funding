<?php

namespace App\Services;

use App\Models\Campaign as Model;

class CampaignService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $page, int $pageItems): mixed
    {
        return Model::orderBy('is_active', 'DESC')->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(string $title, int $isActive): mixed
    {
        $isActive = $isActive > 0 ? 1 : 0;
        $data = [
            'title' => $title,
            'is_active' => $isActive,
        ];
        $model = Model::create($data);

        return $model ?? null;
    }

    public function update(Model $model, string $title, int $isActive): bool
    {
        $isActive = $isActive > 0 ? 1 : 0;
        $data = [
            'title' => $title,
            'is_active' => $isActive,
        ];

        return $model->update($data);
    }
}
