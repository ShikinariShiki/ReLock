<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lamaran extends Model
{
    use HasFactory;
    
    protected $table = 'lamarans';
    
    protected $fillable = [
        'kandidat_id',
        'lowongan_id',
        'cv_path',
        'cv_type',
        'status',
        'notes',
    ];

    public function kandidat(): BelongsTo
    {
        return $this->belongsTo(Kandidat::class);
    }

    public function lowongan(): BelongsTo
    {
        return $this->belongsTo(Lowongan::class);
    }
}
