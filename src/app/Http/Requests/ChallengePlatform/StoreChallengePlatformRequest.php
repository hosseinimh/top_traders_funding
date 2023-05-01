<?php

namespace App\Http\Requests\ChallengePlatform;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengePlatformRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'value' => 'required|min:3|max:50|unique:tbl_challenge_platforms',
        ];
    }

    public function messages()
    {
        return [
            'value.required' => __('challenge_platform.value_required'),
            'value.min' => __('challenge_platform.value_min'),
            'value.max' => __('challenge_platform.value_max'),
            'value.unique' => __('challenge_platform.value_unique'),
        ];
    }
}
