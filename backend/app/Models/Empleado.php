<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $casts = [
        'fecha_nacimiento' => 'date:d/m/Y',
    ];

    public $timestamps = false;

    public function skills()
    {
        return $this->hasMany(EmpleadoSkill::class);
    }
}
