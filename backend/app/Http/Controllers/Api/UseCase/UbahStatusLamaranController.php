<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Application\UpdateStatusRequest;
use App\Http\Resources\JobApplicationResource;
use App\Models\Lamaran;
use Illuminate\Http\Request;

/**
 * Use Case: UbahStatusLamaran
 * Handles updating application status by recruiter
 */
class UbahStatusLamaranController extends Controller
{
    /**
     * Update application status
     */
    public function __invoke(UpdateStatusRequest $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can update application status',
                'error' => 'forbidden',
            ], 403);
        }

        $lamaran = Lamaran::with('jobListing')
            ->whereHas('jobListing', function ($q) use ($rekruter) {
                $q->where('recruiter_id', $rekruter->id);
            })
            ->findOrFail($id);

        $lamaran->update($request->validated());

        return response()->json([
            'message' => 'Application status updated successfully',
            'application' => new LamaranResource(
                $lamaran->fresh()->load(['candidate.user', 'jobListing'])
            ),
        ]);
    }
}
