<?php

namespace Database\Factories;

use App\Models\Rekruter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lowongan>
 */
class LowonganFactory extends Factory
{
    public function definition(): array
    {
        $salaryMin = fake()->numberBetween(3000000, 10000000);
        
        return [
            'rekruter_id' => Rekruter::factory(),
            'title' => fake()->jobTitle(),
            'company_name' => fake()->company(),
            'location' => fake()->city() . ', Indonesia',
            'department' => fake()->randomElement(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance']),
            'type' => fake()->randomElement(['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship']),
            'mode' => fake()->randomElement(['On-site', 'Remote', 'Hybrid']),
            'level' => fake()->randomElement(['Entry Level', 'Mid Level', 'Senior', 'Lead']),
            'deadline' => now()->addDays(30),
            'duration' => fake()->randomElement(['3 months', '6 months', '1 year', 'Permanent']),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMin + fake()->numberBetween(2000000, 5000000),
            'contact_name' => fake()->name(),
            'contact_email' => fake()->email(),
            'contact_phone' => fake()->phoneNumber(),
            'description' => fake()->paragraphs(3, true),
            'responsibilities' => json_encode(['Responsibility 1', 'Responsibility 2', 'Responsibility 3']),
            'requirements' => json_encode(['Requirement 1', 'Requirement 2', 'Requirement 3']),
            'benefits' => json_encode(['Benefit 1', 'Benefit 2', 'Benefit 3']),
            'status' => 'active',
        ];
    }

    /**
     * Job with expired deadline
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'deadline' => now()->subDays(7),
        ]);
    }

    /**
     * Closed job
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
        ]);
    }

    /**
     * Draft job
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
        ]);
    }
}
