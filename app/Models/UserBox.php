<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBox extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'box_opened' => 'array',
    ];

    public function key() {
        return $this->belongsTo(Key::class);
    }

    public function prizes() {
        return $this->hasMany(PrizeBox::class);
    }
}
