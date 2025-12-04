<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recruiter>
 */
class RecruiterFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->recruiter(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'company_name' => fake()->company(),
            'company_website' => 'https://' . fake()->domainName(),
            'phone' => fake()->phoneNumber(),
            'position' => fake()->jobTitle(),
            'company_description' => fake()->paragraph(),
            'company_logo' => null,
            'location' => fake()->city() . ', Indonesia',
        ];
    }

    /**
     * Associate with existing user
     */
    public function forUser(User $user): static
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }
}
