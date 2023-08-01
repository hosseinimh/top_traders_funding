<?php

namespace App\Http\Requests\ChallengeBalance;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengeBalanceRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'value' => 'required|numeric|min:1000|max:50000|unique:tbl_challenge_balances',
        ];
    }

    public function messages()
    {
        return [
            'value.required' => __('challenge_balance.value_required'),
            'value.numeric' => __('challenge_balance.value_numeric'),
            'value.min' => __('challenge_balance.value_min'),
            'value.max' => __('challenge_balance.value_max'),
            'value.unique' => __('challenge_balance.value_unique'),
        ];
    }
}
