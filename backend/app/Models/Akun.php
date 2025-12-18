<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Akun extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'akuns';
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function kandidat()
    {
        return $this->hasOne(Kandidat::class, 'akun_id');
    }

    public function rekruter()
    {
        return $this->hasOne(Rekruter::class, 'akun_id');
    }

    public function isKandidat(): bool
    {
        return $this->role === 'kandidat';
    }

    public function isRekruter(): bool
    {
        return $this->role === 'rekruter';
    }
}
