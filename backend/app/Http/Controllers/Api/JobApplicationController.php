<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplyJobRequest;
use App\Http\Requests\Application\UpdateStatusRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\JobApplication;
use App\Models\JobListing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JobApplicationController extends Controller
{
    /**
     * Apply for a job (candidate only)
     */
    public function apply(ApplyJobRequest $request, $jobId)
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

    /**
     * Update application status (recruiter only)
     */
    public function updateStatus(UpdateStatusRequest $request, $id)
    {
        $recruiter = $request->user()->recruiter;

        if (!$recruiter) {
            return response()->json([
                'message' => 'Only recruiters can update application status',
                'error' => 'forbidden',
            ], 403);
        }

        $application = JobApplication::with('jobListing')
            ->whereHas('jobListing', function ($q) use ($recruiter) {
                $q->where('recruiter_id', $recruiter->id);
            })
            ->findOrFail($id);

        $application->update($request->validated());

        return response()->json([
            'message' => 'Application status updated successfully',
            'application' => new JobApplicationResource(
                $application->fresh()->load(['candidate.user', 'jobListing'])
            ),
        ]);
    }

    /**
     * View application details
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $query = JobApplication::with(['candidate.user', 'jobListing.recruiter']);

        if ($user->isCandidate()) {
            $query->where('candidate_id', $user->candidate->id);
        } elseif ($user->isRecruiter()) {
            $query->whereHas('jobListing', function ($q) use ($user) {
                $q->where('recruiter_id', $user->recruiter->id);
            });
        }

        $application = $query->findOrFail($id);

        return response()->json([
            'application' => new JobApplicationResource($application),
        ]);
    }

    /**
     * Withdraw application (candidate only)
     */
    public function withdraw(Request $request, $id)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Only candidates can withdraw applications',
                'error' => 'forbidden',
            ], 403);
        }

        $application = JobApplication::where('id', $id)
            ->where('candidate_id', $candidate->id)
            ->firstOrFail();

        // Only allow withdrawal if status is pending or reviewed
        if (!in_array($application->status, ['pending', 'reviewed'])) {
            return response()->json([
                'message' => 'Cannot withdraw application at this stage',
                'error' => 'not_allowed',
            ], 400);
        }

        $application->delete();

        return response()->json([
            'message' => 'Application withdrawn successfully',
        ]);
    }
}
