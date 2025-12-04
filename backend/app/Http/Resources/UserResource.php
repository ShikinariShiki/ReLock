<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $photoUrl = null;
        
        // Get photo URL for candidates
        if ($this->role === 'candidate' && $this->relationLoaded('candidate') && $this->candidate) {
            if ($this->candidate->profile_photo) {
                $photoUrl = Storage::disk('public')->url($this->candidate->profile_photo);
            }
        }
        
        // Get logo URL for recruiters
        if ($this->role === 'recruiter' && $this->relationLoaded('recruiter') && $this->recruiter) {
            if ($this->recruiter->company_logo) {
                $photoUrl = Storage::disk('public')->url($this->recruiter->company_logo);
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'photo_url' => $photoUrl,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
