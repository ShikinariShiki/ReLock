<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Models\Lowongan;
use Illuminate\Http\Request;

/**
 * Use Case: HapusLowongan
 * Handles deleting job listings
 */
class HapusLowonganController extends Controller
{
    /**
     * Delete a job listing
     */
    public function __invoke(Request $request, $id)
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

        $lowongan->delete();

        return response()->json([
            'message' => 'Job deleted successfully',
        ]);
    }
}
