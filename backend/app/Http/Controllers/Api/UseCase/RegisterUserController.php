<?php

namespace App\Http\Controllers\Api\UseCase;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterCandidateRequest;
use App\Http\Requests\Auth\RegisterRecruiterRequest;
use App\Models\Akun;
use App\Models\Kandidat;
use App\Models\Rekruter;
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

        $token = $akun->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => $akun->load('kandidat'),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Register a new recruiter user
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
        ]);

        $token = $akun->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'data' => [
                'user' => $akun->load('rekruter'),
                'token' => $token,
            ],
        ], 201);
    }
}
