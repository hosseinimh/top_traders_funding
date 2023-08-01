<?php

namespace App\Http\Requests\ChallengeTrade;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreChallengeTradesRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::STORE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'trades' => 'required|array|min:1',
            'trades.*.deal_id' => 'required|numeric|gt:0',
            'trades.*.platform' => 'required',
            'trades.*.type' => 'required|max:200',
            'trades.*.time' => 'required',
            'trades.*.broker_time' => 'required',
            'trades.*.commission' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'trades.*.swap' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'trades.*.profit' => 'required|regex:/^(-)?[0-9]+(\.[0-9][0-9]?)?$/',
            'trades.*.magic' => 'numeric|nullable',
            'trades.*.order_id' => 'numeric|gt:0|nullable',
            'trades.*.position_id' => 'numeric|gt:0|nullable',
            'trades.*.reason' => 'max:200',
            'trades.*.entry_type' => 'max:200',
            'trades.*.volume' => 'numeric|nullable',
            'trades.*.price' => 'numeric|nullable',
            'trades.*.account_currency_exchange_rate' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/|nullable',
            'trades.*.update_sequence_number' => 'numeric|nullable',
            'trades.*.comment' => 'max:200',
        ];
    }

    public function messages()
    {
        return [
            'trades.required' => __('challenge_trade.trades_required'),
            'trades.array' => __('challenge_trade.trades_array'),
            'trades.min' => __('challenge_trade.trades_min'),
            'trades.*.deal_id.required' => __('challenge_trade.deal_id_required'),
            'trades.*.deal_id.numeric' => __('challenge_trade.deal_id_numeric'),
            'trades.*.deal_id.gt' => __('challenge_trade.deal_id_gt'),
            'trades.*.platform.required' => __('challenge_trade.platform_required'),
            'trades.*.type.required' => __('challenge_trade.type_required'),
            'trades.*.type.max' => __('challenge_trade.type_max'),
            'trades.*.time.required' => __('challenge_trade.time_required'),
            'trades.*.broker_time.required' => __('challenge_trade.broker_time_required'),
            'trades.*.commission.required' => __('challenge_trade.commission_required'),
            'trades.*.commission.regex' => __('challenge_trade.commission_regex'),
            'trades.*.swap.required' => __('challenge_trade.swap_required'),
            'trades.*.swap.regex' => __('challenge_trade.swap_regex'),
            'trades.*.profit.required' => __('challenge_trade.profit_required'),
            'trades.*.profit.regex' => __('challenge_trade.profit_regex'),
            'trades.*.magic.numeric' => __('challenge_trade.magic_numeric'),
            'trades.*.magic.nullable' => __('challenge_trade.magic_nullable'),
            'trades.*.order_id.numeric' => __('challenge_trade.order_id_numeric'),
            'trades.*.order_id.gt' => __('challenge_trade.order_id_gt'),
            'trades.*.order_id.nullable' => __('challenge_trade.order_id_nullable'),
            'trades.*.position_id.numeric' => __('challenge_trade.position_id_numeric'),
            'trades.*.position_id.gt' => __('challenge_trade.position_id_gt'),
            'trades.*.position_id.nullable' => __('challenge_trade.position_id_nullable'),
            'trades.*.reason.max' => __('challenge_trade.reason_max'),
            'trades.*.entry_type.max' => __('challenge_trade.entry_type_max'),
            'trades.*.volume.numeric' => __('challenge_trade.volume_numeric'),
            'trades.*.volume.nullable' => __('challenge_trade.volume_nullable'),
            'trades.*.price.numeric' => __('challenge_trade.price_numeric'),
            'trades.*.price.nullable' => __('challenge_trade.price_nullable'),
            'trades.*.account_currency_exchange_rate.required' => __('challenge_trade.account_currency_exchange_rate_required'),
            'trades.*.account_currency_exchange_rate.regex' => __('challenge_trade.account_currency_exchange_rate_regex'),
            'trades.*.account_currency_exchange_rate.nullable' => __('challenge_trade.account_currency_exchange_rate_nullable'),
            'trades.*.update_sequence_number.numeric' => __('challenge_trade.update_sequence_number_numeric'),
            'trades.*.update_sequence_number.nullable' => __('challenge_trade.update_sequence_number_nullable'),
            'trades.*.comment.max' => __('challenge_trade.comment_max'),
        ];
    }
}
