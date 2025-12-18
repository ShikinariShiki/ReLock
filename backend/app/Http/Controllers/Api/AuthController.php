<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterCandidateRequest;
use App\Http\Requests\Auth\RegisterRecruiterRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\KandidatResource;
use App\Http\Resources\RekruterResource;
use App\Models\Akun;
use App\Models\Kandidat;
use App\Models\Rekruter;
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
        $akun = Akun::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'kandidat',
        ]);

        Kandidat::create([
            'user_id' => $akun->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        $token = $akun->createToken('auth_token')->plainTextToken;
        $akun->load('kandidat');

        return new AuthResource($akun, $token, 'Candidate registered successfully');
    }

    /**
     * Register a new recruiter
     */
    public function registerRecruiter(RegisterRecruiterRequest $request)
    {
        $akun = Akun::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'rekruter',
        ]);

        Rekruter::create([
            'user_id' => $akun->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'company_name' => $request->company_name,
            'company_website' => $request->company_website,
        ]);

        $token = $akun->createToken('auth_token')->plainTextToken;
        $akun->load('rekruter');

        return new AuthResource($akun, $token, 'Recruiter registered successfully');
    }

    /**
     * Login user (candidate or recruiter)
     */
    public function login(LoginRequest $request)
    {
        $akun = Akun::where('email', $request->email)->first();

        if (!$akun || !Hash::check($request->password, $akun->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $akun->createToken('auth_token')->plainTextToken;

        if ($akun->role === 'kandidat') {
            $akun->load('kandidat');
        } else {
            $akun->load('rekruter');
        }

        return new AuthResource($akun, $token, 'Login successful');
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
        $akun = $request->user();

        if ($akun->role === 'kandidat') {
            $akun->load('kandidat');
        } else {
            $akun->load('rekruter');
        }

        return new AuthResource($akun, null, 'User retrieved successfully');
    }
}
