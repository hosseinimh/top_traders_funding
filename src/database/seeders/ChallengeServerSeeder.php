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
        ChallengeServer::factory()->create(['name' => 'Alpari-Demo', 'title' => 'Alpari-Demo']);
        ChallengeServer::factory()->create(['name' => 'RoboForex', 'title' => 'RoboForex']);
    }
}
