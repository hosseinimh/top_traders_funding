<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\Server as Model;
use Exception;

class ServerService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getByTitle(string $title): mixed
    {
        return Model::where('title', $title)->first();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('id', 'ASC')->get();
    }

    public function store(string $name, string $title): mixed
    {
        $this->throwIfTitleNotUnique($title);
        $data = [
            'name' => $name,
            'title' => $title,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, string $name, string $title): bool
    {
        $this->throwIfTitleNotUnique($title, $model);
        $data = [
            'name' => $name,
            'title' => $title,
        ];
        return $model->update($data);
    }

    private function throwIfTitleNotUnique(string $title, mixed $targetModel = null)
    {
        $server = $this->getByTitle($title);
        if (!$server || ($targetModel instanceof Model && $targetModel->id === $server->id)) {
            return;
        }
        throw new Exception(__('server.title_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
