<?php

namespace Database\Seeders;

use App\Models\ChallengeBalance;
use Illuminate\Database\Seeder;

class ChallengeBalanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ChallengeBalance::factory()->create(['value' => 1000]);
        ChallengeBalance::factory()->create(['value' => 5000]);
        ChallengeBalance::factory()->create(['value' => 10000]);
        ChallengeBalance::factory()->create(['value' => 25000]);
        ChallengeBalance::factory()->create(['value' => 50000]);
    }
}
