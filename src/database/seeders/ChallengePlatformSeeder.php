<?php

namespace Database\Seeders;

use App\Models\ChallengePlatform;
use Illuminate\Database\Seeder;

class ChallengePlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ChallengePlatform::factory()->create();
    }
}
