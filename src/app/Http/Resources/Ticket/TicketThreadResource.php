<?php

namespace App\Http\Resources\Ticket;

use App\Constants\Locale;
use App\Facades\Helper;
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
            'userSeenTime' => $this->user_seen_time,
            'userSeenTimeLocale' => app()->getLocale() === Locale::FA ? ($this->user_seen_time ? Helper::faDate2($this->user_seen_time) : null) : $this->user_seen_time,
            'adminSeenTime' => $this->admin_seen_time,
            'adminSeenTimeLocale' => app()->getLocale() === Locale::FA ? ($this->admin_seen_time ? Helper::faDate2($this->admin_seen_time) : null) : $this->admin_seen_time,
            'file' => $this->file ?? null,
            'createdAt' =>  $this->created_at,
            'createdAtLocale' => app()->getLocale() === Locale::FA ? ($this->created_at ? Helper::faDate2($this->created_at) : null) : $this->created_at,
        ];
    }
}
