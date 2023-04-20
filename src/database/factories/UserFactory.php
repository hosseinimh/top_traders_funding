<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => fake()->unique()->safeEmail(),
            'password' => '123456789a',
            'name' => fake()->firstName(),
            'family' => fake()->lastName(),
            'email' => fake()->email(),
            'is_active' => rand(0, 1),
        ];
    }
}
