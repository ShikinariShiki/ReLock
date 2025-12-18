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
        $akun = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
        ];

        // Add profile based on role
        if ($this->role === 'kandidat' && $this->relationLoaded('kandidat')) {
            $akun['profile'] = new KandidatResource($this->candidate);
        } elseif ($this->role === 'rekruter' && $this->relationLoaded('rekruter')) {
            $akun['profile'] = new RekruterResource($this->recruiter);
        }

        $response = [
            'message' => $this->message,
            'user' => $akun,
        ];

        if ($this->token) {
            $response['token'] = $this->token;
            $response['token_type'] = 'Bearer';
        }

        return $response;
    }
}
