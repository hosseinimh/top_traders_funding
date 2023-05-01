<?php

namespace App\Http\Requests\ChallengeRule;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class UpdateChallengeRuleRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'duration_1' => 'required|numeric|min:1|max:30',
            'duration_2' => 'required|numeric|min:30|max:60',
            'duration_real' => 'required|numeric|min:0|max:90',
            'duration_free' => 'required|numeric|min:1|max:30',
            'daily_sl_1' => 'required|numeric|min:0|max:20',
            'daily_sl_2' => 'required|numeric|min:0|max:20',
            'daily_sl_real' => 'required|numeric|min:0|max:20',
            'daily_sl_free' => 'required|numeric|min:0|max:20',
            'total_sl_1' => 'required|numeric|min:0|max:20',
            'total_sl_2' => 'required|numeric|min:0|max:20',
            'total_sl_real' => 'required|numeric|min:0|max:20',
            'total_sl_free' => 'required|numeric|min:0|max:20',
            'target_1' => 'required|numeric|min:0|max:20',
            'target_2' => 'required|numeric|min:0|max:20',
            'target_real' => 'required|numeric|min:0|max:20',
            'target_free' => 'required|numeric|min:0|max:20',
            'trade_days_1' => 'required|numeric|min:0|max:20',
            'trade_days_2' => 'required|numeric|min:0|max:20',
            'trade_days_real' => 'required|numeric|min:0|max:20',
            'trade_days_free' => 'required|numeric|min:0|max:20',
        ];
    }

    public function messages()
    {
        return [
            'duration_1.required' => __('challenge_rule.duration_1_required'),
            'duration_1.numeric' => __('challenge_rule.duration_1_numeric'),
            'duration_1.min' => __('challenge_rule.duration_1_min'),
            'duration_1.max' => __('challenge_rule.duration_1_max'),
            'duration_2.required' => __('challenge_rule.duration_2_required'),
            'duration_2.numeric' => __('challenge_rule.duration_2_numeric'),
            'duration_2.min' => __('challenge_rule.duration_2_min'),
            'duration_2.max' => __('challenge_rule.duration_2_max'),
            'duration_real.required' => __('challenge_rule.duration_real_required'),
            'duration_real.numeric' => __('challenge_rule.duration_real_numeric'),
            'duration_real.min' => __('challenge_rule.duration_real_min'),
            'duration_real.max' => __('challenge_rule.duration_real_max'),
            'duration_free.required' => __('challenge_rule.duration_free_required'),
            'duration_free.numeric' => __('challenge_rule.duration_free_numeric'),
            'duration_free.min' => __('challenge_rule.duration_free_min'),
            'duration_free.max' => __('challenge_rule.duration_free_max'),
            'daily_sl_1.required' => __('challenge_rule.daily_sl_1_required'),
            'daily_sl_1.numeric' => __('challenge_rule.daily_sl_1_numeric'),
            'daily_sl_1.min' => __('challenge_rule.daily_sl_1_min'),
            'daily_sl_1.max' => __('challenge_rule.daily_sl_1_max'),
            'daily_sl_2.required' => __('challenge_rule.daily_sl_2_required'),
            'daily_sl_2.numeric' => __('challenge_rule.daily_sl_2_numeric'),
            'daily_sl_2.min' => __('challenge_rule.daily_sl_2_min'),
            'daily_sl_2.max' => __('challenge_rule.daily_sl_2_max'),
            'daily_sl_real.required' => __('challenge_rule.daily_sl_real_required'),
            'daily_sl_real.numeric' => __('challenge_rule.daily_sl_real_numeric'),
            'daily_sl_real.min' => __('challenge_rule.daily_sl_real_min'),
            'daily_sl_real.max' => __('challenge_rule.daily_sl_real_max'),
            'daily_sl_free.required' => __('challenge_rule.daily_sl_free_required'),
            'daily_sl_free.numeric' => __('challenge_rule.daily_sl_free_numeric'),
            'daily_sl_free.min' => __('challenge_rule.daily_sl_free_min'),
            'daily_sl_free.max' => __('challenge_rule.daily_sl_free_max'),
            'total_sl_1.required' => __('challenge_rule.total_sl_1_required'),
            'total_sl_1.numeric' => __('challenge_rule.total_sl_1_numeric'),
            'total_sl_1.min' => __('challenge_rule.total_sl_1_min'),
            'total_sl_1.max' => __('challenge_rule.total_sl_1_max'),
            'total_sl_2.required' => __('challenge_rule.total_sl_2_required'),
            'total_sl_2.numeric' => __('challenge_rule.total_sl_2_numeric'),
            'total_sl_2.min' => __('challenge_rule.total_sl_2_min'),
            'total_sl_2.max' => __('challenge_rule.total_sl_2_max'),
            'total_sl_real.required' => __('challenge_rule.total_sl_real_required'),
            'total_sl_real.numeric' => __('challenge_rule.total_sl_real_numeric'),
            'total_sl_real.min' => __('challenge_rule.total_sl_real_min'),
            'total_sl_real.max' => __('challenge_rule.total_sl_real_max'),
            'total_sl_free.required' => __('challenge_rule.total_sl_free_required'),
            'total_sl_free.numeric' => __('challenge_rule.total_sl_free_numeric'),
            'total_sl_free.min' => __('challenge_rule.total_sl_free_min'),
            'total_sl_free.max' => __('challenge_rule.total_sl_free_max'),
            'target_1.required' => __('challenge_rule.target_1_required'),
            'target_1.numeric' => __('challenge_rule.target_1_numeric'),
            'target_1.min' => __('challenge_rule.target_1_min'),
            'target_1.max' => __('challenge_rule.target_1_max'),
            'target_2.required' => __('challenge_rule.target_2_required'),
            'target_2.numeric' => __('challenge_rule.target_2_numeric'),
            'target_2.min' => __('challenge_rule.target_2_min'),
            'target_2.max' => __('challenge_rule.target_2_max'),
            'target_real.required' => __('challenge_rule.target_real_required'),
            'target_real.numeric' => __('challenge_rule.target_real_numeric'),
            'target_real.min' => __('challenge_rule.target_real_min'),
            'target_real.max' => __('challenge_rule.target_real_max'),
            'target_free.required' => __('challenge_rule.target_free_required'),
            'target_free.numeric' => __('challenge_rule.target_free_numeric'),
            'target_free.min' => __('challenge_rule.target_free_min'),
            'target_free.max' => __('challenge_rule.target_free_max'),
            'trade_days_1.required' => __('challenge_rule.trade_days_1_required'),
            'trade_days_1.numeric' => __('challenge_rule.trade_days_1_numeric'),
            'trade_days_1.min' => __('challenge_rule.trade_days_1_min'),
            'trade_days_1.max' => __('challenge_rule.trade_days_1_max'),
            'trade_days_2.required' => __('challenge_rule.trade_days_2_required'),
            'trade_days_2.numeric' => __('challenge_rule.trade_days_2_numeric'),
            'trade_days_2.min' => __('challenge_rule.trade_days_2_min'),
            'trade_days_2.max' => __('challenge_rule.trade_days_2_max'),
            'trade_days_real.required' => __('challenge_rule.trade_days_real_required'),
            'trade_days_real.numeric' => __('challenge_rule.trade_days_real_numeric'),
            'trade_days_real.min' => __('challenge_rule.trade_days_real_min'),
            'trade_days_real.max' => __('challenge_rule.trade_days_real_max'),
            'trade_days_free.required' => __('challenge_rule.trade_days_free_required'),
            'trade_days_free.numeric' => __('challenge_rule.trade_days_free_numeric'),
            'trade_days_free.min' => __('challenge_rule.trade_days_free_min'),
            'trade_days_free.max' => __('challenge_rule.trade_days_free_max'),
        ];
    }
}
