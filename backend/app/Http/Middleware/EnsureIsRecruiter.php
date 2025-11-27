<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsRecruiter
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isRecruiter()) {
            return response()->json([
                'message' => 'Access denied. This action is only available for recruiters.',
                'error' => 'forbidden',
            ], 403);
        }

        if (!$request->user()->recruiter) {
            return response()->json([
                'message' => 'Recruiter profile not found. Please complete your profile first.',
                'error' => 'profile_incomplete',
            ], 404);
        }

        return $next($request);
    }
}
