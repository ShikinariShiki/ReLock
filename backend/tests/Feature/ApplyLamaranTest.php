<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Akun;
use App\Models\Kandidat;
use App\Models\Rekruter;
use App\Models\Lowongan;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApplyLamaranTest extends TestCase
{
    use RefreshDatabase; // Reset database setiap kali satu test function selesai

    /**
     * TC-01: Menguji Jalur User Bukan Kandidat
     * Node: 1 -> 2
     */
    public function test_non_candidate_cannot_apply()
    {
        // 1. Arrange (Siapkan Data)
        // User recruiter (bukan kandidat)
        $akun = Akun::factory()->recruiter()->create();
        Rekruter::factory()->create(['user_id' => $akun->id]);
        $lowongan = Lowongan::factory()->create();

        // 2. Act (Eksekusi Fungsi)
        $response = $this->actingAs($akun)
                         ->postJson("/api/v1/jobs/{$lowongan->id}/apply", [
                             'cv_type' => 'existing'
                         ]);

        // 3. Assert (Cek Hasil)
        $response->assertStatus(403);
    }

    /**
     * TC-02: Menguji Jalur Gagal (Tidak Punya CV & Tidak Upload)
     * Node: 1 -> 3 -> 4 -> 6 -> 7
     */
    public function test_candidate_without_cv_fails()
    {
        // 1. Arrange
        $akun = Akun::factory()->candidate()->create();
        $kandidat = Kandidat::factory()->create([
            'user_id' => $akun->id,
            'cv_path' => null // Kondisi: Profil kosong
        ]);
        $lowongan = Lowongan::factory()->create();

        // 2. Act
        $response = $this->actingAs($akun)
                         ->postJson("/api/v1/jobs/{$lowongan->id}/apply", [
                             'cv_type' => 'existing' // Minta pakai yang existing tapi tidak punya
                         ]);

        // 3. Assert
        $response->assertStatus(400)
                 ->assertJson(['error' => 'cv_required']);
    }

    /**
     * TC-03: Menguji Jalur Sukses (Menggunakan CV Lama)
     * Node: 1 -> 3 -> 4 -> 6 -> 8
     */
    public function test_apply_using_existing_cv_profile()
    {
        // 1. Arrange
        $akun = Akun::factory()->candidate()->create();
        $kandidat = Kandidat::factory()->create([
            'user_id' => $akun->id,
            'cv_path' => 'resumes/old_cv.pdf' // Kondisi: Punya file lama
        ]);
        $lowongan = Lowongan::factory()->create();

        // 2. Act
        $response = $this->actingAs($akun)
                         ->postJson("/api/v1/jobs/{$lowongan->id}/apply", [
                             'cv_type' => 'existing' // Logic flow: Skip upload block
                         ]);

        // 3. Assert
        $response->assertStatus(201);
        
        // Cek side effect ke database
        $this->assertDatabaseHas('job_applications', [
            'candidate_id' => $kandidat->id,
            'cv_path' => 'resumes/old_cv.pdf' // Path tidak berubah
        ]);
    }

    /**
     * TC-04: Menguji Jalur Sukses (Upload CV Baru)
     * Node: 1 -> 3 -> 4 -> 5 -> 6 -> 8
     */
    public function test_apply_with_new_cv_upload()
    {
        // 1. Arrange
        Storage::fake('public'); // Mocking File System (Isolasi Unit)
        
        $akun = Akun::factory()->candidate()->create();
        $kandidat = Kandidat::factory()->create([
            'user_id' => $akun->id,
            'cv_path' => null 
        ]);
        $lowongan = Lowongan::factory()->create();
        
        $file = UploadedFile::fake()->create('my_cv.pdf', 1024, 'application/pdf'); // Dummy File

        // 2. Act
        $response = $this->actingAs($akun)
                         ->postJson("/api/v1/jobs/{$lowongan->id}/apply", [
                             'cv_type' => 'new',
                             'cv' => $file // Logic flow: Masuk blok upload
                         ]);

        // 3. Assert
        $response->assertStatus(201);
        
        // Verifikasi file tersimpan (Logic Node 5 Berhasil)
        Storage::disk('public')->assertExists('applications/' . $file->hashName());
        
        // Verifikasi DB menyimpan path baru
        $this->assertDatabaseHas('job_applications', [
            'candidate_id' => $kandidat->id,
        ]);
    }
}
