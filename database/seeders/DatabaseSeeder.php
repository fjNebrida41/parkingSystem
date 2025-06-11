<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Owner;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Fj Nebrida',
            'email' => 'fjadmin@example.com',
            'password' => bcrypt('123admin'),
            'email_verified_at' => time()
        ]);

        Owner::factory()
        ->Vehicles()
        ->create()
        ->count();
    }
}
