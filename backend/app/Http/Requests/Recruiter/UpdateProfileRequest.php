<?php

namespace App\Http\Requests\Recruiter;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isRecruiter();
    }

    public function rules(): array
    {
        return [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'company_name' => 'sometimes|string|max:255',
            'company_website' => 'nullable|url|max:255',
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:255',
            'company_description' => 'nullable|string|max:5000',
            'tagline' => 'nullable|string|max:255',
            'vision' => 'nullable|string|max:5000',
            'mission' => 'nullable|string|max:5000',
            'industry' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ];
    }
}
