<?php

namespace App\Services;

use App\Models\Ticket as Model;
use App\Models\TicketThread;

class TicketService
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function getPaginate(int $userId, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_tickets.*', 'tbl_ticket_threads.user_seen_at', 'tbl_ticket_threads.admin_seen_at')->leftJoin('tbl_ticket_threads', function ($join) {
            $join->on('tbl_tickets.id', '=', 'tbl_ticket_threads.ticket_id')->whereRaw('`tbl_ticket_threads`.`id` IN (SELECT MAX(`id`) FROM `tbl_ticket_threads` WHERE `ticket_id`=`tbl_tickets`.`id`)');
        })->where('user_id', $userId)->orderBy('tbl_tickets.updated_at', 'DESC')->orderBy('tbl_tickets.id', 'DESC')->orderBy('tbl_ticket_threads.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function threads(int $ticketId): mixed
    {
        return TicketThread::select('tbl_ticket_threads.*', 'tbl_users.name AS creator_name', 'tbl_users.family AS creator_family')->join('tbl_users', 'tbl_ticket_threads.creator_id', '=', 'tbl_users.id')->where('ticket_id', $ticketId)->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->get();
    }

    public function store(int $type, int $userId, int $creatorId, int $adminCreated, string $subject, string $content, int $status): mixed
    {
        $data = [
            'type' => $type,
            'creator_id' => $creatorId,
            'user_id' => $userId,
            'admin_created' => $adminCreated,
            'subject' => $subject,
            'status' => $status,
        ];
        $model = Model::create($data);

        if ($model) {
            $thread = $this->storeThread($model->id, $creatorId, $adminCreated, $content);
        }

        return $thread ?? null;
    }

    public function storeThread(int $ticketId, int $creatorId, int $adminCreated, string $content): mixed
    {
        $data = [
            'ticket_id' => $ticketId,
            'creator_id' => $creatorId,
            'content' => $content,
            'admin_seen_at' => $adminCreated === 1 ? date('Y-m-d H:i:s') : null,
            'user_seen_at' => $adminCreated === 1 ? null : date('Y-m-d H:i:s'),
            'admin_created' => $adminCreated,
        ];
        $thread = TicketThread::create($data);

        return $thread ?? null;
    }

    public function userSeen(Model $model): bool
    {
        if ($model->user_seen_at) {
            return false;
        }
        return TicketThread::query()->where('ticket_id', $model->id)->update(['user_seen_at' => date('Y-m-d H:i:s')]);
    }

    public function adminSeen(Model $model): bool
    {
        if ($model->admin_seen_at) {
            return false;
        }
        return TicketThread::query()->where('ticket_id', $model->id)->update(['admin_seen_at' => date('Y-m-d H:i:s')]);
    }

    public function changeStatus(Model $model, int $status): bool
    {
        $data = [
            'status' => $status,
        ];

        return $model->update($data);
    }

    public function count(int $userId): int
    {
        return TicketThread::query()->join('tbl_tickets', 'tbl_ticket_threads.ticket_id', '=', 'tbl_tickets.id')->where('user_id', $userId)->count();
    }

    public function countUnseen(int $userId): int
    {
        return TicketThread::query()->join('tbl_tickets', 'tbl_ticket_threads.ticket_id', '=', 'tbl_tickets.id')->where('user_id', $userId)->whereNull('user_seen_at')->count();
    }

    public function countAllUnseen(): int
    {
        return TicketThread::query()->join('tbl_tickets', 'tbl_ticket_threads.ticket_id', '=', 'tbl_tickets.id')->whereNull('admin_seen_at')->count();
    }
}
