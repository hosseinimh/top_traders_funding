<?php

namespace App\Http\Requests\Challenge;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'level' => 'required|numeric|min:1|max:4',
        ];
    }

    public function messages()
    {
        return [
            'level.required' => __('challenge.level_required'),
            'level.numeric' => __('challenge.level_numeric'),
            'level.min' => __('challenge.level_min'),
            'level.max' => __('challenge.level_max'),
        ];
    }
}
