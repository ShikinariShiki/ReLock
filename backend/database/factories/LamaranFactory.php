<?php

namespace Database\Factories;

use App\Models\Kandidat;
use App\Models\Lowongan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lamaran>
 */
class LamaranFactory extends Factory
{
    public function definition(): array
    {
        return [
            'kandidat_id' => Kandidat::factory(),
            'lowongan_id' => Lowongan::factory(),
            'cv_path' => 'applications/sample-cv.pdf',
            'cv_type' => 'existing',
            'status' => 'pending',
            'notes' => null,
        ];
    }

    /**
     * Pending status
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Reviewed status
     */
    public function reviewed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'reviewed',
        ]);
    }

    /**
     * Accepted status
     */
    public function accepted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'accepted',
        ]);
    }

    /**
     * Rejected status
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'notes' => 'Thank you for your interest.',
        ]);
    }
}
