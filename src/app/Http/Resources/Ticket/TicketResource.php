<?php

namespace App\Http\Resources\Ticket;

use App\Constants\Locale;
use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'type' => intval($this->type),
            'typeText' => $this->getTypeText(intval($this->type)),
            'creatorId' => intval($this->creator_id),
            'userId' => intval($this->user_id),
            'adminCreated' => intval($this->admin_created),
            'subject' => $this->subject,
            'status' => intval($this->status),
            'statusText' => $this->getStatusText(intval($this->status)),
            'userSeenTime' => $this->user_seen_time,
            'userSeenTimeLocale' => app()->getLocale() === Locale::FA ? ($this->user_seen_time ? Helper::faDate2($this->user_seen_time) : null) : $this->user_seen_time,
            'adminSeenTime' => $this->admin_seen_time,
            'adminSeenTimeLocale' => app()->getLocale() === Locale::FA ? ($this->admin_seen_time ? Helper::faDate2($this->admin_seen_time) : null) : $this->admin_seen_time,
            'createdAt' =>  $this->created_at,
            'createdAtLocale' => app()->getLocale() === Locale::FA ? ($this->created_at ? Helper::faDate2($this->created_at) : null) : $this->created_at,
            'updatedAt' =>  $this->updated_at,
            'updatedAtLocale' => app()->getLocale() === Locale::FA ? ($this->updated_at ? Helper::faDate2($this->updated_at) : null) : $this->updated_at,
        ];
    }

    private function getTypeText(int $type)
    {
        $text = __('ticket.type_undefined');

        if ($type >= 1 && $type <= 5) {
            $text = __('ticket.type_' . $type);
        }

        return $text;
    }

    private function getStatusText(int $status)
    {
        $text = __('ticket.status_undefined');

        if ($status >= 1 && $status <= 2) {
            $text = __('ticket.status_' . $status);
        }

        return $text;
    }
}
