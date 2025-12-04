<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\UpdateJobRequest;
use App\Http\Resources\JobListingResource;
use App\Models\JobListing;
use Illuminate\Http\Request;

/**
 * Use Case: EditLowongan
 * Handles updating job listings
 */
class EditLowonganController extends Controller
{
    /**
     * Update a job listing
     */
    public function __invoke(UpdateJobRequest $request, $id)
    {
        $recruiter = $request->user()->recruiter;

        if (!$recruiter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $job = JobListing::where('id', $id)
            ->where('recruiter_id', $recruiter->id)
            ->first();

        if (!$job) {
            return response()->json([
                'message' => 'Job listing not found or unauthorized',
                'error' => 'not_found',
            ], 404);
        }

        $job->update($request->validated());

        return response()->json([
            'message' => 'Job listing updated successfully',
            'job' => new JobListingResource($job->fresh()->load('recruiter')),
        ]);
    }
}
