<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterCandidateRequest;
use App\Http\Requests\Auth\RegisterRecruiterRequest;
use App\Models\User;
use App\Models\Candidate;
use App\Models\Recruiter;
use Illuminate\Support\Facades\Hash;

/**
 * Use Case: RegisterUser
 * Handles user registration for both candidates and recruiters
 */
class RegisterUserController extends Controller
{
    /**
     * Register a new candidate user
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

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => $user->load('candidate'),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Register a new recruiter user
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
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => $user->load('recruiter'),
                'token' => $token,
            ],
        ], 201);
    }
}
