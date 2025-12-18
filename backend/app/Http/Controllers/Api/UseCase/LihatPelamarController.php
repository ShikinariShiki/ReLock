<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobApplicationResource;
use App\Http\Resources\JobListingResource;
use App\Models\Lowongan;
use Illuminate\Http\Request;

/**
 * Use Case: LihatPelamar
 * Handles viewing applicants for a job listing
 */
class LihatPelamarController extends Controller
{
    /**
     * Get applicants for a job listing
     */
    public function __invoke(Request $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can view applicants',
                'error' => 'forbidden',
            ], 403);
        }

        $lowongan = Lowongan::where('id', $id)
            ->where('recruiter_id', $rekruter->id)
            ->firstOrFail();

        $applicants = $lowongan->applications()
            ->with(['candidate.user'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json([
            'job' => new LowonganResource($lowongan),
            'applicants' => LamaranResource::collection($applicants),
            'meta' => [
                'total' => $applicants->total(),
                'per_page' => $applicants->perPage(),
                'current_page' => $applicants->currentPage(),
                'last_page' => $applicants->lastPage(),
            ],
        ]);
    }
}
