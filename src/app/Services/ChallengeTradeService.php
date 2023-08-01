<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Facades\MetaApi;
use App\Models\Challenge;
use App\Models\ChallengeTrade as Model;
use Exception;

class ChallengeTradeService
{
    public function getByDealIdAndType(string $dealId, string $type): mixed
    {
        return Model::where('deal_id', $dealId)->where('type', $type)->first();
    }

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
        return $query->select('tbl_challenges.*', 'tbl_users.username', 'tbl_challenge_balances.value AS balance', 'tbl_challenge_servers.title AS server', 'tbl_challenge_platforms.value AS platform', 'tbl_challenge_leverages.value AS leverage')->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getAndUpdateAccountInfo(Challenge $challenge): bool
    {
        $accountInfo = $this->getAccountInfo($challenge);

        dd($accountInfo);
        if (!$accountInfo) {
            return false;
        }
    }

    public function updateTrades(int $challengeId, array $trades): bool
    {
        $inserted = false;
        foreach ($trades as $trade) {
            try {
                $result = $this->store($challengeId, $trade['deal_id'], $trade['platform'], $trade['type'], $trade['time'], $trade['broker_time'], $trade['commission'], $trade['swap'], $trade['profit'], $trade['symbol'], $trade['magic'], $trade['order_id'], $trade['position_id'], $trade['reason'], $trade['entry_type'], $trade['volume'], $trade['price'], $trade['account_currency_exchange_rate'], $trade['update_sequence_number'], $trade['comment']);
                $inserted = $inserted || ($result !== null);
            } catch (Exception) {
            }
        }
        if ($inserted) {
            $equity = $this->sum($challengeId);
            $challengeService = new ChallengeService();
            $challengeService->updateEquity($challengeId, $equity);
        }
        return $inserted;
    }

    private function store(int $challengeId, string $dealId, string $platform, string $type, string $time, string $brokerTime, float $commission, float $swap, float $profit, string|null $symbol, int|null $magic, string|null $orderId, string|null $positionId, string|null $reason, string|null $entryType, float|null $volume, float|null $price, float $accountCurrencyExchangeRate, float|null $updateSequenceNumber, string|null $comment): mixed
    {
        $this->throwIfDealIdNotUnique($dealId, $type);
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
            'comment' => $comment
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    private function getAccountInfo(Challenge $challenge)
    {
        return MetaApi::getAccountInfo($challenge->meta_api_token, $challenge->meta_api_account_id);
    }

    private function throwIfDealIdNotUnique(string $dealId, string $type)
    {
        $model = $this->getByDealIdAndType($dealId, $type);
        if (!$model) {
            return;
        }
        throw new Exception(__('challenge_trade.trade_unique'), ErrorCode::CUSTOM_ERROR);
    }

    public function sum(int $challengeId): int
    {
        return Model::where('challenge_id', $challengeId)->sum('profit');
    }
}
