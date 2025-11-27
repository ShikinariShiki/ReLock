<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsCandidate
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isCandidate()) {
            return response()->json([
                'message' => 'Access denied. This action is only available for candidates.',
                'error' => 'forbidden',
            ], 403);
        }

        if (!$request->user()->candidate) {
            return response()->json([
                'message' => 'Candidate profile not found. Please complete your profile first.',
                'error' => 'profile_incomplete',
            ], 404);
        }

        return $next($request);
    }
}
