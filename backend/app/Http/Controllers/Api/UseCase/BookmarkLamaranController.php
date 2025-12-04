<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobListingResource;
use App\Models\Bookmark;
use App\Models\JobListing;
use Illuminate\Http\Request;

/**
 * Use Case: BookmarkLamaran
 * Handles adding job to bookmarks
 */
class BookmarkLamaranController extends Controller
{
    /**
     * Add job to bookmarks
     */
    public function __invoke(Request $request, $jobId)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Check if job exists
        $job = JobListing::findOrFail($jobId);

        // Check if already bookmarked
        $existingBookmark = Bookmark::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->first();

        if ($existingBookmark) {
            return response()->json([
                'message' => 'Job already bookmarked',
                'is_bookmarked' => true,
                'job' => new JobListingResource($job),
            ]);
        }

        // Create bookmark
        Bookmark::create([
            'candidate_id' => $candidate->id,
            'job_listing_id' => $jobId,
        ]);

        return response()->json([
            'message' => 'Job bookmarked successfully',
            'is_bookmarked' => true,
            'job' => new JobListingResource($job),
        ], 201);
    }

    /**
     * Check if job is bookmarked
     */
    public function check(Request $request, $jobId)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'is_bookmarked' => false,
            ]);
        }

        $isBookmarked = Bookmark::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->exists();

        return response()->json([
            'is_bookmarked' => $isBookmarked,
        ]);
    }
}
