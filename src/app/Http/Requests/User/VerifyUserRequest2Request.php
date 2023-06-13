<?php

namespace App\Http\Requests\User;

use App\Constants\ErrorCode;
use App\Constants\Locale;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class VerifyUserRequest2Request extends FormRequest
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
                'mobile' => 'required|max_digits:11',
                'tel' => 'required|max_digits:11',
                'email' => 'required|regex:/(.+)@(.+)\.(.+)/i|min:5|max:50',
                'address' => 'required|min:20|max:300',
            ];
        }
        return [
            'mobile' => 'required|max_digits:11',
            'tel' => 'required|max_digits:11',
            'email' => 'required|regex:/(.+)@(.+)\.(.+)/i|min:5|max:50',
            'address' => 'required|min:20|max:300',
        ];
    }

    public function messages()
    {
        return [
            'mobile.required' => __('user.mobile_required'),
            'mobile.max_digits' => __('user.mobile_max_digits'),
            'tel.required' => __('user.tel_required'),
            'tel.max_digits' => __('user.tel_max_digits'),
            'email.required' => __('user.email_required'),
            'email.regex' => __('user.email_regex'),
            'email.min' => __('user.email_min'),
            'email.max' => __('user.email_max'),
            'address.required' => __('user.address_required'),
            'address.min' => __('user.address_min'),
            'address.max' => __('user.address_max'),
        ];
    }
}
