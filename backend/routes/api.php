<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Use Case Controllers
use App\Http\Controllers\Api\UseCase\RegisterUserController;
use App\Http\Controllers\Api\UseCase\LoginUserController;
use App\Http\Controllers\Api\UseCase\TambahLowonganController;
use App\Http\Controllers\Api\UseCase\HapusLowonganController;
use App\Http\Controllers\Api\UseCase\EditLowonganController;
use App\Http\Controllers\Api\UseCase\TampilDetailLowonganController;
use App\Http\Controllers\Api\UseCase\PencarianLowonganController;
use App\Http\Controllers\Api\UseCase\ApplyLamaranController;
use App\Http\Controllers\Api\UseCase\UbahStatusLamaranController;
use App\Http\Controllers\Api\UseCase\LihatMyListController;
use App\Http\Controllers\Api\UseCase\BookmarkLamaranController;
use App\Http\Controllers\Api\UseCase\UnbookmarkLamaranController;
use App\Http\Controllers\Api\UseCase\UpdateCandidateProfileController;
use App\Http\Controllers\Api\UseCase\UpdateCompanyProfileController;
use App\Http\Controllers\Api\UseCase\LihatPelamarController;
use App\Http\Controllers\Api\Auth\SocialAuthController;

/*
|--------------------------------------------------------------------------
| API Routes for ReLock - Use Case Based Controllers
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

    // ==========================================
    // USE CASE: RegisterUser
    // ==========================================
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/register/candidate', [RegisterUserController::class, 'registerCandidate']);
        Route::post('/register/recruiter', [RegisterUserController::class, 'registerRecruiter']);
    });

    // ==========================================
    // USE CASE: LoginUser
    // ==========================================
    Route::middleware('throttle:auth')->group(function () {
        Route::post('/login', [LoginUserController::class, 'login']);
    });

    // ==========================================
    // SOCIAL AUTHENTICATION (Google OAuth)
    // ==========================================
    Route::prefix('auth')->group(function () {
        Route::get('/google', [SocialAuthController::class, 'redirectToGoogle']);
        Route::get('/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
        Route::post('/google/token', [SocialAuthController::class, 'handleGoogleToken']);
    });

    // ==========================================
    // USE CASE: PencarianLowongan (Public)
    // ==========================================
    Route::get('/jobs', PencarianLowonganController::class);

    // ==========================================
    // USE CASE: TampilDetailLowongan (Public)
    // ==========================================
    Route::get('/jobs/{id}', TampilDetailLowonganController::class);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        
        // ==========================================
        // USE CASE: LoginUser (Logout & Me)
        // ==========================================
        Route::post('/logout', [LoginUserController::class, 'logout']);
        Route::get('/me', [LoginUserController::class, 'me']);

        // ==========================================
        // CANDIDATE ROUTES
        // ==========================================
        Route::prefix('candidate')->middleware('candidate')->group(function () {
            
            // USE CASE: UpdateCandidateProfile
            Route::get('/profile', [UpdateCandidateProfileController::class, 'show']);
            Route::put('/profile', [UpdateCandidateProfileController::class, 'update']);
            Route::post('/upload-cv', [UpdateCandidateProfileController::class, 'uploadCv']);
            Route::post('/upload-photo', [UpdateCandidateProfileController::class, 'uploadPhoto']);
            
            // USE CASE: LihatMyList
            Route::get('/bookmarks', [LihatMyListController::class, 'bookmarks']);
            Route::get('/applications', [LihatMyListController::class, 'applications']);
            
            // USE CASE: BookmarkLamaran
            Route::post('/bookmarks/{jobId}', BookmarkLamaranController::class);
            Route::get('/bookmarks/{jobId}/check', [BookmarkLamaranController::class, 'check']);
            
            // USE CASE: UnbookmarkLamaran
            Route::delete('/bookmarks/{jobId}', UnbookmarkLamaranController::class);
        });

        // ==========================================
        // RECRUITER ROUTES
        // ==========================================
        Route::prefix('recruiter')->middleware('recruiter')->group(function () {
            
            // USE CASE: UpdateCompanyProfile
            Route::get('/profile', [UpdateCompanyProfileController::class, 'show']);
            Route::put('/profile', [UpdateCompanyProfileController::class, 'update']);
            Route::post('/upload-logo', [UpdateCompanyProfileController::class, 'uploadLogo']);
            Route::get('/dashboard', [UpdateCompanyProfileController::class, 'dashboard']);
        });

        // ==========================================
        // JOB MANAGEMENT (Recruiter only)
        // ==========================================
        Route::middleware('recruiter')->group(function () {
            // USE CASE: TambahLowongan
            Route::post('/jobs', TambahLowonganController::class);
            
            // USE CASE: EditLowongan
            Route::put('/jobs/{id}', EditLowonganController::class);
            
            // USE CASE: HapusLowongan
            Route::delete('/jobs/{id}', HapusLowonganController::class);
            
            // USE CASE: LihatPelamar
            Route::get('/jobs/{id}/applicants', LihatPelamarController::class);
        });

        // ==========================================
        // USE CASE: ApplyLamaran (Candidate only)
        // ==========================================
        Route::post('/jobs/{jobId}/apply', ApplyLamaranController::class)->middleware('candidate');

        // ==========================================
        // USE CASE: UbahStatusLamaran (Recruiter only)
        // ==========================================
        Route::put('/applications/{id}/status', UbahStatusLamaranController::class)->middleware('recruiter');
    });
});

// Fallback route for v1 prefix
Route::any('/{any}', function (Request $request) {
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

