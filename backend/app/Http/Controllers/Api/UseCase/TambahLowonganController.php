<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\StoreJobRequest;
use App\Http\Resources\JobListingResource;
use Illuminate\Http\Request;

/**
 * Use Case: TambahLowongan
 * Handles creating new job listings
 */
class TambahLowonganController extends Controller
{
    /**
     * Create a new job listing
     */
    public function __invoke(StoreJobRequest $request)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Recruiter profile not found',
                'error' => 'not_found',
            ], 404);
        }

        // Convert arrays to JSON if needed
        $responsibilities = $request->responsibilities;
        $requirements = $request->requirements;
        $benefits = $request->benefits;

        // If arrays, convert to JSON string for storage
        if (is_array($responsibilities)) {
            $responsibilities = json_encode($responsibilities);
        }
        if (is_array($requirements)) {
            $requirements = json_encode($requirements);
        }
        if (is_array($benefits)) {
            $benefits = json_encode($benefits);
        }

        $lowongan = $rekruter->jobListings()->create([
            'title' => $request->title,
            'company_name' => $request->company_name ?? $rekruter->company_name,
            'location' => $request->location,
            'department' => $request->department ?? 'General',
            'type' => $request->type,
            'mode' => $request->mode,
            'level' => $request->level ?? 'Entry Level',
            'deadline' => $request->deadline,
            'duration' => $request->duration ?? 'Permanent',
            'salary_min' => $request->salary_min,
            'salary_max' => $request->salary_max,
            'contact_name' => $request->contact_name,
            'contact_email' => $request->contact_email,
            'contact_phone' => $request->contact_phone ?? '',
            'description' => $request->description,
            'responsibilities' => $responsibilities ?? '[]',
            'requirements' => $requirements ?? '[]',
            'benefits' => $benefits,
            'status' => $request->status ?? 'active',
        ]);

        return response()->json([
            'message' => 'Job listing created successfully',
            'job' => new LowonganResource($lowongan->load('rekruter')),
        ], 201);
    }
}
