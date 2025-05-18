<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBox extends Model
{
    protected $guarded = ['id'];
    protected $casts = [
        'box_opened' => 'array',
    ];

    public function prize() {
        return $this->belongsTo(Prize::class, 'prize_id', 'id');
    }
}
