<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('oke', function () {
    return inertia('oke');
});

require __DIR__.'/dashboard.php';
require __DIR__.'/auth.php';
require __DIR__.'/home.php';
