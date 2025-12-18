<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kandidat extends Model
{
    use HasFactory;
    
    protected $table = 'kandidats';
    
    protected $fillable = [
        'akun_id',
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

    public function akun(): BelongsTo
    {
        return $this->belongsTo(Akun::class);
    }

    public function lamarans(): HasMany
    {
        return $this->hasMany(Lamaran::class, 'kandidat_id');
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class);
    }

    public function bookmarkedJobs()
    {
        return $this->belongsToMany(Lowongan::class, 'bookmarks');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
