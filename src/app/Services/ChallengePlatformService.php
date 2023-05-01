<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\ChallengePlatform as Model;
use Exception;

class ChallengePlatformService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getByValue(string $value): mixed
    {
        return Model::where('value', $value)->first();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('id', 'ASC')->get();
    }

    public function store(string $value): mixed
    {
        $this->throwIfValueNotUnique($value);
        $data = [
            'value' => $value,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, string $value): bool
    {
        $this->throwIfValueNotUnique($value, $model);
        $data = [
            'value' => $value,
        ];
        return $model->update($data);
    }

    private function throwIfValueNotUnique(string $value, mixed $targetModel = null)
    {
        $challengePlatform = $this->getByValue($value);
        if (!$challengePlatform || ($targetModel instanceof Model && $targetModel->id === $challengePlatform->id)) {
            return;
        }
        throw new Exception(__('challenge_platform.value_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
