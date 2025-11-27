<?php

namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isRecruiter();
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,reviewed,shortlisted,rejected,accepted',
            'notes' => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' => 'Application status is required.',
            'status.in' => 'Invalid application status.',
        ];
    }
}
