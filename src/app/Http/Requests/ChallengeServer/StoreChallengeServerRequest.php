<?php

namespace App\Http\Requests\ChallengeServer;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengeServerRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50|unique:tbl_challenge_servers',
            'title' => 'required|min:3|max:50|unique:tbl_challenge_servers',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('challenge_server.name_required'),
            'name.min' => __('challenge_server.name_min'),
            'name.max' => __('challenge_server.name_max'),
            'name.unique' => __('challenge_server.name_unique'),
            'title.required' => __('challenge_server.title_required'),
            'title.min' => __('challenge_server.title_min'),
            'title.max' => __('challenge_server.title_max'),
            'title.unique' => __('challenge_server.title_unique'),
        ];
    }
}
