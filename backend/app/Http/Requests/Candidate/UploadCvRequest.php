<?php

namespace App\Http\Requests\Candidate;

use Illuminate\Foundation\Http\FormRequest;

class UploadCvRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isCandidate();
    }

    public function rules(): array
    {
        return [
            'cv' => 'required|file|mimes:pdf|max:10240', // Max 10MB
        ];
    }

    public function messages(): array
    {
        return [
            'cv.required' => 'Please upload a CV file.',
            'cv.mimes' => 'CV must be a PDF file.',
            'cv.max' => 'CV file size must not exceed 10MB.',
        ];
    }
}
