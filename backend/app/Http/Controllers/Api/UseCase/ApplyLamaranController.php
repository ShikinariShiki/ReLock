<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\ApplyJobRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\Lamaran;
use App\Models\Lowongan;
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
    public function __invoke(ApplyJobRequest $request, $lowonganId)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Only candidates can apply for jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $lowongan = Lowongan::active()->findOrFail($lowonganId);

        // Check if already applied
        $existingApplication = Lamaran::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'You have already applied for this job',
                'error' => 'already_applied',
                'application' => new LamaranResource($existingApplication->load('jobListing')),
            ], 409);
        }

        $cvPath = $kandidat->cv_path;

        if ($request->cv_type === 'new' && $request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('applications', 'public');
        }

        if (!$cvPath) {
            return response()->json([
                'message' => 'Please upload a CV or add one to your profile first',
                'error' => 'cv_required',
            ], 400);
        }

        $lamaran = Lamaran::create([
            'candidate_id' => $kandidat->id,
            'job_listing_id' => $lowonganId,
            'cv_path' => $cvPath,
            'cv_type' => $request->cv_type,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => new LamaranResource($lamaran->load('jobListing.recruiter')),
        ], 201);
    }
}
