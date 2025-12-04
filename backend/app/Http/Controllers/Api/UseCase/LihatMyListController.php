<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobApplicationResource;
use App\Http\Resources\JobListingResource;
use Illuminate\Http\Request;

/**
 * Use Case: LihatMyList
 * Handles viewing candidate's bookmarks and applications list
 */
class LihatMyListController extends Controller
{
    /**
     * Get candidate's bookmarked jobs
     */
    public function bookmarks(Request $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $bookmarks = $candidate->bookmarks()
            ->with('jobListing.recruiter')
            ->orderBy('created_at', 'desc')
            ->get();

        $jobs = $bookmarks->map(function ($bookmark) {
            return new JobListingResource($bookmark->jobListing);
        });

        return response()->json([
            'bookmarks' => $jobs,
            'total' => $bookmarks->count(),
        ]);
    }

    /**
     * Get candidate's job applications
     */
    public function applications(Request $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $applications = $candidate->applications()
            ->with(['jobListing.recruiter'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'applications' => JobApplicationResource::collection($applications),
            'total' => $applications->count(),
        ]);
    }
}
