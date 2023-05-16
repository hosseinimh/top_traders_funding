<?php

namespace App\Services;

use App\Models\ChallengeTrade as Model;

class ChallengeTradeService
{
    public function getPaginate(int|null $userId, int $status, int $page, int $pageItems): mixed
    {
        $query = Model::query()->join('tbl_users', 'tbl_challenges.user_id', '=', 'tbl_users.id')
            ->join('tbl_challenge_balances', 'tbl_challenges.balance_id', '=', 'tbl_challenge_balances.id')
            ->join('tbl_challenge_servers', 'tbl_challenges.server_id', '=', 'tbl_challenge_servers.id')
            ->join('tbl_challenge_platforms', 'tbl_challenges.platform_id', '=', 'tbl_challenge_platforms.id')
            ->join('tbl_challenge_leverages', 'tbl_challenges.leverage_id', '=', 'tbl_challenge_leverages.id');
        if ($userId) {
            $query = $query->where('user_id', $userId);
        }
        if ($status !== 0) {
            $query = $query->where('status', $status);
        }
        return $query->select('tbl_challenges.*', 'tbl_users.username', 'tbl_challenge_balances.value AS balance', 'tbl_challenge_servers.title AS server', 'tbl_challenge_platforms.value AS platform', 'tbl_challenge_leverages.value AS leverage',)->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $challengeId, int $dealId, string $platform, int $type,  string $time, string $brokerTime, float $commission, float $swap, float $profit, string|null $symbol, int|null $magic, int|null $orderId, int|null $positionId, int|null $reason, int|null $entryType, float $volume, float $price, float $accountCurrencyExchangeRate, float $updateSequenceNumber): mixed
    {
        $data = [
            'challenge_id' => $challengeId,
            'deal_id' => $dealId,
            'platform' => $platform,
            'type' => $type,
            'time' => $time,
            'broker_time' => $brokerTime,
            'commission' => $commission,
            'swap' => $swap,
            'profit' => $profit,
            'symbol' => $symbol,
            'magic' => $magic,
            'order_id' => $orderId,
            'position_id' => $positionId,
            'reason' => $reason,
            'entry_type' => $entryType,
            'volume' => $volume,
            'price' => $price,
            'account_currency_exchange_rate' => $accountCurrencyExchangeRate,
            'update_sequence_number' => $updateSequenceNumber,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }
}
