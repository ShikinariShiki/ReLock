<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobListingResource;
use App\Models\Bookmark;
use App\Models\Lowongan;
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
    public function __invoke(Request $request, $lowonganId)
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

        // Check if already bookmarked
        $existingBookmark = Bookmark::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
            ->first();

        if ($existingBookmark) {
            return response()->json([
                'message' => 'Job already bookmarked',
                'is_bookmarked' => true,
                'job' => new LowonganResource($lowongan),
            ]);
        }

        // Create bookmark
        Bookmark::create([
            'candidate_id' => $kandidat->id,
            'job_listing_id' => $lowonganId,
        ]);

        return response()->json([
            'message' => 'Job bookmarked successfully',
            'is_bookmarked' => true,
            'job' => new LowonganResource($lowongan),
        ], 201);
    }

    /**
     * Check if job is bookmarked
     */
    public function check(Request $request, $lowonganId)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'is_bookmarked' => false,
            ]);
        }

        $isBookmarked = Bookmark::where('candidate_id', $kandidat->id)
            ->where('job_listing_id', $lowonganId)
            ->exists();

        return response()->json([
            'is_bookmarked' => $isBookmarked,
        ]);
    }
}
