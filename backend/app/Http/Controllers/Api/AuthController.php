<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterCandidateRequest;
use App\Http\Requests\Auth\RegisterRecruiterRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\CandidateResource;
use App\Http\Resources\RecruiterResource;
use App\Models\User;
use App\Models\Candidate;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new candidate
     */
    public function registerCandidate(RegisterCandidateRequest $request)
    {
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'candidate',
        ]);

        Candidate::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        $user->load('candidate');

        return new AuthResource($user, $token, 'Candidate registered successfully');
    }

    /**
     * Register a new recruiter
     */
    public function registerRecruiter(RegisterRecruiterRequest $request)
    {
        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'recruiter',
        ]);

        Recruiter::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'company_name' => $request->company_name,
            'company_website' => $request->company_website,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        $user->load('recruiter');

        return new AuthResource($user, $token, 'Recruiter registered successfully');
    }

    /**
     * Login user (candidate or recruiter)
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        if ($user->role === 'candidate') {
            $user->load('candidate');
        } else {
            $user->load('recruiter');
        }

        return new AuthResource($user, $token, 'Login successful');
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Get current authenticated user
     */
    public function me(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'candidate') {
            $user->load('candidate');
        } else {
            $user->load('recruiter');
        }

        return new AuthResource($user, null, 'User retrieved successfully');
    }
}
