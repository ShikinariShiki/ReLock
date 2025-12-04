<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\UpdateStatusRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\JobApplication;
use Illuminate\Http\Request;

/**
 * Use Case: UbahStatusLamaran
 * Handles updating application status by recruiter
 */
class UbahStatusLamaranController extends Controller
{
    /**
     * Update application status
     */
    public function __invoke(UpdateStatusRequest $request, $id)
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
}
