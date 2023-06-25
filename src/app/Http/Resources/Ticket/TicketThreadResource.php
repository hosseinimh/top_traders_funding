<?php

namespace App\Http\Resources\Ticket;

use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketThreadResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'ticketId' => intval($this->ticket_id),
            'creatorId' => intval($this->creator_id),
            'creatorName' => $this->creator_name,
            'creatorFamily' => $this->creator_family,
            'adminCreated' => intval($this->admin_created),
            'content' => $this->content,
            'userSeenAt' => $this->user_seen_at ? (new DateTime($this->user_seen_at))->format('Y-m-d H:i:s') : null,
            'adminSeenAt' => $this->admin_seen_at ? (new DateTime($this->admin_seen_at))->format('Y-m-d H:i:s') : null,
            'file' => $this->file ?? null,
            'createdAt' => (new DateTime($this->created_at))->format('Y-m-d H:i:s'),
        ];
    }
}
