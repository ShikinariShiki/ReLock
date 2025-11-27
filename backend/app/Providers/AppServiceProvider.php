<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Prevent lazy loading in development (helps catch N+1 queries)
        Model::preventLazyLoading(!app()->isProduction());
        
        // Prevent silently discarding attributes that are not fillable
        Model::preventSilentlyDiscardingAttributes(!app()->isProduction());

        // Configure rate limiters
        $this->configureRateLimiting();
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        // Rate limiter for authentication endpoints (login, register)
        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(env('RATE_LIMIT_AUTH', 10))
                ->by($request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'message' => 'Too many attempts. Please try again later.',
                        'error' => 'rate_limit_exceeded',
                        'retry_after' => $headers['Retry-After'] ?? 60,
                    ], 429, $headers);
                });
        });

        // Rate limiter for API endpoints
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(env('RATE_LIMIT_API', 60))
                ->by($request->user()?->id ?: $request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'message' => 'Too many requests. Please slow down.',
                        'error' => 'rate_limit_exceeded',
                        'retry_after' => $headers['Retry-After'] ?? 60,
                    ], 429, $headers);
                });
        });

        // Rate limiter for file uploads
        RateLimiter::for('uploads', function (Request $request) {
            return Limit::perMinute(10)
                ->by($request->user()?->id ?: $request->ip())
                ->response(function (Request $request, array $headers) {
                    return response()->json([
                        'message' => 'Too many file uploads. Please wait a moment.',
                        'error' => 'rate_limit_exceeded',
                        'retry_after' => $headers['Retry-After'] ?? 60,
                    ], 429, $headers);
                });
        });
    }
}
