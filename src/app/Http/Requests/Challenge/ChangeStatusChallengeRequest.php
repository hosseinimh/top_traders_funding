<?php

namespace App\Http\Requests\Challenge;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class ChangeStatusChallengeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'challenge_status' => 'required|numeric|min:1|max:4',
        ];
    }

    public function messages()
    {
        return [
            'challenge_status.required' => __('challenge.challenge_status_required'),
            'challenge_status.numeric' => __('challenge.challenge_status_numeric'),
            'challenge_status.min' => __('challenge.challenge_status_min'),
        ];
    }
}
