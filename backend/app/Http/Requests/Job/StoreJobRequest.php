<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isRecruiter();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'type' => 'required|in:Full Time,Part Time,Contract,Freelance,Internship',
            'mode' => 'required|in:On-site,Remote,Hybrid',
            'level' => 'required|string|max:255',
            'deadline' => 'required|date|after:today',
            'duration' => 'required|string|max:255',
            'salary_min' => 'nullable|numeric|min:0',
            'salary_max' => 'nullable|numeric|min:0|gte:salary_min',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:20',
            'description' => 'required|string|max:10000',
            'responsibilities' => 'required|string|max:10000',
            'requirements' => 'required|string|max:10000',
            'benefits' => 'nullable|string|max:5000',
        ];
    }

    public function messages(): array
    {
        return [
            'deadline.after' => 'The application deadline must be a future date.',
            'salary_max.gte' => 'Maximum salary must be greater than or equal to minimum salary.',
            'type.in' => 'Invalid job type selected.',
            'mode.in' => 'Invalid work mode selected.',
        ];
    }
}
