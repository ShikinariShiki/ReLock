<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
{
    protected $token;
    protected $message;

    public function __construct($resource, string $token = null, string $message = 'Success')
    {
        parent::__construct($resource);
        $this->token = $token;
        $this->message = $message;
    }

    public function toArray(Request $request): array
    {
        $user = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
        ];

        // Add profile based on role
        if ($this->role === 'candidate' && $this->relationLoaded('candidate')) {
            $user['profile'] = new CandidateResource($this->candidate);
        } elseif ($this->role === 'recruiter' && $this->relationLoaded('recruiter')) {
            $user['profile'] = new RecruiterResource($this->recruiter);
        }

        $response = [
            'message' => $this->message,
            'user' => $user,
        ];

        if ($this->token) {
            $response['token'] = $this->token;
            $response['token_type'] = 'Bearer';
        }

        return $response;
    }
}
