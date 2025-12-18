<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class KandidatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'phone' => $this->phone,
            'linkedin' => $this->linkedin,
            'location' => $this->location,
            'about' => $this->about,
            'role' => $this->role,
            'skills' => $this->skills ?? [],
            'experiences' => $this->experiences ?? [],
            'organizations' => $this->organizations ?? [],
            'education' => $this->education ?? [],
            'preferred_location' => $this->preferred_location,
            'experience_level' => $this->experience_level,
            'portfolio_link' => $this->portfolio_link,
            'cv_path' => $this->cv_path,
            'cv_url' => $this->cv_path ? Storage::disk('public')->url($this->cv_path) : null,
            'profile_photo' => $this->profile_photo,
            'photo_url' => $this->profile_photo ? Storage::disk('public')->url($this->profile_photo) : null,
            'user' => new AkunResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
