<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rekruter extends Model
{
    use HasFactory;
    
    protected $table = 'rekruters';
    
    protected $fillable = [
        'akun_id',
        'first_name',
        'last_name',
        'company_name',
        'company_website',
        'phone',
        'position',
        'company_description',
        'tagline',
        'vision',
        'mission',
        'industry',
        'company_logo',
        'location',
    ];

    public function akun(): BelongsTo
    {
        return $this->belongsTo(Akun::class);
    }

    public function lowongans(): HasMany
    {
        return $this->hasMany(Lowongan::class, 'rekruter_id');
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
