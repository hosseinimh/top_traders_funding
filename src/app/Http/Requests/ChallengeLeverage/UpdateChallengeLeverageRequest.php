<?php

namespace App\Http\Requests\ChallengeLeverage;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateChallengeLeverageRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'value' => 'required|numeric|min:50|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'value.required' => __('challenge_leverage.value_required'),
            'value.numeric' => __('challenge_leverage.value_numeric'),
            'value.min' => __('challenge_leverage.value_min'),
            'value.max' => __('challenge_leverage.value_max'),
        ];
    }
}
