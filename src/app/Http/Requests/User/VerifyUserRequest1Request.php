<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use App\Constants\Locale;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class VerifyUserRequest1Request extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        if (app()->getLocale() === Locale::FA) {
            return [
                'name' => 'required|min:2|max:50',
                'family' => 'required|min:2|max:50',
                'father_name' => 'required|min:2|max:50',
                'national_no' => 'required|digits:10',
                'identity_no' => 'required|gte:0|max_digits:10',
                'birth_date' => 'required|numeric|gte:13000101',
            ];
        }
        return [
            'name' => 'required|min:2|max:50',
            'family' => 'required|min:2|max:50',
            'father_name' => 'required|min:2|max:50',
            'national_no' => 'required|digits:10',
            'identity_no' => 'required|gte:0|max_digits:10',
            'birth_date' => 'required|numeric|gte:19000101',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('user.name_required'),
            'name.min' => __('user.name_min'),
            'name.max' => __('user.name_max'),
            'family.required' => __('user.family_required'),
            'family.min' => __('user.family_min'),
            'family.max' => __('user.family_max'),
            'father_name.required' => __('user.father_name_required'),
            'father_name.min' => __('user.father_name_min'),
            'father_name.max' => __('user.father_name_max'),
            'national_no.required' => __('user.national_no_required'),
            'national_no.digits' => __('user.national_no_digits'),
            'identity_no.required' => __('user.identity_no_required'),
            'identity_no.gte' => __('user.identity_no_gte'),
            'identity_no.max_digits' => __('user.identity_no_max_digits'),
            'birth_date.required' => __('user.birth_date_required'),
            'birth_date.numeric' => __('user.birth_date_numeric'),
            'birth_date.gte' => __('user.birth_date_gte'),
        ];
    }
}
