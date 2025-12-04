<?php

namespace Tests\Feature\Validation;

use App\Models\Candidate;
use App\Models\JobListing;
use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookmarkValidationTest extends TestCase
{
    use RefreshDatabase;

    protected User $candidateUser;
    protected Candidate $candidate;
    protected JobListing $job;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create candidate for testing
        $this->candidateUser = User::factory()->candidate()->create();
        $this->candidate = Candidate::factory()->forUser($this->candidateUser)->create();
        
        // Create job for testing
        $recruiterUser = User::factory()->recruiter()->create();
        $recruiter = Recruiter::factory()->forUser($recruiterUser)->create();
        $this->job = JobListing::factory()->create(['recruiter_id' => $recruiter->id]);
    }

    // ==========================================
    // BOOKMARK TESTS
    // ==========================================

    /** @test */
    public function candidate_can_bookmark_job(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        $response->assertStatus(201)
            ->assertJson(['is_bookmarked' => true]);
    }

    /** @test */
    public function candidate_can_unbookmark_job(): void
    {
        // First bookmark
        $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        // Then unbookmark
        $response = $this->actingAs($this->candidateUser)
            ->deleteJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        $response->assertStatus(200)
            ->assertJson(['is_bookmarked' => false]);
    }

    /** @test */
    public function candidate_can_check_bookmark_status(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->getJson("/api/v1/candidate/bookmarks/{$this->job->id}/check");

        $response->assertStatus(200)
            ->assertJson(['is_bookmarked' => false]);

        // Bookmark it
        $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        // Check again
        $response = $this->actingAs($this->candidateUser)
            ->getJson("/api/v1/candidate/bookmarks/{$this->job->id}/check");

        $response->assertStatus(200)
            ->assertJson(['is_bookmarked' => true]);
    }

    /** @test */
    public function candidate_can_get_all_bookmarks(): void
    {
        // Bookmark the job
        $this->actingAs($this->candidateUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        // Get bookmarks
        $response = $this->actingAs($this->candidateUser)
            ->getJson('/api/v1/candidate/bookmarks');

        $response->assertStatus(200)
            ->assertJsonStructure(['bookmarks', 'total']);
    }

    /** @test */
    public function bookmarking_nonexistent_job_returns_404(): void
    {
        $response = $this->actingAs($this->candidateUser)
            ->postJson('/api/v1/candidate/bookmarks/99999');

        $response->assertStatus(404);
    }

    // ==========================================
    // AUTHORIZATION TESTS
    // ==========================================

    /** @test */
    public function guest_cannot_bookmark_job(): void
    {
        $response = $this->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");
        $response->assertStatus(401);
    }

    /** @test */
    public function recruiter_cannot_bookmark_job(): void
    {
        $recruiterUser = User::factory()->recruiter()->create();
        Recruiter::factory()->forUser($recruiterUser)->create();

        $response = $this->actingAs($recruiterUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        $response->assertStatus(403);
    }
}
