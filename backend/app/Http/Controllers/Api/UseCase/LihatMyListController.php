<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\LamaranResource;
use App\Http\Resources\LowonganResource;
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
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $bookmarks = $kandidat->bookmarks()
            ->with('jobListing.recruiter')
            ->orderBy('created_at', 'desc')
            ->get();

        $lowongans = $bookmarks->map(function ($bookmark) {
            return new LowonganResource($bookmark->jobListing);
        });

        return response()->json([
            'bookmarks' => $lowongans,
            'total' => $bookmarks->count(),
        ]);
    }

    /**
     * Get candidate's job applications
     */
    public function applications(Request $request)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $lamarans = $kandidat->applications()
            ->with(['jobListing.recruiter'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'applications' => LamaranResource::collection($lamarans),
            'total' => $lamarans->count(),
        ]);
    }
}
