<?php

namespace Database\Seeders;

use App\Models\ChallengeServer;
use Illuminate\Database\Seeder;

class ChallengeServerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ChallengeServer::factory()->create(['name' => 'Alpari', 'title' => 'Alpari']);
    }
}
