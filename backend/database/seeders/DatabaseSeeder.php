<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CandidateSeeder::class,
            RecruiterSeeder::class,
            JobListingSeeder::class,
            JobApplicationSeeder::class,
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('');
        $this->command->info('Test Accounts:');
        $this->command->info('-----------------------------');
        $this->command->info('Candidates:');
        $this->command->info('  - john@example.com / password123');
        $this->command->info('  - sarah@example.com / password123');
        $this->command->info('  - michael@example.com / password123');
        $this->command->info('');
        $this->command->info('Recruiters:');
        $this->command->info('  - hr@techcorp.com / password123');
        $this->command->info('  - talent@startuphub.io / password123');
        $this->command->info('  - careers@globalfinance.co.id / password123');
    }
}
