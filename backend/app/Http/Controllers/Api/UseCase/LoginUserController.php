<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\Akun;
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
        $akun = Akun::where('email', $request->email)->first();

        if (!$akun || !Hash::check($request->password, $akun->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'errors' => ['email' => ['The provided credentials are incorrect.']],
            ], 401);
        }

        // Load relationship based on role
        if ($akun->role === 'kandidat') {
            $akun->load('kandidat');
        } else {
            $akun->load('rekruter');
        }

        $token = $akun->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'data' => [
                'user' => new AkunResource($akun),
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
        $akun = $request->user();

        if ($akun->role === 'kandidat') {
            $akun->load('kandidat');
        } else {
            $akun->load('rekruter');
        }

        return response()->json([
            'data' => [
                'user' => new AkunResource($akun),
            ],
        ]);
    }
}
