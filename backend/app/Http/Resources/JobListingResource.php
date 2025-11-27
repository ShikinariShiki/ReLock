<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobListingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'company_name' => $this->company_name,
            'location' => $this->location,
            'department' => $this->department,
            'type' => $this->type,
            'mode' => $this->mode,
            'level' => $this->level,
            'deadline' => $this->deadline?->format('Y-m-d'),
            'deadline_formatted' => $this->deadline?->format('M d, Y'),
            'is_expired' => $this->deadline ? $this->deadline->isPast() : false,
            'days_remaining' => $this->deadline ? max(0, now()->diffInDays($this->deadline, false)) : null,
            'duration' => $this->duration,
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'salary_range' => $this->formatSalaryRange(),
            'contact_name' => $this->contact_name,
            'contact_email' => $this->contact_email,
            'contact_phone' => $this->contact_phone,
            'description' => $this->description,
            'responsibilities' => $this->responsibilities,
            'requirements' => $this->requirements,
            'benefits' => $this->benefits,
            'status' => $this->status,
            'applications_count' => $this->whenCounted('applications'),
            'recruiter' => new RecruiterResource($this->whenLoaded('recruiter')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    protected function formatSalaryRange(): ?string
    {
        if (!$this->salary_min && !$this->salary_max) {
            return null;
        }

        $format = fn($val) => 'Rp ' . number_format($val, 0, ',', '.');
        
        if ($this->salary_min && $this->salary_max) {
            return $format($this->salary_min) . ' - ' . $format($this->salary_max);
        }
        
        if ($this->salary_min) {
            return 'From ' . $format($this->salary_min);
        }
        
        return 'Up to ' . $format($this->salary_max);
    }
}
