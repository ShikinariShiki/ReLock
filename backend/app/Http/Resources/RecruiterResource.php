<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RecruiterResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'full_name' => $this->full_name,
            'company_name' => $this->company_name,
            'company_website' => $this->company_website,
            'phone' => $this->phone,
            'position' => $this->position,
            'company_description' => $this->company_description,
            'tagline' => $this->tagline,
            'vision' => $this->vision,
            'mission' => $this->mission,
            'industry' => $this->industry,
            'company_logo' => $this->company_logo,
            'logo_url' => $this->company_logo ? Storage::disk('public')->url($this->company_logo) : null,
            'location' => $this->location,
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
