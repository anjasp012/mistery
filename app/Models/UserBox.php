<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBox extends Model
{
    protected $guarded = ['id'];

    protected $with = 'prizes';

    protected $casts = [
        'box_opened' => 'array',
    ];

    public function prizes() {
        return $this->hasMany(PrizeBox::class);
    }
}
