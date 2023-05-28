<?php

namespace App\Http\Requests\Challenge;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateChallengeeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'account_no' => 'required|numeric',
            'password' => 'required|min:5|max:50',
            'investor_password' => 'required|min:5|max:50',
            'meta_api_token' => 'required|min:5|max:1000',
            'meta_api_account_id' => 'required|min:5|max:50',
        ];
    }

    public function messages()
    {
        return [
            'account_no.required' => __('challenge.account_no_required'),
            'account_no.numeric' => __('challenge.account_no_numeric'),
            'password.required' => __('challenge.password_required'),
            'password.min' => __('challenge.password_min'),
            'password.max' => __('challenge.password_max'),
            'investor_password.required' => __('challenge.investor_password_required'),
            'investor_password.min' => __('challenge.investor_password_min'),
            'investor_password.max' => __('challenge.investor_password_max'),
            'meta_api_token.required' => __('challenge.meta_api_token_required'),
            'meta_api_token.min' => __('challenge.meta_api_token_min'),
            'meta_api_token.max' => __('challenge.meta_api_token_max'),
            'meta_api_account_id.required' => __('challenge.meta_api_account_id_required'),
            'meta_api_account_id.min' => __('challenge.meta_api_account_id_min'),
            'meta_api_account_id.max' => __('challenge.meta_api_account_id_max'),
        ];
    }
}
