<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\UpdateProfileRequest;
use App\Http\Requests\Candidate\UploadCvRequest;
use App\Http\Resources\CandidateResource;
use App\Http\Resources\JobApplicationResource;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    /**
     * List all candidates (admin use)
     */
    public function index()
    {
        $candidates = Candidate::with('user')->paginate(20);
        
        return CandidateResource::collection($candidates);
    }

    /**
     * Get current candidate's profile
     */
    public function show(Request $request)
    {
        $candidate = $request->user()->candidate;
        
        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        return new CandidateResource($candidate->load('user'));
    }

    /**
     * Update candidate profile
     */
    public function update(UpdateProfileRequest $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $candidate->update($request->validated());

        // Update user name if first/last name changed
        if ($request->has('first_name') || $request->has('last_name')) {
            $request->user()->update([
                'name' => ($request->first_name ?? $candidate->first_name) . ' ' . 
                         ($request->last_name ?? $candidate->last_name),
            ]);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'candidate' => new CandidateResource($candidate->fresh()->load('user')),
        ]);
    }

    /**
     * Upload CV
     */
    public function uploadCv(UploadCvRequest $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Delete old CV if exists
        if ($candidate->cv_path) {
            Storage::disk('public')->delete($candidate->cv_path);
        }

        $path = $request->file('cv')->store('cvs', 'public');
        $candidate->update(['cv_path' => $path]);

        return response()->json([
            'message' => 'CV uploaded successfully',
            'cv_path' => $path,
            'cv_url' => Storage::disk('public')->url($path),
        ]);
    }

    /**
     * Get candidate's job applications
     */
    public function myApplications(Request $request)
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
            ->paginate(10);

        return JobApplicationResource::collection($applications);
    }
}
