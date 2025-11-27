<?php

namespace App\Http\Requests\Application;

use Illuminate\Foundation\Http\FormRequest;

class ApplyJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isCandidate();
    }

    public function rules(): array
    {
        return [
            'cv_type' => 'required|in:existing,new',
            'cv' => 'required_if:cv_type,new|file|mimes:pdf|max:10240',
            'cover_letter' => 'nullable|string|max:5000',
        ];
    }

    public function messages(): array
    {
        return [
            'cv_type.required' => 'Please specify whether to use existing CV or upload a new one.',
            'cv_type.in' => 'CV type must be either "existing" or "new".',
            'cv.required_if' => 'Please upload a CV when selecting "new" CV option.',
            'cv.mimes' => 'CV must be a PDF file.',
            'cv.max' => 'CV file size must not exceed 10MB.',
        ];
    }
}
