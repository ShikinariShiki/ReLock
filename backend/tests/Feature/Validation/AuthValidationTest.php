<?php

namespace Tests\Feature\Validation;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthValidationTest extends TestCase
{
    use RefreshDatabase;

    // ==========================================
    // LOGIN VALIDATION TESTS
    // ==========================================

    /** @test */
    public function login_requires_email(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function login_requires_valid_email_format(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'not-an-email',
            'password' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function login_requires_password(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'test@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /** @test */
    public function login_with_valid_data_format_passes_validation(): void
    {
        $response = $this->postJson('/api/v1/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        // Should fail auth (401) but not have validation errors (422)
        // We're testing that the FORMAT is valid, not that credentials are correct
        $this->assertNotEquals(422, $response->status());
    }

    // ==========================================
    // REGISTER CANDIDATE VALIDATION TESTS
    // ==========================================

    /** @test */
    public function register_candidate_requires_first_name(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['first_name']);
    }

    /** @test */
    public function register_candidate_requires_last_name(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['last_name']);
    }

    /** @test */
    public function register_candidate_requires_email(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function register_candidate_requires_valid_email(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'invalid-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function register_candidate_requires_unique_email(): void
    {
        // Create existing user
        \App\Models\User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function register_candidate_requires_password(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /** @test */
    public function register_candidate_password_must_be_minimum_8_characters(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => 'short',
            'password_confirmation' => 'short',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /** @test */
    public function register_candidate_password_must_be_confirmed(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /** @test */
    public function register_candidate_with_valid_data_passes_validation(): void
    {
        $response = $this->postJson('/api/v1/register/candidate', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors(['first_name', 'last_name', 'email', 'password']);
    }

    // ==========================================
    // REGISTER RECRUITER VALIDATION TESTS
    // ==========================================

    /** @test */
    public function register_recruiter_requires_company_name(): void
    {
        $response = $this->postJson('/api/v1/register/recruiter', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@company.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['company_name']);
    }

    /** @test */
    public function register_recruiter_with_valid_data_passes_validation(): void
    {
        $response = $this->postJson('/api/v1/register/recruiter', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'company_name' => 'Tech Corp',
            'email' => 'john@company.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors(['first_name', 'last_name', 'company_name', 'email', 'password']);
    }
}
