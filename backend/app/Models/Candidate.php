<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidate extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'linkedin',
        'location',
        'about',
        'role',
        'skills',
        'experiences',
        'organizations',
        'education',
        'preferred_location',
        'experience_level',
        'portfolio_link',
        'cv_path',
        'cv_filename',
        'profile_photo',
    ];

    protected $casts = [
        'skills' => 'array',
        'experiences' => 'array',
        'organizations' => 'array',
        'education' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function bookmarkedJobs()
    {
        return $this->belongsToMany(JobListing::class, 'bookmarks');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
