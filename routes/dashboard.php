<?php

use App\Http\Controllers\Admin\CodeController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\PrizeController;
use App\Http\Controllers\Admin\Settings\PasswordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use App\Http\Controllers\Admin\Themes\BackgroundController;
use App\Http\Controllers\Admin\Themes\BoxKeyController;
use App\Http\Controllers\Admin\Themes\ButtonController;
use App\Http\Controllers\Admin\Themes\CardController;
use App\Http\Controllers\Admin\Themes\InputController;
use App\Http\Controllers\Admin\Themes\LinkController;
use App\Http\Controllers\Admin\Themes\LogoController;
use App\Http\Controllers\Admin\Themes\PopupController;
use App\Http\Controllers\Admin\Themes\SliderController;
use App\Http\Controllers\Admin\Themes\SoundController;
use App\Models\Code;
use App\Models\Prize;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('admin.')->prefix('/admin')->middleware(['auth', 'isAdmin'])->group(function () {
    Route::redirect('/', 'admin/dashboard');
    Route::get('/dashboard', function () {
        $member = User::whereRole('MEMBER')->count();
        $code = Code::count();
        $prize = Prize::count();
        return Inertia::render('dashboard', [
            'member' => $member,
            'code' => $code,
            'prize' => $prize,
        ]);
    })->name('dashboard');

    Route::resource('member', MemberController::class);
    Route::resource('prize', PrizeController::class);
    Route::resource('code-reedem', CodeController::class);


    // themes
    Route::redirect('themes', 'themes/logo')->name('themes');
    Route::get('themes/logo', [LogoController::class, 'edit'])->name('logo.edit');
    Route::patch('themes/logo/{slug}', [LogoController::class, 'update'])->name('logo.update');

    Route::get('themes/background', [BackgroundController::class, 'edit'])->name('background.edit');
    Route::patch('themes/background/{slug}', [BackgroundController::class, 'update'])->name('background.update');

    Route::get('themes/box-key', [BoxKeyController::class, 'edit'])->name('boxkey.edit');
    Route::patch('themes/box-key/{id}', [BoxKeyController::class, 'update'])->name('boxkey.update');

    Route::get('themes/card', [CardController::class, 'edit'])->name('card.edit');
    Route::patch('themes/card/{slug}', [CardController::class, 'update'])->name('card.update');

    Route::get('themes/popup', [PopupController::class, 'edit'])->name('popup.edit');
    Route::patch('themes/popup/{slug}', [PopupController::class, 'update'])->name('popup.update');

    Route::get('themes/button', [ButtonController::class, 'edit'])->name('button.edit');
    Route::patch('themes/button/{slug}', [ButtonController::class, 'update'])->name('button.update');

    Route::get('themes/slider', [SliderController::class, 'edit'])->name('slider.edit');
    Route::post('themes/slider', [SliderController::class, 'store'])->name('slider.store');
    Route::patch('themes/slider/{slug}', [SliderController::class, 'update'])->name('slider.update');

    Route::get('themes/input', [InputController::class, 'edit'])->name('input.edit');
    Route::patch('themes/input/{slug}', [InputController::class, 'update'])->name('input.update');

    Route::get('themes/sound', [SoundController::class, 'edit'])->name('sound.edit');
    Route::patch('themes/sound/{slug}', [SoundController::class, 'update'])->name('sound.update');

    Route::get('themes/link', [LinkController::class, 'edit'])->name('link.edit');
    Route::patch('themes/link/{slug}', [LinkController::class, 'update'])->name('link.update');

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
