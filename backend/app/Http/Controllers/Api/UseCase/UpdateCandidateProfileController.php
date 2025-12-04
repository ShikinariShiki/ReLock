<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\UpdateProfileRequest;
use App\Http\Requests\Candidate\UploadCvRequest;
use App\Http\Requests\Candidate\UploadPhotoRequest;
use App\Http\Resources\CandidateResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Use Case: UpdateCandidateProfile
 * Handles candidate profile viewing and updating
 */
class UpdateCandidateProfileController extends Controller
{
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
        $candidate->update([
            'cv_path' => $path,
            'cv_filename' => $request->file('cv')->getClientOriginalName(),
        ]);

        return response()->json([
            'message' => 'CV uploaded successfully',
            'cv_path' => $path,
            'cv_url' => Storage::disk('public')->url($path),
            'cv_filename' => $request->file('cv')->getClientOriginalName(),
        ]);
    }

    /**
     * Upload profile photo
     */
    public function uploadPhoto(UploadPhotoRequest $request)
    {
        $candidate = $request->user()->candidate;

        if (!$candidate) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Delete old photo if exists
        if ($candidate->profile_photo) {
            Storage::disk('public')->delete($candidate->profile_photo);
        }

        $path = $request->file('photo')->store('photos', 'public');
        $candidate->update(['profile_photo' => $path]);

        return response()->json([
            'message' => 'Photo uploaded successfully',
            'photo_path' => $path,
            'photo_url' => Storage::disk('public')->url($path),
        ]);
    }
}
