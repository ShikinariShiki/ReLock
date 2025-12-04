<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * Use Case: LoginUser
 * Handles user authentication (login/logout)
 */
class LoginUserController extends Controller
{
    /**
     * Authenticate user and return token
     */
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'errors' => ['email' => ['The provided credentials are incorrect.']],
            ], 401);
        }

        // Load relationship based on role
        if ($user->role === 'candidate') {
            $user->load('candidate');
        } else {
            $user->load('recruiter');
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'user' => new UserResource($user),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Logout user and revoke token
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

        return response()->json([
            'data' => [
                'user' => new UserResource($user),
            ],
        ]);
    }
}
