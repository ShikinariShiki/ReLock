<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobListingResource;
use App\Models\Lowongan;
use Illuminate\Http\Request;

/**
 * Use Case: TampilDetailLowongan
 * Handles displaying job listing details
 */
class TampilDetailLowonganController extends Controller
{
    /**
     * Get job listing details
     */
    public function __invoke(Request $request, $id)
    {
        $lowongan = Lowongan::with('recruiter.user')->findOrFail($id);

        return response()->json([
            'job' => new LowonganResource($lowongan),
        ]);
    }
}
