<?php

namespace App\Http\Resources\Challenge;

use App\Constants\ChallengeLevel;
use App\Constants\ChallengeStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class ChallengeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'userId' => intval($this->user_id),
            'balanceId' => intval($this->balance_id),
            'balance' => intval($this->balance),
            'serverId' => intval($this->server_id),
            'server' => $this->server,
            'platformId' => intval($this->platform_id),
            'platform' => intval($this->platform),
            'leverageId' => intval($this->leverage_id),
            'leverage' => intval($this->leverage),
            'level' => intval($this->level),
            'levelText' => $this->getLevelText(intval($this->level)),
            'status' => intval($this->status),
            'statusText' => $this->getStatusText(intval($this->status)),
            'accountNo' => intval($this->account_no),
            'password' => $this->password ?? '',
            'investorPassword' => $this->investor_password ?? '',
            'equity' => intval($this->equity),
        ];
    }

    private function getLevelText(int $level)
    {
        $text = __('challenge.level_undefined');

        if ($level >= ChallengeLevel::LEVEL_1 && $level <= ChallengeLevel::FREE) {
            $text = __('challenge.level_' . $level);
        }

        return $text;
    }

    private function getStatusText(int $status)
    {
        $text = __('challenge.status_undefined');

        if ($status >= ChallengeStatus::WAITING_VERIFICATION && $status <= Challengestatus::END_CHALLENGE) {
            $text = __('challenge.status_' . $status);
        }

        return $text;
    }
}
