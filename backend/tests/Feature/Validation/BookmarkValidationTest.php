<?php

namespace Tests\Feature\Validation;

use App\Models\Kandidat;
use App\Models\Lowongan;
use App\Models\Rekruter;
use App\Models\Akun;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookmarkValidationTest extends TestCase
{
    use RefreshDatabase;

    protected Akun $kandidatUser;
    protected Kandidat $kandidat;
    protected Lowongan $lowongan;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create candidate for testing
        $this->candidateUser = Akun::factory()->candidate()->create();
        $this->candidate = Kandidat::factory()->forUser($this->candidateUser)->create();
        
        // Create job for testing
        $rekruterUser = Akun::factory()->recruiter()->create();
        $rekruter = Rekruter::factory()->forUser($rekruterUser)->create();
        $this->job = Lowongan::factory()->create(['recruiter_id' => $rekruter->id]);
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
        $rekruterUser = Akun::factory()->recruiter()->create();
        Rekruter::factory()->forUser($rekruterUser)->create();

        $response = $this->actingAs($rekruterUser)
            ->postJson("/api/v1/candidate/bookmarks/{$this->job->id}");

        $response->assertStatus(403);
    }
}
