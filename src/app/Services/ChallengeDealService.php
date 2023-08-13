<?php

namespace App\Services;

use App\Constants\ChallengeStatus;
use App\Constants\ErrorCode;
use App\Facades\Helper;
use App\Facades\MetaApi;
use App\Models\Challenge;
use App\Models\ChallengeDeal as Model;
use Error;
use Exception;

class ChallengeDealService
{
    public function getByDealIdAndType(string $dealId, string $type): mixed
    {
        return Model::where('deal_id', $dealId)->where('type', $type)->first();
    }

    public function getAll(Challenge $challenge, bool $fetchDeals): mixed
    {
        if (in_array($challenge->status, [ChallengeStatus::WAITING_TRADE, ChallengeStatus::TRADING]) && $fetchDeals) {
            $this->fetchAndUpdateDeals($challenge);
        }
        return Model::where('challenge_id', $challenge->id)->orderBy('update_sequence_number', 'ASC')->orderBy('id', 'ASC')->get();
    }

    public function getDealsDetails($deals): array|null
    {
        try {
            $dealsCount = 0;
            $successfulDeals = 0;
            $failedDeals = 0;
            $closedDeals = 0;
            $totalVolume = 0;
            $totalProfit = 0;
            $maxProfit = 0;
            $totalLoss = 0;
            $maxLoss = 0;
            foreach ($deals as $deal) {
                if ($deal->entry_type  === 'DEAL_ENTRY_IN') {
                    $dealsCount++;
                }
                if ($deal->entry_type  === 'DEAL_ENTRY_OUT') {
                    $closedDeals++;
                    $totalVolume += $deal->volume;
                    if ($deal->profit > 0) {
                        $successfulDeals++;
                        $totalProfit += $deal->profit;
                        if ($deal->profit > $maxProfit) {
                            $maxProfit = $deal->profit;
                        }
                    } else {
                        $failedDeals++;
                        $totalLoss += $deal->profit;
                        if ($deal->profit < $maxLoss) {
                            $maxLoss = $deal->profit;
                        }
                    }
                }
            }
            return [
                'dealsCount' => $dealsCount,
                'successfulDeals' => $successfulDeals,
                'failedDeals' => $failedDeals,
                'averageVolume' => $closedDeals === 0 ? 0 : round($totalVolume / $closedDeals, 2),
                'averageProfit' => $closedDeals === 0 ? 0 : round($totalProfit / $closedDeals, 2),
                'averageLoss' => $closedDeals === 0 ? 0 : round($totalLoss / $closedDeals, 2),
                'maxProfit' => $maxProfit,
                'maxLoss' => $maxLoss,
            ];
        } catch (Exception $e) {
            Helper::logError($e);
            return null;
        }
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

    private function fetchAndUpdateDeals(Challenge $challenge)
    {
        try {
            $accountData = $this->fetchAccountData($challenge);
            if ($accountData) {
                $this->updateDeals($challenge->id, $accountData->deals->deals);
            }
        } catch (Error) {
        }
    }

    private function fetchAccountData(Challenge $challenge): mixed
    {
        return MetaApi::fetchAccountData($challenge->meta_api_token, $challenge->meta_api_account_id);
    }

    private function updateDeals(int $challengeId, array $deals): bool
    {
        $inserted = false;
        foreach ($deals as $deal) {
            try {
                $result = $this->store($challengeId, $deal->id, $deal->platform, $deal->type, $deal->time, $deal->brokerTime, $deal->commission, $deal->swap, $deal->profit, $deal->symbol, $deal->magic, $deal->orderId, $deal->positionId, $deal->reason, $deal->entryType, $deal->volume, $deal->price, $deal->accountCurrencyExchangeRate, $deal->updateSequenceNumber, $deal->comment);
                $inserted = $inserted || ($result !== null);
            } catch (Exception $e) {
                if ($e->getCode() !== ErrorCode::CUSTOM_ERROR) {
                    Helper::logError($e);
                }
            }
        }
        if ($inserted) {
            $equity = $this->sum($challengeId);
            $challengeService = new ChallengeService();
            $challengeService->updateEquity($challengeId, $equity);
        }
        return $inserted;
    }

    private function findEntryIn($deals, $dealOut)
    {
        foreach ($deals as $deal) {
            // if ($deal->entryType === 'DEAL_ENTRY_IN' && $dealOut)
        }
    }

    private function throwIfDealIdNotUnique(string $dealId, string $type)
    {
        $model = $this->getByDealIdAndType($dealId, $type);
        if (!$model) {
            return;
        }
        throw new Exception(__('challenge_deal.deal_unique'), ErrorCode::CUSTOM_ERROR);
    }

    private function sum(int $challengeId): int
    {
        return Model::where('challenge_id', $challengeId)->sum('profit');
    }
}
