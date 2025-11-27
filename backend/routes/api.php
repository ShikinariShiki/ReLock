<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\RecruiterController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\JobApplicationController;

/*
|--------------------------------------------------------------------------
| API Routes for ReLock
|--------------------------------------------------------------------------
*/

// API Version prefix
Route::prefix('v1')->group(function () {

    // Health check endpoints
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'version' => config('app.version', '1.0.0'),
        ]);
    });

    Route::get('/health/db', function () {
        try {
            DB::connection()->getPdo();
            return response()->json([
                'status' => 'ok',
                'database' => 'connected',
                'timestamp' => now()->toISOString(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'database' => 'disconnected',
                'message' => app()->environment('production') ? 'Database connection failed' : $e->getMessage(),
            ], 500);
        }
    });

    // Public authentication routes (with rate limiting)
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/register/candidate', [AuthController::class, 'registerCandidate']);
        Route::post('/register/recruiter', [AuthController::class, 'registerRecruiter']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Public job routes
    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{id}', [JobController::class, 'show']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Auth
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // Candidate routes
        Route::prefix('candidate')->middleware('candidate')->group(function () {
            Route::get('/profile', [CandidateController::class, 'show']);
            Route::put('/profile', [CandidateController::class, 'update']);
            Route::post('/upload-cv', [CandidateController::class, 'uploadCv']);
            Route::get('/applications', [CandidateController::class, 'myApplications']);
        });

        // Recruiter routes
        Route::prefix('recruiter')->middleware('recruiter')->group(function () {
            Route::get('/profile', [RecruiterController::class, 'show']);
            Route::put('/profile', [RecruiterController::class, 'update']);
            Route::post('/upload-logo', [RecruiterController::class, 'uploadLogo']);
            Route::get('/dashboard', [RecruiterController::class, 'dashboard']);
        });

        // Job management (Recruiter only)
        Route::middleware('recruiter')->group(function () {
            Route::post('/jobs', [JobController::class, 'store']);
            Route::put('/jobs/{id}', [JobController::class, 'update']);
            Route::delete('/jobs/{id}', [JobController::class, 'destroy']);
            Route::get('/jobs/{id}/applicants', [JobController::class, 'applicants']);
        });

        // Job Applications
        Route::post('/jobs/{jobId}/apply', [JobApplicationController::class, 'apply'])->middleware('candidate');
        Route::get('/applications/{id}', [JobApplicationController::class, 'show']);
        Route::put('/applications/{id}/status', [JobApplicationController::class, 'updateStatus'])->middleware('recruiter');
        Route::delete('/applications/{id}', [JobApplicationController::class, 'withdraw'])->middleware('candidate');
    });
});

// Fallback route for v1 prefix - redirect unversioned API calls
Route::any('/{any}', function (Request $request) {
    // If accessing without v1 prefix, redirect common endpoints
    $path = $request->path();
    if (!str_starts_with($path, 'v1/')) {
        return response()->json([
            'message' => 'Please use API version prefix. Example: /api/v1/jobs',
            'documentation' => url('/api/v1/health'),
        ], 400);
    }
    
    return response()->json([
        'message' => 'Endpoint not found',
        'error' => 'not_found',
    ], 404);
})->where('any', '.*');

