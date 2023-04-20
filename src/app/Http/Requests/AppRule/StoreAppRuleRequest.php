<?php

namespace App\Http\Requests\AppRule;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreAppRuleRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'title' => 'required|min:6|max:200',
            'body' => 'required|min:6|max:2000',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('app_rule.title_required'),
            'title.min' => __('app_rule.title_min'),
            'title.max' => __('app_rule.title_max'),
            'body.required' => __('app_rule.body_required'),
            'body.min' => __('app_rule.body_min'),
            'body.max' => __('app_rule.body_max'),
        ];
    }
}
