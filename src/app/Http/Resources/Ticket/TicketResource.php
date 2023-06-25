<?php

namespace App\Http\Resources\Ticket;

use DateTime;
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
            'userSeenAt' => $this->user_seen_at ? (new DateTime($this->user_seen_at))->format('Y-m-d H:i:s') : null,
            'adminSeenAt' => $this->admin_seen_at ? (new DateTime($this->admin_seen_at))->format('Y-m-d H:i:s') : null,
            'createdAt' => (new DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'updatedAt' => $this->updated_at ? (new DateTime($this->updated_at))->format('Y-m-d H:i:s') : null,
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
