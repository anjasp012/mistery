<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserKey extends Model
{
    protected $guarded = ['id'];

    protected $with = ['key'];

    public function key() {
        return $this->belongsTo(Key::class);
    }
}
