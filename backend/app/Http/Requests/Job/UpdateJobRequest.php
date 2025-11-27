<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isRecruiter();
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'company_name' => 'sometimes|string|max:255',
            'location' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:Full Time,Part Time,Contract,Freelance,Internship',
            'mode' => 'sometimes|in:On-site,Remote,Hybrid',
            'level' => 'sometimes|string|max:255',
            'deadline' => 'sometimes|date',
            'duration' => 'sometimes|string|max:255',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0',
            'contact_name' => 'sometimes|string|max:255',
            'contact_email' => 'sometimes|email|max:255',
            'contact_phone' => 'sometimes|string|max:20',
            'description' => 'sometimes|string|max:10000',
            'responsibilities' => 'sometimes|string|max:10000',
            'requirements' => 'sometimes|string|max:10000',
            'benefits' => 'nullable|string|max:5000',
            'status' => 'sometimes|in:active,closed,draft',
        ];
    }
}
