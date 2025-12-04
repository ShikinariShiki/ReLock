<?php

namespace Tests\Feature\Validation;

use App\Models\Candidate;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfileValidationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
    }

    // ==========================================
    // CANDIDATE PROFILE VALIDATION TESTS
    // ==========================================

    /** @test */
    public function candidate_can_update_profile_with_valid_data(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->putJson('/api/v1/candidate/profile', [
                'first_name' => 'Updated',
                'last_name' => 'Name',
                'phone' => '08123456789',
                'location' => 'Jakarta, Indonesia',
                'about' => 'I am a software developer.',
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function candidate_profile_linkedin_must_be_valid_url(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->putJson('/api/v1/candidate/profile', [
                'linkedin' => 'not-a-valid-url',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['linkedin']);
    }

    /** @test */
    public function candidate_can_upload_cv(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/candidate/upload-cv', [
                'cv' => UploadedFile::fake()->create('my-cv.pdf', 500),
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function candidate_cv_must_be_pdf(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/candidate/upload-cv', [
                'cv' => UploadedFile::fake()->create('document.docx', 500),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv']);
    }

    /** @test */
    public function candidate_cv_max_size_is_10mb(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/candidate/upload-cv', [
                'cv' => UploadedFile::fake()->create('large-cv.pdf', 11000),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['cv']);
    }

    /** @test */
    public function candidate_can_upload_photo(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/candidate/upload-photo', [
                'photo' => UploadedFile::fake()->image('profile.jpg', 400, 400),
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function candidate_photo_must_be_image(): void
    {
        $user = User::factory()->candidate()->create();
        $candidate = Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/candidate/upload-photo', [
                'photo' => UploadedFile::fake()->create('document.pdf', 500),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['photo']);
    }

    // ==========================================
    // RECRUITER PROFILE VALIDATION TESTS
    // ==========================================

    /** @test */
    public function recruiter_can_update_profile_with_valid_data(): void
    {
        $user = User::factory()->recruiter()->create();
        $recruiter = Recruiter::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->putJson('/api/v1/recruiter/profile', [
                'company_name' => 'Updated Company Name',
                'company_description' => 'We are a tech company.',
                'industry' => 'Technology',
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function recruiter_can_upload_logo(): void
    {
        $user = User::factory()->recruiter()->create();
        $recruiter = Recruiter::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/recruiter/upload-logo', [
                'logo' => UploadedFile::fake()->image('logo.png', 400, 400),
            ]);

        $response->assertStatus(200)
            ->assertJsonMissingValidationErrors();
    }

    /** @test */
    public function recruiter_logo_must_be_image(): void
    {
        $user = User::factory()->recruiter()->create();
        $recruiter = Recruiter::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->postJson('/api/v1/recruiter/upload-logo', [
                'logo' => UploadedFile::fake()->create('document.pdf', 500),
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['logo']);
    }

    // ==========================================
    // AUTHORIZATION TESTS
    // ==========================================

    /** @test */
    public function guest_cannot_access_candidate_profile(): void
    {
        $response = $this->getJson('/api/v1/candidate/profile');
        $response->assertStatus(401);
    }

    /** @test */
    public function guest_cannot_access_recruiter_profile(): void
    {
        $response = $this->getJson('/api/v1/recruiter/profile');
        $response->assertStatus(401);
    }

    /** @test */
    public function recruiter_cannot_access_candidate_profile(): void
    {
        $user = User::factory()->recruiter()->create();
        Recruiter::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->getJson('/api/v1/candidate/profile');

        $response->assertStatus(403);
    }

    /** @test */
    public function candidate_cannot_access_recruiter_profile(): void
    {
        $user = User::factory()->candidate()->create();
        Candidate::factory()->forUser($user)->create();

        $response = $this->actingAs($user)
            ->getJson('/api/v1/recruiter/profile');

        $response->assertStatus(403);
    }
}
