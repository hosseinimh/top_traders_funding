<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Models\ChallengeLeverage as Model;
use Exception;

class ChallengeLeverageService
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
        $challengeLeverage = $this->getByValue($value);
        if (!$challengeLeverage || ($targetModel instanceof Model && $targetModel->id === $challengeLeverage->id)) {
            return;
        }
        throw new Exception(__('challenge_leverage.value_unique'), ErrorCode::CUSTOM_ERROR);
    }
}
