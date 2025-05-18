<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

require __DIR__.'/dashboard.php';
require __DIR__.'/auth.php';
require __DIR__.'/home.php';
