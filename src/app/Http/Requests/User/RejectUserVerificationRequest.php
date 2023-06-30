<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class RejectUserVerificationRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'reject_reason' => 'required|numeric|min:1|max:3',
        ];
    }

    public function messages()
    {
        return [
            'reject_reason.required' => __('user.reject_reason_required'),
            'reject_reason.numeric' => __('user.reject_reason_numeric'),
            'reject_reason.min' => __('user.reject_reason_min'),
            'reject_reason.max' => __('user.reject_reason_max'),
        ];
    }
}
