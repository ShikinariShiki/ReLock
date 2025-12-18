<?php

namespace Database\Factories;

use App\Models\Akun;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rekruter>
 */
class RekruterFactory extends Factory
{
    public function definition(): array
    {
        return [
            'akun_id' => Akun::factory()->rekruter(),
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
     * Associate with existing akun
     */
    public function forAkun(Akun $akun): static
    {
        return $this->state(fn (array $attributes) => [
            'akun_id' => $akun->id,
        ]);
    }
}
