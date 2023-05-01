<?php

namespace Database\Seeders;

use App\Models\ChallengeLeverage;
use Illuminate\Database\Seeder;

class ChallengeLeverageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ChallengeLeverage::factory()->create(['value' => 50]);
        ChallengeLeverage::factory()->create(['value' => 100]);
        ChallengeLeverage::factory()->create(['value' => 200]);
        ChallengeLeverage::factory()->create(['value' => 300]);
        ChallengeLeverage::factory()->create(['value' => 400]);
        ChallengeLeverage::factory()->create(['value' => 500]);
        ChallengeLeverage::factory()->create(['value' => 1000]);
    }
}
