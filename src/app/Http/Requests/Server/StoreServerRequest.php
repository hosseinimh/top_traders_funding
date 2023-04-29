<?php

namespace App\Http\Requests\Server;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreServerRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:50|unique:tbl_servers',
            'title' => 'required|min:3|max:50|unique:tbl_servers',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => __('server.name_required'),
            'name.min' => __('server.name_min'),
            'name.max' => __('server.name_max'),
            'name.unique' => __('server.name_unique'),
            'title.required' => __('server.title_required'),
            'title.min' => __('server.title_min'),
            'title.max' => __('server.title_max'),
            'title.unique' => __('server.title_unique'),
        ];
    }
}
