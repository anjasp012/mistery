<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrizeBox extends Model
{
    protected $guarded = ['id'];

    public function user_box()
    {
        return $this->belongsTo(UserBox::class);
    }
    public function prize()
    {
        return $this->belongsTo(Prize::class);
    }
}
