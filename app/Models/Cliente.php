<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';

    public function direccion() {
        return $this->hasMany(ClienteDireccion::class, 'cliente_id', 'id');
    }

    public function telefono() {
        return $this->hasMany(ClienteTelefono::class, 'cliente_id', 'id');
    }
}
