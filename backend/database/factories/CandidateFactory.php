<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidate>
 */
class CandidateFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->candidate(),
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'linkedin' => 'https://linkedin.com/in/' . fake()->userName(),
            'location' => fake()->city() . ', Indonesia',
            'about' => fake()->paragraph(),
            'role' => fake()->jobTitle(),
            'skills' => ['PHP', 'Laravel', 'JavaScript'],
            'experiences' => [],
            'organizations' => [],
            'education' => [],
            'preferred_location' => fake()->city(),
            'experience_level' => fake()->randomElement(['Entry Level', 'Mid Level', 'Senior']),
            'portfolio_link' => 'https://portfolio.example.com',
            'cv_path' => null,
            'cv_filename' => null,
            'profile_photo' => null,
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

    /**
     * With CV uploaded
     */
    public function withCv(): static
    {
        return $this->state(fn (array $attributes) => [
            'cv_path' => 'cvs/sample-cv.pdf',
            'cv_filename' => 'sample-cv.pdf',
        ]);
    }
}
