<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lowongan extends Model
{
    use HasFactory;
    
    protected $table = 'lowongans';
    
    protected $fillable = [
        'rekruter_id',
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

    public function rekruter(): BelongsTo
    {
        return $this->belongsTo(Rekruter::class);
    }

    public function lamarans(): HasMany
    {
        return $this->hasMany(Lamaran::class, 'lowongan_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('deadline', '>=', now());
    }
}
