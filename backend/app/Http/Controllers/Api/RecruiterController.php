<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Recruiter\UpdateProfileRequest;
use App\Http\Requests\Recruiter\UploadLogoRequest;
use App\Http\Resources\JobListingResource;
use App\Http\Resources\RecruiterResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecruiterController extends Controller
{
    /**
     * Get current recruiter's profile
     */
    public function show(Request $request)
    {
        $rekruter = $request->user()->recruiter;
        
        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        return new RekruterResource($rekruter->load('user'));
    }

    /**
     * Update recruiter profile
     */
    public function update(UpdateProfileRequest $request)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $rekruter->update($request->validated());

        // Update user name if first/last name changed
        if ($request->has('first_name') || $request->has('last_name')) {
            $request->user()->update([
                'name' => ($request->first_name ?? $rekruter->first_name) . ' ' . 
                         ($request->last_name ?? $rekruter->last_name),
            ]);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'rekruter' => new RekruterResource($rekruter->fresh()->load('user')),
        ]);
    }

    /**
     * Upload company logo
     */
    public function uploadLogo(UploadLogoRequest $request)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Delete old logo if exists
        if ($rekruter->company_logo) {
            Storage::disk('public')->delete($rekruter->company_logo);
        }

        $path = $request->file('logo')->store('logos', 'public');
        $rekruter->update(['company_logo' => $path]);

        return response()->json([
            'message' => 'Logo uploaded successfully',
            'logo_path' => $path,
            'logo_url' => Storage::disk('public')->url($path),
        ]);
    }

    /**
     * Get recruiter dashboard with stats
     */
    public function dashboard(Request $request)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $lowongans = $rekruter->jobListings()
            ->withCount('applications')
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'total_jobs' => $lowongans->count(),
            'active_jobs' => $lowongans->where('status', 'active')->count(),
            'closed_jobs' => $lowongans->where('status', 'closed')->count(),
            'draft_jobs' => $lowongans->where('status', 'draft')->count(),
            'total_applications' => $lowongans->sum('applications_count'),
            'recent_applications' => $rekruter->jobListings()
                ->with(['applications' => function($q) {
                    $q->where('created_at', '>=', now()->subDays(7));
                }])
                ->get()
                ->flatMap->applications
                ->count(),
        ];

        return response()->json([
            'jobs' => LowonganResource::collection($lowongans),
            'stats' => $stats,
        ]);
    }
}
