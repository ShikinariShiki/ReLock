<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\UpdateProfileRequest;
use App\Http\Requests\Candidate\UploadCvRequest;
use App\Http\Resources\KandidatResource;
use App\Http\Resources\LamaranResource;
use App\Models\Kandidat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    /**
     * List all candidates (admin use)
     */
    public function index()
    {
        $kandidats = Kandidat::with('user')->paginate(20);
        
        return KandidatResource::collection($kandidats);
    }

    /**
     * Get current candidate's profile
     */
    public function show(Request $request)
    {
        $kandidat = $request->user()->candidate;
        
        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        return new KandidatResource($kandidat->load('user'));
    }

    /**
     * Update candidate profile
     */
    public function update(UpdateProfileRequest $request)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        $kandidat->update($request->validated());

        // Update user name if first/last name changed
        if ($request->has('first_name') || $request->has('last_name')) {
            $request->user()->update([
                'name' => ($request->first_name ?? $kandidat->first_name) . ' ' . 
                         ($request->last_name ?? $kandidat->last_name),
            ]);
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'kandidat' => new KandidatResource($kandidat->fresh()->load('user')),
        ]);
    }

    /**
     * Upload CV
     */
    public function uploadCv(UploadCvRequest $request)
    {
        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Delete old CV if exists
        if ($kandidat->cv_path) {
            Storage::disk('public')->delete($kandidat->cv_path);
        }

        $path = $request->file('cv')->store('cvs', 'public');
        $kandidat->update(['cv_path' => $path]);

        return response()->json([
            'message' => 'CV uploaded successfully',
            'cv_path' => $path,
            'cv_url' => Storage::disk('public')->url($path),
        ]);
    }

    /**
     * Upload profile photo
     */
    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        $kandidat = $request->user()->candidate;

        if (!$kandidat) {
            return response()->json([
                'message' => 'Candidate profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Delete old photo if exists
        if ($kandidat->profile_photo) {
            Storage::disk('public')->delete($kandidat->profile_photo);
        }

        $path = $request->file('photo')->store('photos', 'public');
        $kandidat->update(['profile_photo' => $path]);

        return response()->json([
            'message' => 'Photo uploaded successfully',
            'photo_path' => $path,
            'photo_url' => Storage::disk('public')->url($path),
        ]);
    }

    /**
     * Get candidate's job applications
     */
    public function myApplications(Request $request)
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
            ->paginate(10);

        return LamaranResource::collection($lamarans);
    }
}
