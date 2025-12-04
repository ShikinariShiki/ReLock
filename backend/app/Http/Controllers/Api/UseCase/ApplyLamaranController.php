<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplyJobRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\JobApplication;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Use Case: ApplyLamaran
 * Handles job application submission
 */
class ApplyLamaranController extends Controller
{
    /**
     * Apply for a job
     */
    public function __invoke(ApplyJobRequest $request, $jobId)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Only candidates can apply for jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $job = JobListing::active()->findOrFail($jobId);

        // Check if already applied
        $existingApplication = JobApplication::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied for this job',
                'error' => 'already_applied',
                'application' => new JobApplicationResource($existingApplication->load('jobListing')),
            ], 409);
        }

        $cvPath = $candidate->cv_path;

        if ($request->cv_type === 'new' && $request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('applications', 'public');
        }

        if (!$cvPath) {
            return response()->json([
                'message' => 'Please upload a CV or add one to your profile first',
                'error' => 'cv_required',
            ], 400);
        }

        $application = JobApplication::create([
            'candidate_id' => $candidate->id,
            'job_listing_id' => $jobId,
            'cv_path' => $cvPath,
            'cv_type' => $request->cv_type,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => new JobApplicationResource($application->load('jobListing.recruiter')),
        ], 201);
    }
}
