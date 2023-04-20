<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ForgotPasswordRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::USER_NOT_FOUND], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'email' => 'required|min:5|max:50',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => __('user.email_required'),
            'email.min' => __('user.email_min'),
            'email.max' => __('user.email_max'),
        ];
    }
}
