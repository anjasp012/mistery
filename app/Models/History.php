<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $guarded = ['id'];

    public function prize() {
        return $this->belongsTo(Prize::class);
    }
}
