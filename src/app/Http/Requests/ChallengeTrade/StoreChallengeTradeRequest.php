<?php

namespace App\Http\Requests\ChallengeTrade;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengeTradeRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'deal_id' => 'required|numeric|gt:0',
            'platform' => 'required',
            'type' => 'required|numeric|min:1|max:3',
            'time' => 'required',
            'broker_time' => 'required',
            'commission' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'swap' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'profit' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'magic' => 'numeric|nullable',
            'order_id' => 'numeric|gt:0|nullable',
            'position_id' => 'numeric|gt:0|nullable',
            'reason' => 'required|numeric|min:1|max:1|nullable',
            'entry_type' => 'required|numeric|min:2|max:1|nullable',
            'volume' => 'regex:/^[0-9]+(\.[0-9][0-9]?)?$/|nullable',
            'price' => 'regex:/^[0-9]+(\.[0-9][0-9]?)?$/|nullable',
            'account_currency_exchange_rate' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/|nullable',
            'update_sequence_number' => 'required|numeric|gt:0',
        ];
    }

    public function messages()
    {
        return [
            'deal_id.required' => __('challenge_trade.deal_id_required'),
            'deal_id.numeric' => __('challenge_trade.deal_id_numeric'),
            'deal_id.gt' => __('challenge_trade.deal_id_gt'),
            'platform.required' => __('challenge_trade.platform_required'),
            'type.required' => __('challenge_trade.type_required'),
            'type.numeric' => __('challenge_trade.type_numeric'),
            'type.min' => __('challenge_trade.type_min'),
            'type.max' => __('challenge_trade.type_max'),
            'time.required' => __('challenge_trade.time_required'),
            'broker_time.required' => __('challenge_trade.broker_time_required'),
            'commission.required' => __('challenge_trade.commission_required'),
            'commission.regex' => __('challenge_trade.commission_regex'),
            'swap.required' => __('challenge_trade.swap_required'),
            'swap.regex' => __('challenge_trade.swap_regex'),
            'profit.required' => __('challenge_trade.profit_required'),
            'profit.regex' => __('challenge_trade.profit_regex'),
            'magic.numeric' => __('challenge_trade.magic_numeric'),
            'magic.nullable' => __('challenge_trade.magic_nullable'),
            'order_id.numeric' => __('challenge_trade.order_id_numeric'),
            'order_id.gt' => __('challenge_trade.order_id_gt'),
            'order_id.nullable' => __('challenge_trade.order_id_nullable'),
            'position_id.numeric' => __('challenge_trade.position_id_numeric'),
            'position_id.gt' => __('challenge_trade.position_id_gt'),
            'position_id.nullable' => __('challenge_trade.position_id_nullable'),
            'reason.required' => __('challenge_trade.reason_required'),
            'reason.numeric' => __('challenge_trade.reason_numeric'),
            'reason.min' => __('challenge_trade.reason_min'),
            'reason.max' => __('challenge_trade.reason_max'),
            'reason.nullable' => __('challenge_trade.reason_nullable'),
            'entry_type.required' => __('challenge_trade.entry_type_required'),
            'entry_type.numeric' => __('challenge_trade.entry_type_numeric'),
            'entry_type.min' => __('challenge_trade.entry_type_min'),
            'entry_type.max' => __('challenge_trade.entry_type_max'),
            'entry_type.nullable' => __('challenge_trade.entry_type_nullable'),
            'volume.regex' => __('challenge_trade.volume_regex'),
            'volume.nullable' => __('challenge_trade.volume_nullable'),
            'price.regex' => __('challenge_trade.price_regex'),
            'price.nullable' => __('challenge_trade.price_nullable'),
            'account_currency_exchange_rate.required' => __('challenge_trade.account_currency_exchange_rate_required'),
            'account_currency_exchange_rate.regex' => __('challenge_trade.account_currency_exchange_rate_regex'),
            'account_currency_exchange_rate.nullable' => __('challenge_trade.account_currency_exchange_rate_nullable'),
            'update_sequence_number.required' => __('challenge_trade.update_sequence_number_required'),
            'update_sequence_number.numeric' => __('challenge_trade.update_sequence_number_numeric'),
            'update_sequence_number.gt' => __('challenge_trade.update_sequence_number_gt'),
        ];
    }
}
