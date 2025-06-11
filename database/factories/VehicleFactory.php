<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_path' => fake()->imageUrl(),
            'type' => fake()->randomElement(['bicycle', 'motorcycle', 'e-bike_2s', 'e-bike_4s']),
            'plate_number' =>fake()->sentence(),
            'color' => fake()->randomElement(['red', 'orange', 'yellow', 'green', 'blue', 'black', 'violet', 'white', 'silver', 'gray']),
            'description' => fake()->sentence(),
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => time(),
            'updated_at' => time(),
            'assigned_user_id' => 1,
        ];
    }
}
