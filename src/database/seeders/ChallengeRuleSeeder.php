<?php

namespace Database\Seeders;

use App\Models\ChallengeRule;
use Illuminate\Database\Seeder;

class ChallengeRuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ChallengeRule::factory()->create();
    }
}
