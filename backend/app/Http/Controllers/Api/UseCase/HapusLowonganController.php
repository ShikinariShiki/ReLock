<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Models\JobListing;
use Illuminate\Http\Request;

/**
 * Use Case: HapusLowongan
 * Handles deleting job listings
 */
class HapusLowonganController extends Controller
{
    /**
     * Delete a job listing
     */
    public function __invoke(Request $request, $id)
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

        $job->delete();

        return response()->json([
            'message' => 'Job deleted successfully',
        ]);
    }
}
