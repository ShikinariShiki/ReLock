<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Kandidat;
use App\Models\Akun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle()
    {
        $url = Socialite::driver('google')
            ->stateless()
            ->redirect()
            ->getTargetUrl();
        
        return response()->json([
            'url' => $url,
        ]);
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback(Request $request)
    {
        try {
            // For API-based auth, we receive the code from frontend
            $code = $request->input('code');
            
            if (!$code) {
                return response()->json([
                    'message' => 'Authorization code is required',
                    'error' => 'missing_code',
                ], 400);
            }

            // Exchange code for user
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();

            // Find or create user
            $akun = Akun::where('email', $googleUser->getEmail())->first();

            if ($akun) {
                // User exists, just login
                if (!$akun->google_id) {
                    $akun->update(['google_id' => $googleUser->getId()]);
                }
            } else {
                // Create new user (default as candidate)
                $nameParts = explode(' ', $googleUser->getName(), 2);
                $firstName = $nameParts[0] ?? '';
                $lastName = $nameParts[1] ?? '';

                $akun = Akun::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(24)), // Random password for social auth
                    'role' => 'kandidat',
                    'email_verified_at' => now(),
                ]);

                // Create candidate profile
                Kandidat::create([
                    'user_id' => $akun->id,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                ]);
            }

            // Generate token
            $token = $akun->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $akun->id,
                    'name' => $akun->name,
                    'email' => $akun->email,
                    'role' => $akun->role,
                ],
                'token' => $token,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Authentication failed',
                'error' => app()->environment('production') ? 'auth_failed' : $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle token-based Google authentication (from frontend)
     */
    public function handleGoogleToken(Request $request)
    {
        $request->validate([
            'id_token' => 'required|string',
            'role' => 'nullable|in:candidate,recruiter',
        ]);

        try {
            // Verify the Google ID token
            $client = new \Google\Client(['client_id' => config('services.google.client_id')]);
            $payload = $client->verifyIdToken($request->id_token);
            
            if (!$payload) {
                return response()->json([
                    'message' => 'Invalid Google token',
                    'error' => 'invalid_token',
                ], 401);
            }

            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'] ?? '';
            $firstName = $payload['given_name'] ?? '';
            $lastName = $payload['family_name'] ?? '';

            // Find or create user
            $akun = Akun::where('email', $email)->first();
            $role = $request->input('role', 'kandidat');

            if ($akun) {
                // User exists, just login
                if (!$akun->google_id) {
                    $akun->update(['google_id' => $googleId]);
                }
            } else {
                // Create new user
                $akun = Akun::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'password' => Hash::make(Str::random(24)),
                    'role' => $role,
                    'email_verified_at' => now(),
                ]);

                // Create profile based on role
                if ($role === 'kandidat') {
                    Kandidat::create([
                        'user_id' => $akun->id,
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                    ]);
                }
            }

            // Generate token
            $token = $akun->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $akun->id,
                    'name' => $akun->name,
                    'email' => $akun->email,
                    'role' => $akun->role,
                ],
                'token' => $token,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Authentication failed',
                'error' => app()->environment('production') ? 'auth_failed' : $e->getMessage(),
            ], 500);
        }
    }
}
