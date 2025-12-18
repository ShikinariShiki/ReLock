<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\UpdateJobRequest;
use App\Http\Resources\JobListingResource;
use App\Models\Lowongan;
use Illuminate\Http\Request;

/**
 * Use Case: EditLowongan
 * Handles updating job listings
 */
class EditLowonganController extends Controller
{
    /**
     * Update a job listing
     */
    public function __invoke(UpdateJobRequest $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $lowongan = Lowongan::where('id', $id)
            ->where('recruiter_id', $rekruter->id)
            ->first();

        if (!$lowongan) {
            return response()->json([
                'message' => 'Job listing not found or unauthorized',
                'error' => 'not_found',
            ], 404);
        }

        $lowongan->update($request->validated());

        return response()->json([
            'message' => 'Job listing updated successfully',
            'job' => new LowonganResource($lowongan->fresh()->load('rekruter')),
        ]);
    }
}
