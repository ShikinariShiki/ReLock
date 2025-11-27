<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;
use App\Models\JobListing;
use App\Models\JobApplication;

class JobApplicationSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = Candidate::all();
        $jobs = JobListing::all();

        if ($candidates->isEmpty() || $jobs->isEmpty()) {
            $this->command->warn('No candidates or jobs found. Please run CandidateSeeder and JobListingSeeder first.');
            return;
        }

        $applications = [
            // John Doe applies to multiple jobs
            [
                'candidate_id' => $candidates[0]->id ?? 1,
                'job_listing_id' => $jobs[0]->id ?? 1, // Senior Full Stack Developer
                'cv_path' => 'cvs/sample_cv_1.pdf',
                'cv_type' => 'existing',
                'status' => 'shortlisted',
                'notes' => 'Strong technical background. Schedule for technical interview.',
            ],
            [
                'candidate_id' => $candidates[0]->id ?? 1,
                'job_listing_id' => $jobs[2]->id ?? 3, // Frontend Developer
                'cv_path' => 'cvs/sample_cv_1.pdf',
                'cv_type' => 'existing',
                'status' => 'reviewed',
                'notes' => 'Good experience but overqualified for this position.',
            ],

            // Sarah Wilson applies
            [
                'candidate_id' => $candidates[1]->id ?? 2,
                'job_listing_id' => $jobs[3]->id ?? 4, // UI/UX Designer
                'cv_path' => 'cvs/sample_cv_2.pdf',
                'cv_type' => 'existing',
                'status' => 'accepted',
                'notes' => 'Excellent portfolio. Offer extended.',
            ],

            // Michael Chen applies
            [
                'candidate_id' => $candidates[2]->id ?? 3,
                'job_listing_id' => $jobs[4]->id ?? 5, // Data Analyst
                'cv_path' => 'cvs/sample_cv_3.pdf',
                'cv_type' => 'existing',
                'status' => 'pending',
                'notes' => null,
            ],
            [
                'candidate_id' => $candidates[2]->id ?? 3,
                'job_listing_id' => $jobs[5]->id ?? 6, // Backend Engineer
                'cv_path' => 'cvs/sample_cv_3.pdf',
                'cv_type' => 'new',
                'status' => 'reviewed',
                'notes' => 'Strong data background but limited backend experience.',
            ],
        ];

        foreach ($applications as $application) {
            // Check if job and candidate exist
            if (JobListing::find($application['job_listing_id']) && Candidate::find($application['candidate_id'])) {
                JobApplication::create($application);
            }
        }
    }
}
