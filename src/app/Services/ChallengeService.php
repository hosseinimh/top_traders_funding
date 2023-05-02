<?php

namespace App\Services;

use App\Constants\ChallengeStatus;
use App\Models\Challenge as Model;

class ChallengeService
{
    public function getPaginate(int|null $userId, int $status, int $page, int $pageItems): mixed
    {
        $query = Model::query()->join('tbl_challenge_balances', 'tbl_challenges.balance_id', '=', 'tbl_challenge_balances.id')
            ->join('tbl_challenge_servers', 'tbl_challenges.server_id', '=', 'tbl_challenge_servers.id')
            ->join('tbl_challenge_platforms', 'tbl_challenges.platform_id', '=', 'tbl_challenge_platforms.id')
            ->join('tbl_challenge_leverages', 'tbl_challenges.leverage_id', '=', 'tbl_challenge_leverages.id');

        if ($userId) {
            $query = $query->where('user_id', $userId);
        }
        if ($status !== 0) {
            $query = $query->where('status', $status);
        }

        return $query->select('tbl_challenges.*', 'tbl_challenge_balances.value AS balance', 'tbl_challenge_servers.title AS server', 'tbl_challenge_platforms.value AS platform', 'tbl_challenge_leverages.value AS leverage',)->orderBy('id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function store(int $userId, int $balanceId, int $serverId, int $platformId,  int $leverageId, int $level, int $equity): mixed
    {
        $data = [
            'user_id' => $userId,
            'balance_id' => $balanceId,
            'server_id' => $serverId,
            'platform_id' => $platformId,
            'leverage_id' => $leverageId,
            'level' => $level,
            'equity' => $equity,
        ];
        $model = Model::create($data);
        return $model ?? null;
    }

    public function changeStatus(Model $model): bool
    {
        $data = [
            'status' => ChallengeStatus::WAITING_TRADE,
            'account_no' => 2367896,
        ];

        return $model->update($data);
    }

    public function count(int|null $userId, int $status): int
    {
        $query = Model::query();

        if ($userId) {
            $query = $query->where('user_id', $userId);
        }
        if ($status !== 0) {
            $query = $query->where('status', $status);
        }

        return $query->count();
    }
}
