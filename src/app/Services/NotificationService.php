<?php

namespace App\Services;

use App\Models\Notification as Model;

class NotificationService
{
    public function getPaginate(int $userId, int $type, int $category, int $page, int $pageItems): mixed
    {
        $query = Model::query()->where('user_id', $userId);
        if ($type !== 0) {
            $query = $query->where('type', $type);
        }
        if ($category !== 0) {
            $query = $query->where('category', $category);
        }
        return $query->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getReview(int $userId, int $type): mixed
    {
        return Model::where('user_id', $userId)->where('type', $type)->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->take(10)->get();
    }

    public function store(int $userId, int $type, int $category, int $subCategory, string $messageFields, int $priority): mixed
    {
        $data = [
            'user_id' => $userId,
            'type' => $type,
            'category' => $category,
            'sub_category' => $subCategory,
            'message_fields' => $messageFields,
            'priority' => $priority,
        ];
        return Model::create($data);
    }

    public function count(int $userId, int $type, int $category): int
    {
        $query = Model::query()->where('user_id', $userId);
        if ($type !== 0) {
            $query = $query->where('type', $type);
        }
        if ($category !== 0) {
            $query = $query->where('category', $category);
        }
        return $query->count();
    }
}
