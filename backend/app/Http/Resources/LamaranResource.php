<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class LamaranResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cv_path' => $this->cv_path,
            'cv_url' => $this->cv_path ? Storage::disk('public')->url($this->cv_path) : null,
            'cv_type' => $this->cv_type,
            'status' => $this->status,
            'status_label' => $this->getStatusLabel(),
            'status_color' => $this->getStatusColor(),
            'notes' => $this->notes,
            'kandidat' => new KandidatResource($this->whenLoaded('kandidat')),
            'job_listing' => new LowonganResource($this->whenLoaded('jobListing')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'applied_at' => $this->created_at?->format('M d, Y'),
        ];
    }

    protected function getStatusLabel(): string
    {
        return match($this->status) {
            'pending' => 'Pending Review',
            'reviewed' => 'Under Review',
            'shortlisted' => 'Shortlisted',
            'rejected' => 'Not Selected',
            'accepted' => 'Accepted',
            default => ucfirst($this->status),
        };
    }

    protected function getStatusColor(): string
    {
        return match($this->status) {
            'pending' => 'yellow',
            'reviewed' => 'blue',
            'shortlisted' => 'purple',
            'rejected' => 'red',
            'accepted' => 'green',
            default => 'gray',
        };
    }
}
