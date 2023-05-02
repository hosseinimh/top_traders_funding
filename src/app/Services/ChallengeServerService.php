<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\ChallengeServer as Model;
use Exception;

class ChallengeServerService
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

    public function getAllFree(): mixed
    {
        return Model::where('free', 1)->orderBy('id', 'ASC')->get();
    }

    public function getAllReal(): mixed
    {
        return Model::where('real', 1)->orderBy('id', 'ASC')->get();
    }

    public function store(string $name, string $title, int $free, int $real): mixed
    {
        $this->throwIfTitleNotUnique($title);
        $free = $free === 1 ? $free : 0;
        $real = $real === 1 ? $real : 0;
        $data = [
            'name' => $name,
            'title' => $title,
            'free' => $free,
            'real' => $real,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, string $name, string $title, int $free, int $real): bool
    {
        $this->throwIfTitleNotUnique($title, $model);
        $free = $free === 1 ? $free : 0;
        $real = $real === 1 ? $real : 0;
        $data = [
            'name' => $name,
            'title' => $title,
            'free' => $free,
            'real' => $real,
        ];
        return $model->update($data);
    }

    private function throwIfTitleNotUnique(string $title, mixed $targetModel = null)
    {
        $challengeServer = $this->getByTitle($title);
        if (!$challengeServer || ($targetModel instanceof Model && $targetModel->id === $challengeServer->id)) {
            return;
        }
        throw new Exception(__('challenge_server.title_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
