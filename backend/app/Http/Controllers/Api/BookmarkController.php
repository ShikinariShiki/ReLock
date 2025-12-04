<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobListingResource;
use App\Models\Bookmark;
use App\Models\JobListing;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /**
     * Get all bookmarked jobs
     */
    public function index(Request $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $bookmarkedJobs = $candidate->bookmarkedJobs()
            ->with('recruiter')
            ->orderBy('bookmarks.created_at', 'desc')
            ->paginate(10);

        return JobListingResource::collection($bookmarkedJobs);
    }

    /**
     * Toggle bookmark for a job
     */
    public function toggle(Request $request, $jobId)
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

        $bookmark = Bookmark::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->first();

        if ($bookmark) {
            // Remove bookmark
            $bookmark->delete();
            return response()->json([
                'message' => 'Bookmark removed',
                'bookmarked' => false,
            ]);
        } else {
            // Add bookmark
            Bookmark::create([
                'candidate_id' => $candidate->id,
                'job_listing_id' => $jobId,
            ]);
            return response()->json([
                'message' => 'Job bookmarked successfully',
                'bookmarked' => true,
            ]);
        }
    }

    /**
     * Check if a job is bookmarked
     */
    public function check(Request $request, $jobId)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'bookmarked' => false,
            ]);
        }

        $isBookmarked = Bookmark::where('candidate_id', $candidate->id)
            ->where('job_listing_id', $jobId)
            ->exists();

        return response()->json([
            'bookmarked' => $isBookmarked,
        ]);
    }
}
