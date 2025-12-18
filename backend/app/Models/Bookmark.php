<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    protected $fillable = [
        'kandidat_id',
        'lowongan_id',
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
