<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Candidate;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = [
            [
                'user' => [
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'password' => Hash::make('password123'),
                    'role' => 'candidate',
                ],
                'profile' => [
                    'first_name' => 'John',
                    'last_name' => 'Doe',
                    'phone' => '+6281234567890',
                    'linkedin' => 'https://linkedin.com/in/johndoe',
                    'location' => 'Jakarta, Indonesia',
                    'about' => 'Passionate software developer with 3+ years of experience in web development. Skilled in React, Node.js, and Laravel.',
                    'role' => 'Full Stack Developer',
                    'skills' => ['JavaScript', 'React', 'Node.js', 'Laravel', 'PHP', 'MySQL', 'Git', 'Docker'],
                    'experiences' => [
                        [
                            'company' => 'Tech Startup Indonesia',
                            'position' => 'Junior Developer',
                            'start_date' => '2021-01-01',
                            'end_date' => '2023-06-30',
                            'description' => 'Developed web applications using React and Node.js',
                        ],
                        [
                            'company' => 'Freelance',
                            'position' => 'Full Stack Developer',
                            'start_date' => '2023-07-01',
                            'end_date' => null,
                            'description' => 'Building custom web solutions for various clients',
                        ],
                    ],
                    'education' => [
                        [
                            'institution' => 'Universitas Indonesia',
                            'degree' => 'Bachelor',
                            'field' => 'Computer Science',
                            'start_year' => 2017,
                            'end_year' => 2021,
                        ],
                    ],
                    'preferred_location' => 'Jakarta, Bandung',
                    'experience_level' => 'Mid Level',
                    'portfolio_link' => 'https://johndoe.dev',
                ],
            ],
            [
                'user' => [
                    'name' => 'Sarah Wilson',
                    'email' => 'sarah@example.com',
                    'password' => Hash::make('password123'),
                    'role' => 'candidate',
                ],
                'profile' => [
                    'first_name' => 'Sarah',
                    'last_name' => 'Wilson',
                    'phone' => '+6281234567891',
                    'linkedin' => 'https://linkedin.com/in/sarahwilson',
                    'location' => 'Bandung, Indonesia',
                    'about' => 'UI/UX Designer with a passion for creating beautiful and intuitive user experiences. 4 years of experience in product design.',
                    'role' => 'UI/UX Designer',
                    'skills' => ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Design Systems', 'HTML', 'CSS'],
                    'experiences' => [
                        [
                            'company' => 'Digital Agency Bandung',
                            'position' => 'UI Designer',
                            'start_date' => '2020-03-01',
                            'end_date' => '2022-12-31',
                            'description' => 'Designed user interfaces for mobile and web applications',
                        ],
                        [
                            'company' => 'E-commerce Company',
                            'position' => 'Senior UI/UX Designer',
                            'start_date' => '2023-01-01',
                            'end_date' => null,
                            'description' => 'Leading design team for product improvements',
                        ],
                    ],
                    'education' => [
                        [
                            'institution' => 'Institut Teknologi Bandung',
                            'degree' => 'Bachelor',
                            'field' => 'Visual Communication Design',
                            'start_year' => 2016,
                            'end_year' => 2020,
                        ],
                    ],
                    'preferred_location' => 'Bandung, Remote',
                    'experience_level' => 'Senior',
                    'portfolio_link' => 'https://dribbble.com/sarahwilson',
                ],
            ],
            [
                'user' => [
                    'name' => 'Michael Chen',
                    'email' => 'michael@example.com',
                    'password' => Hash::make('password123'),
                    'role' => 'candidate',
                ],
                'profile' => [
                    'first_name' => 'Michael',
                    'last_name' => 'Chen',
                    'phone' => '+6281234567892',
                    'linkedin' => 'https://linkedin.com/in/michaelchen',
                    'location' => 'Surabaya, Indonesia',
                    'about' => 'Data Scientist with expertise in machine learning and statistical analysis. Experienced in Python, R, and SQL.',
                    'role' => 'Data Scientist',
                    'skills' => ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch', 'Pandas', 'Machine Learning', 'Data Visualization'],
                    'experiences' => [
                        [
                            'company' => 'Finance Corp',
                            'position' => 'Data Analyst',
                            'start_date' => '2019-06-01',
                            'end_date' => '2021-12-31',
                            'description' => 'Analyzed financial data and created predictive models',
                        ],
                        [
                            'company' => 'AI Startup',
                            'position' => 'Data Scientist',
                            'start_date' => '2022-01-01',
                            'end_date' => null,
                            'description' => 'Building ML models for recommendation systems',
                        ],
                    ],
                    'education' => [
                        [
                            'institution' => 'Institut Teknologi Sepuluh Nopember',
                            'degree' => 'Master',
                            'field' => 'Data Science',
                            'start_year' => 2017,
                            'end_year' => 2019,
                        ],
                    ],
                    'preferred_location' => 'Surabaya, Jakarta, Remote',
                    'experience_level' => 'Senior',
                    'portfolio_link' => 'https://github.com/michaelchen',
                ],
            ],
        ];

        foreach ($candidates as $data) {
            $user = User::create($data['user']);
            $data['profile']['user_id'] = $user->id;
            Candidate::create($data['profile']);
        }
    }
}
