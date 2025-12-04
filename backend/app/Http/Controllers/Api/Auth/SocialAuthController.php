<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\User;
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
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // User exists, just login
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleUser->getId()]);
                }
            } else {
                // Create new user (default as candidate)
                $nameParts = explode(' ', $googleUser->getName(), 2);
                $firstName = $nameParts[0] ?? '';
                $lastName = $nameParts[1] ?? '';

                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(24)), // Random password for social auth
                    'role' => 'candidate',
                    'email_verified_at' => now(),
                ]);

                // Create candidate profile
                Candidate::create([
                    'user_id' => $user->id,
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                ]);
            }

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
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
            $user = User::where('email', $email)->first();
            $role = $request->input('role', 'candidate');

            if ($user) {
                // User exists, just login
                if (!$user->google_id) {
                    $user->update(['google_id' => $googleId]);
                }
            } else {
                // Create new user
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'password' => Hash::make(Str::random(24)),
                    'role' => $role,
                    'email_verified_at' => now(),
                ]);

                // Create profile based on role
                if ($role === 'candidate') {
                    Candidate::create([
                        'user_id' => $user->id,
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                    ]);
                }
            }

            // Generate token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
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
