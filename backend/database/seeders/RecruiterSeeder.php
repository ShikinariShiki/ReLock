<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Recruiter;

class RecruiterSeeder extends Seeder
{
    public function run(): void
    {
        $recruiters = [
            [
                'user' => [
                    'name' => 'Tech Corp HR',
                    'email' => 'hr@techcorp.com',
                    'password' => Hash::make('password123'),
                    'role' => 'recruiter',
                ],
                'profile' => [
                    'first_name' => 'Amanda',
                    'last_name' => 'Smith',
                    'company_name' => 'Tech Corp Indonesia',
                    'company_website' => 'https://techcorp.id',
                    'phone' => '+622112345678',
                    'position' => 'HR Manager',
                    'company_description' => 'Tech Corp is a leading technology company in Indonesia, specializing in enterprise software solutions. We are committed to innovation and excellence in every product we deliver.',
                    'location' => 'Jakarta, Indonesia',
                ],
            ],
            [
                'user' => [
                    'name' => 'Startup Hub Talent',
                    'email' => 'talent@startuphub.io',
                    'password' => Hash::make('password123'),
                    'role' => 'recruiter',
                ],
                'profile' => [
                    'first_name' => 'David',
                    'last_name' => 'Rahman',
                    'company_name' => 'Startup Hub',
                    'company_website' => 'https://startuphub.io',
                    'phone' => '+622112345679',
                    'position' => 'Talent Acquisition Lead',
                    'company_description' => 'Startup Hub is an innovation hub that incubates and accelerates startups. We connect talented individuals with fast-growing companies.',
                    'location' => 'Bandung, Indonesia',
                ],
            ],
            [
                'user' => [
                    'name' => 'Global Finance Recruitment',
                    'email' => 'careers@globalfinance.co.id',
                    'password' => Hash::make('password123'),
                    'role' => 'recruiter',
                ],
                'profile' => [
                    'first_name' => 'Lisa',
                    'last_name' => 'Tanaka',
                    'company_name' => 'Global Finance Indonesia',
                    'company_website' => 'https://globalfinance.co.id',
                    'phone' => '+622112345680',
                    'position' => 'Senior HR Business Partner',
                    'company_description' => 'Global Finance Indonesia is a multinational financial services company providing banking, investment, and insurance services across Southeast Asia.',
                    'location' => 'Jakarta, Indonesia',
                ],
            ],
        ];

        foreach ($recruiters as $data) {
            $user = User::create($data['user']);
            $data['profile']['user_id'] = $user->id;
            Recruiter::create($data['profile']);
        }
    }
}
