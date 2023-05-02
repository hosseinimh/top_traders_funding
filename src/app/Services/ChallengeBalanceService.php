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

    public function getAllFree(): mixed
    {
        return Model::where('free', 1)->orderBy('id', 'ASC')->get();
    }

    public function getAllReal(): mixed
    {
        return Model::where('real', 1)->orderBy('id', 'ASC')->get();
    }

    public function store(int $value, int $free, int $real): mixed
    {
        $this->throwIfValueNotUnique($value);
        $free = $free === 1 ? $free : 0;
        $real = $real === 1 ? $real : 0;
        $data = [
            'value' => $value,
            'free' => $free,
            'real' => $real,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function update(Model $model, int $value, int $free, int $real): bool
    {
        $this->throwIfValueNotUnique($value, $model);
        $free = $free === 1 ? $free : 0;
        $real = $real === 1 ? $real : 0;
        $data = [
            'value' => $value,
            'free' => $free,
            'real' => $real,
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
