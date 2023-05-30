<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class VerifyRequestUserRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:2|max:50',
            'family' => 'required|min:2|max:50',
            'father_name' => 'required|min:3|max:50',
            'national_no' => 'required|digits:10',
            'identity_no' => 'required|max_digits:10',
            'birth_date' => 'required|numeric|gte:13000101',
            'address' => 'required|max:300',
            'mobile' => 'required|max_digits:11',
            'tel' => 'required|max_digits:20',
            'email' => 'required|min:5|max:50|unique:tbl_users',
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
            'identity_no.max_digits' => __('user.identity_no_max_digits'),
            'birth_date.required' => __('user.birth_date_required'),
            'birth_date.numeric' => __('user.birth_date_numeric'),
            'birth_date.gte' => __('user.birth_date_gte'),
            'address.required' => __('user.address_required'),
            'address.max' => __('user.address_max'),
            'mobile.required' => __('user.mobile_required'),
            'mobile.max_digits' => __('user.mobile_max_digits'),
            'tel.required' => __('user.tel_required'),
            'tel.max_digits' => __('user.tel_max_digits'),
            'email.required' => __('user.email_required'),
            'email.min' => __('user.email_min'),
            'email.max' => __('user.email_max'),
            'email.unique' => __('user.email_unique'),

        ];
    }
}
