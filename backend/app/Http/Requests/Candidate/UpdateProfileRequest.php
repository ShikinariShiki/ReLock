<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isCandidate();
    }

    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'about' => 'nullable|string|max:2000',
            'role' => 'nullable|string|max:255',
            'skills' => 'nullable|array',
            'skills.*' => 'string|max:100',
            'experiences' => 'nullable|array',
            'experiences.*.company' => 'required_with:experiences|string|max:255',
            'experiences.*.position' => 'required_with:experiences|string|max:255',
            'experiences.*.start_date' => 'required_with:experiences|date',
            'experiences.*.end_date' => 'nullable|date|after:experiences.*.start_date',
            'experiences.*.description' => 'nullable|string|max:1000',
            'organizations' => 'nullable|array',
            'education' => 'nullable|array',
            'education.*.institution' => 'required_with:education|string|max:255',
            'education.*.degree' => 'required_with:education|string|max:255',
            'education.*.field' => 'nullable|string|max:255',
            'education.*.start_year' => 'required_with:education|integer|min:1950|max:' . (date('Y') + 10),
            'education.*.end_year' => 'nullable|integer|min:1950|max:' . (date('Y') + 10),
            'preferred_location' => 'nullable|string|max:255',
            'experience_level' => 'nullable|string|in:Entry Level,Junior,Mid Level,Senior,Lead,Executive',
            'portfolio_link' => 'nullable|url|max:255',
        ];
    }
}
