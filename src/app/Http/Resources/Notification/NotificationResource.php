<?php

namespace App\Http\Resources\Notification;

use App\Constants\Locale;
use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'type' => intval($this->type),
            'category' => intval($this->category),
            'subCategory' => intval($this->sub_category),
            'userId' => intval($this->user_id),
            'priority' => intval($this->priority),
            'seenAt' => $this->seen_at,
            'seenAtLocale' => app()->getLocale() === Locale::FA ? ($this->seen_at ? Helper::faDate2($this->seen_at) : null) : $this->seen_at,
            'createdAt' => $this->created_at,
            'createdAtLocale' => app()->getLocale() === Locale::FA ? ($this->created_at ? Helper::faDate2($this->created_at) : null) : $this->created_at,
        ];
    }
}
