<?php

use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\Settings\PasswordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Themes\BackgroundController;
use App\Http\Controllers\Admin\Themes\BoxKeyController;
use App\Http\Controllers\Admin\Themes\ButtonController;
use App\Http\Controllers\Admin\Themes\LogoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('admin.')->prefix('/admin')->middleware(['auth', 'isAdmin'])->group(function () {
    Route::redirect('/', 'admin/dashboard');
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('member', MemberController::class);


    // themes
    Route::redirect('themes', 'themes/logo')->name('themes');
    Route::get('themes/logo', [LogoController::class, 'edit'])->name('logo.edit');
    Route::patch('themes/logo', [LogoController::class, 'update'])->name('logo.update');

    Route::get('themes/background', [BackgroundController::class, 'edit'])->name('background.edit');
    Route::patch('themes/background', [BackgroundController::class, 'update'])->name('background.update');

    Route::get('themes/box-key', [BoxKeyController::class, 'edit'])->name('boxkey.edit');
    Route::patch('themes/box-key/{id}', [BoxKeyController::class, 'update'])->name('boxkey.update');

    Route::get('themes/button', [ButtonController::class, 'edit'])->name('button.edit');
    Route::patch('themes/button', [ButtonController::class, 'update'])->name('button.update');


    // profile settings
    Route::redirect('settings', 'settings/profile')->name('profile.settings');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('admin/settings/appearance');
    })->name('appearance');
});
