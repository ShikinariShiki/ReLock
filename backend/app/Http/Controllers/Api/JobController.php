<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\StoreJobRequest;
use App\Http\Requests\Job\UpdateJobRequest;
use App\Http\Resources\LamaranResource;
use App\Http\Resources\LowonganCollection;
use App\Http\Resources\LowonganResource;
use App\Models\Lowongan;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * List all active jobs (public)
     */
    public function index(Request $request)
    {
        $query = Lowongan::with('rekruter')->active();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by type
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // Filter by mode
        if ($request->has('mode') && $request->mode) {
            $query->where('mode', $request->mode);
        }

        // Filter by level
        if ($request->has('level') && $request->level) {
            $query->where('level', $request->level);
        }

        // Filter by location
        if ($request->has('location') && $request->location) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        // Filter by salary range
        if ($request->has('salary_min') && $request->salary_min) {
            $query->where('salary_max', '>=', $request->salary_min);
        }
        if ($request->has('salary_max') && $request->salary_max) {
            $query->where('salary_min', '<=', $request->salary_max);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $allowedSorts = ['created_at', 'deadline', 'title', 'salary_min'];
        
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortOrder === 'asc' ? 'asc' : 'desc');
        }

        $perPage = min($request->get('per_page', 10), 50);
        $lowongans = $query->paginate($perPage);

        return new LowonganCollection($lowongans);
    }

    /**
     * Show single job (public)
     */
    public function show($id)
    {
        $lowongan = Lowongan::with('rekruter')->findOrFail($id);

        return response()->json([
            'job' => new LowonganResource($lowongan),
        ]);
    }

    /**
     * Create job (recruiter only)
     */
    public function store(StoreJobRequest $request)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can create jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $validated = $request->validated();
        $validated['recruiter_id'] = $rekruter->id;
        $validated['status'] = 'active';

        $lowongan = Lowongan::create($validated);

        return response()->json([
            'message' => 'Job created successfully',
            'job' => new LowonganResource($lowongan->load('rekruter')),
        ], 201);
    }

    /**
     * Update job (recruiter only - own jobs)
     */
    public function update(UpdateJobRequest $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can update jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $lowongan = Lowongan::where('id', $id)
            ->where('recruiter_id', $rekruter->id)
            ->firstOrFail();

        $lowongan->update($request->validated());

        return response()->json([
            'message' => 'Job updated successfully',
            'job' => new LowonganResource($lowongan->fresh()->load('rekruter')),
        ]);
    }

    /**
     * Delete job (recruiter only - own jobs)
     */
    public function destroy(Request $request, $id)
    {
        $rekruter = $request->user()->recruiter;

        if (!$rekruter) {
            return response()->json([
                'message' => 'Only recruiters can delete jobs',
                'error' => 'forbidden',
            ], 403);
        }

        $lowongan = Lowongan::where('id', $id)
            ->where('recruiter_id', $rekruter->id)
            ->firstOrFail();

        $lowongan->delete();

        return response()->json([
            'message' => 'Job deleted successfully',
        ]);
    }

    /**
     * Get applicants for a job (recruiter only)
     */
    public function applicants(Request $request, $id)
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
