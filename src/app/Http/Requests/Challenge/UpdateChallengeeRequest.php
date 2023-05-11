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
        ];
    }
}
