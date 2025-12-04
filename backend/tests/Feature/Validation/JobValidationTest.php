<?php

namespace Tests\Feature\Validation;

use App\Models\Candidate;
use App\Models\JobListing;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class JobValidationTest extends TestCase
{
    use RefreshDatabase;

    protected User $recruiterUser;
    protected Recruiter $recruiter;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create recruiter for testing
        $this->recruiterUser = User::factory()->recruiter()->create();
        $this->recruiter = Recruiter::factory()->forUser($this->recruiterUser)->create();
    }

    // ==========================================
    // CREATE JOB VALIDATION TESTS
    // ==========================================

    /** @test */
    public function create_job_requires_title(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    /** @test */
    public function create_job_requires_company_name(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['company_name']);
    }

    /** @test */
    public function create_job_requires_location(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['location']);
    }

    /** @test */
    public function create_job_type_must_be_valid(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'InvalidType',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type']);
    }

    /** @test */
    public function create_job_mode_must_be_valid(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'InvalidMode',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['mode']);
    }

    /** @test */
    public function create_job_deadline_must_be_future_date(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->subDays(5)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['deadline']);
    }

    /** @test */
    public function create_job_requires_contact_email(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['contact_email']);
    }

    /** @test */
    public function create_job_contact_email_must_be_valid(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'invalid-email',
                'description' => 'Job description here',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['contact_email']);
    }

    /** @test */
    public function create_job_salary_max_must_be_greater_than_min(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description here',
                'salary_min' => 10000000,
                'salary_max' => 5000000,
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['salary_max']);
    }

    /** @test */
    public function create_job_with_valid_data_passes_validation(): void
    {
        $response = $this->actingAs($this->recruiterUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta, Indonesia',
                'department' => 'Engineering',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'level' => 'Mid Level',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'duration' => '1 year',
                'salary_min' => 5000000,
                'salary_max' => 10000000,
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'contact_phone' => '08123456789',
                'description' => 'Looking for a talented software engineer.',
                'responsibilities' => ['Build features', 'Write tests'],
                'requirements' => ['3+ years experience', 'Laravel knowledge'],
                'benefits' => ['Health insurance', 'Remote work options'],
            ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors();
    }

    // ==========================================
    // UPDATE JOB VALIDATION TESTS
    // ==========================================

    /** @test */
    public function update_job_type_must_be_valid(): void
    {
        $job = JobListing::factory()->create(['recruiter_id' => $this->recruiter->id]);

        $response = $this->actingAs($this->recruiterUser)
            ->putJson("/api/v1/jobs/{$job->id}", [
                'type' => 'InvalidType',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type']);
    }

    /** @test */
    public function update_job_with_valid_partial_data(): void
    {
        $job = JobListing::factory()->create(['recruiter_id' => $this->recruiter->id]);

        $response = $this->actingAs($this->recruiterUser)
            ->putJson("/api/v1/jobs/{$job->id}", [
                'title' => 'Updated Title',
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    // ==========================================
    // AUTHORIZATION TESTS
    // ==========================================

    /** @test */
    public function candidate_cannot_create_job(): void
    {
        $candidateUser = User::factory()->candidate()->create();
        Candidate::factory()->forUser($candidateUser)->create();

        $response = $this->actingAs($candidateUser)
            ->postJson('/api/v1/jobs', [
                'title' => 'Software Engineer',
                'company_name' => 'Tech Corp',
                'location' => 'Jakarta',
                'type' => 'Full Time',
                'mode' => 'On-site',
                'deadline' => now()->addDays(30)->format('Y-m-d'),
                'contact_name' => 'HR Manager',
                'contact_email' => 'hr@company.com',
                'description' => 'Job description',
            ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function guest_cannot_create_job(): void
    {
        $response = $this->postJson('/api/v1/jobs', [
            'title' => 'Software Engineer',
        ]);

        $response->assertStatus(401);
    }
}
