<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobListingResource;
use App\Models\JobListing;
use Illuminate\Http\Request;

/**
 * Use Case: PencarianLowongan
 * Handles searching and listing job listings
 */
class PencarianLowonganController extends Controller
{
    /**
     * Search and list job listings
     */
    public function __invoke(Request $request)
    {
        $query = JobListing::with('recruiter')
            ->active();

        // Search by title or company
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by location
        if ($request->has('location')) {
            $query->where('location', $request->location);
        }

        // Filter by type (Full Time, Part Time, etc.)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by mode (Remote, On-site, Hybrid)
        if ($request->has('mode')) {
            $query->where('mode', $request->mode);
        }

        // Filter by department
        if ($request->has('department')) {
            $query->where('department', $request->department);
        }

        // Filter by seniority level
        if ($request->has('level')) {
            $query->where('seniority_level', $request->level);
        }

        // Filter by salary range
        if ($request->has('min_salary')) {
            $query->where('salary_min', '>=', $request->min_salary);
        }
        if ($request->has('max_salary')) {
            $query->where('salary_max', '<=', $request->max_salary);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $jobs = $query->paginate($perPage);

        return response()->json([
            'data' => JobListingResource::collection($jobs),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }
}
