<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    protected $guarded = ['id'];

    protected $with = ['key'];

    public function member() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function key() {
        return $this->belongsTo(Key::class);
    }
}
