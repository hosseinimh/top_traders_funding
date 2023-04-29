<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\ChallengeBalance as Model;
use Exception;

class ChallengeBalanceService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getByValue(int $value): mixed
    {
        return Model::where('value', $value)->first();
    }

    public function getAll(): mixed
    {
        return Model::orderBy('id', 'ASC')->get();
    }

    public function store(int $value): mixed
    {
        $this->throwIfValueNotUnique($value);
        $data = [
            'value' => $value,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, int $value): bool
    {
        $this->throwIfValueNotUnique($value, $model);
        $data = [
            'value' => $value,
        ];
        return $model->update($data);
    }

    private function throwIfValueNotUnique(int $value, mixed $targetModel = null)
    {
        $challengeBalance = $this->getByValue($value);
        if (!$challengeBalance || ($targetModel instanceof Model && $targetModel->id === $challengeBalance->id)) {
            return;
        }
        throw new Exception(__('challenge_balance.value_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
