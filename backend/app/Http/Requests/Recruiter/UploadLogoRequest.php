<?php

namespace App\Http\Requests\Recruiter;

use Illuminate\Foundation\Http\FormRequest;

class UploadLogoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isRecruiter();
    }

    public function rules(): array
    {
        return [
            'logo' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
        ];
    }

    public function messages(): array
    {
        return [
            'logo.required' => 'Please upload a logo image.',
            'logo.image' => 'The file must be an image.',
            'logo.mimes' => 'Logo must be a JPEG, PNG, JPG, or WebP image.',
            'logo.max' => 'Logo file size must not exceed 2MB.',
        ];
    }
}
