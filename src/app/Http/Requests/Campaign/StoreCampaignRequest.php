<?php

namespace App\Http\Requests\Campaign;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreCampaignRequest extends FormRequest
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
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('campaign.title_required'),
            'title.min' => __('campaign.title_min'),
            'title.max' => __('campaign.title_max'),
        ];
    }
}
