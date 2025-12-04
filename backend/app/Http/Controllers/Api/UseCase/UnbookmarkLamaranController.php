<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\JobListing;
use Illuminate\Http\Request;

/**
 * Use Case: UnbookmarkLamaran
 * Handles removing job from bookmarks
 */
class UnbookmarkLamaranController extends Controller
{
    /**
     * Remove job from bookmarks
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
        JobListing::findOrFail($jobId);

        // Find and delete bookmark
        $bookmark = Bookmark::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->first();

        if (!$bookmark) {
            return response()->json([
                'message' => 'Bookmark not found',
                'is_bookmarked' => false,
            ]);
        }

        $bookmark->delete();

        return response()->json([
            'message' => 'Bookmark removed successfully',
            'is_bookmarked' => false,
        ]);
    }
}
