<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobListing extends Model
{
    use HasFactory;
    protected $fillable = [
        'recruiter_id',
        'title',
        'company_name',
        'location',
        'department',
        'type',
        'mode',
        'level',
        'deadline',
        'duration',
        'salary_min',
        'salary_max',
        'contact_name',
        'contact_email',
        'contact_phone',
        'description',
        'responsibilities',
        'requirements',
        'benefits',
        'status',
    ];

    protected $casts = [
        'deadline' => 'date',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('deadline', '>=', now());
    }
}
