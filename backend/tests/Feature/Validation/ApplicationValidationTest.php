<?php

namespace Tests\Feature\Validation;

use App\Models\Candidate;
use App\Models\JobApplication;
use App\Models\JobListing;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ApplicationValidationTest extends TestCase
{
    use RefreshDatabase;

    protected User $candidateUser;
    protected Candidate $candidate;
    protected JobListing $job;

    protected function setUp(): void
    {
        parent::setUp();
        
        Storage::fake('public');
        
        // Create candidate for testing
        $this->candidateUser = User::factory()->candidate()->create();
        $this->candidate = Candidate::factory()->forUser($this->candidateUser)->withCv()->create();
        
        // Create job for testing
        $recruiterUser = User::factory()->recruiter()->create();
        $recruiter = Recruiter::factory()->forUser($recruiterUser)->create();
        $this->job = JobListing::factory()->create(['recruiter_id' => $recruiter->id]);
    }

    // ==========================================
    // APPLY JOB VALIDATION TESTS
    // ==========================================

    /** @test */
    public function apply_job_requires_cv_type(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv_type']);
    }

    /** @test */
    public function apply_job_cv_type_must_be_existing_or_new(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'invalid',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv_type']);
    }

    /** @test */
    public function apply_job_cv_required_when_type_is_new(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'new',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv']);
    }

    /** @test */
    public function apply_job_cv_must_be_pdf(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'new',
                'cv' => UploadedFile::fake()->create('document.docx', 100),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv']);
    }

    /** @test */
    public function apply_job_cv_max_size_is_10mb(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'new',
                'cv' => UploadedFile::fake()->create('large-cv.pdf', 11000), // 11MB
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv']);
    }

    /** @test */
    public function apply_job_with_existing_cv_passes_validation(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'existing',
            ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function apply_job_with_new_cv_passes_validation(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'new',
                'cv' => UploadedFile::fake()->create('cv.pdf', 500),
            ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function cannot_apply_to_same_job_twice(): void
    {
        // First application
        $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'existing',
            ]);

        // Second application
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'existing',
            ]);

        $response->assertStatus(409)
            ->assertJson(['error' => 'already_applied']);
    }

    /** @test */
    public function cover_letter_is_optional(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'existing',
                'cover_letter' => 'I am very interested in this position.',
            ]);

        $response->assertStatus(201)
            ->assertJsonMissingValidationErrors();
    }

    // ==========================================
    // AUTHORIZATION TESTS
    // ==========================================

    /** @test */
    public function recruiter_cannot_apply_to_job(): void
    {
        $recruiterUser = User::factory()->recruiter()->create();
        Recruiter::factory()->forUser($recruiterUser)->create();

        $response = $this->actingAs($recruiterUser)
            ->postJson("/api/v1/jobs/{$this->job->id}/apply", [
                'cv_type' => 'existing',
            ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function guest_cannot_apply_to_job(): void
    {
        $response = $this->postJson("/api/v1/jobs/{$this->job->id}/apply", [
            'cv_type' => 'existing',
        ]);

        $response->assertStatus(401);
    }
}
