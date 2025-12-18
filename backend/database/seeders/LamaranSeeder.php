<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kandidat;
use App\Models\Lowongan;
use App\Models\Lamaran;

class LamaranSeeder extends Seeder
{
    public function run(): void
    {
        $kandidats = Kandidat::all();
        $lowongans = Lowongan::all();

        if ($kandidats->isEmpty() || $lowongans->isEmpty()) {
            $this->command->warn('No candidates or jobs found. Please run CandidateSeeder and JobListingSeeder first.');
            return;
        }

        $lamarans = [
            // John Doe applies to multiple jobs
            [
                'candidate_id' => $kandidats[0]->id ?? 1,
                'job_listing_id' => $lowongans[0]->id ?? 1, // Senior Full Stack Developer
                'cv_path' => 'cvs/sample_cv_1.pdf',
                'cv_type' => 'existing',
                'status' => 'shortlisted',
                'notes' => 'Strong technical background. Schedule for technical interview.',
            ],
            [
                'candidate_id' => $kandidats[0]->id ?? 1,
                'job_listing_id' => $lowongans[2]->id ?? 3, // Frontend Developer
                'cv_path' => 'cvs/sample_cv_1.pdf',
                'cv_type' => 'existing',
                'status' => 'reviewed',
                'notes' => 'Good experience but overqualified for this position.',
            ],

            // Sarah Wilson applies
            [
                'candidate_id' => $kandidats[1]->id ?? 2,
                'job_listing_id' => $lowongans[3]->id ?? 4, // UI/UX Designer
                'cv_path' => 'cvs/sample_cv_2.pdf',
                'cv_type' => 'existing',
                'status' => 'accepted',
                'notes' => 'Excellent portfolio. Offer extended.',
            ],

            // Michael Chen applies
            [
                'candidate_id' => $kandidats[2]->id ?? 3,
                'job_listing_id' => $lowongans[4]->id ?? 5, // Data Analyst
                'cv_path' => 'cvs/sample_cv_3.pdf',
                'cv_type' => 'existing',
                'status' => 'pending',
                'notes' => null,
            ],
            [
                'candidate_id' => $kandidats[2]->id ?? 3,
                'job_listing_id' => $lowongans[5]->id ?? 6, // Backend Engineer
                'cv_path' => 'cvs/sample_cv_3.pdf',
                'cv_type' => 'new',
                'status' => 'reviewed',
                'notes' => 'Strong data background but limited backend experience.',
            ],
        ];

        foreach ($lamarans as $lamaran) {
            // Check if job and candidate exist
            if (Lowongan::find($lamaran['job_listing_id']) && Kandidat::find($lamaran['candidate_id'])) {
                Lamaran::create($lamaran);
            }
        }
    }
}
