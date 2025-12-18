<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LowonganResource;
use App\Models\Bookmark;
use App\Models\Lowongan;
use Illuminate\Http\Request;

class KontrollerBookmark extends Controller
{
    /**
     * Get all bookmarked jobs
     */
    public function index(Request $request)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $bookmarkedJobs = $kandidat->bookmarkedJobs()
            ->with('rekruter')
            ->orderBy('bookmarks.created_at', 'desc')
            ->paginate(10);

        return LowonganResource::collection($bookmarkedJobs);
    }

    /**
     * Toggle bookmark for a job
     */
    public function toggle(Request $request, $lowonganId)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Check if job exists
        $lowongan = Lowongan::findOrFail($lowonganId);

        $bookmark = Bookmark::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
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
                'candidate_id' => $kandidat->id,
                'job_listing_id' => $lowonganId,
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
    public function check(Request $request, $lowonganId)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'bookmarked' => false,
            ]);
        }

        $isBookmarked = Bookmark::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
            ->exists();

        return response()->json([
            'bookmarked' => $isBookmarked,
        ]);
    }
}
