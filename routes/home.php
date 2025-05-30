<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::name('home.')->prefix('home')->group(function () {
    Route::post('/login', [HomeController::class, 'login'])->name('login');
    Route::middleware('isMember')->group(function () {
        Route::post('/claim', [HomeController::class, 'claim'])->name('claim');
        Route::get('/getHistories', [HomeController::class, 'getHistories'])->name('getHistories');
        Route::get('/getBoxes', [HomeController::class, 'getBoxes'])->name('getBoxes');
        Route::get('/getNineBoxes/{id}', [HomeController::class, 'getNineBoxes'])->name('getNineBoxes');
        Route::get('/getPrizeList', [HomeController::class, 'getPrizeList'])->name('getPrizeList');
        Route::get('/getKeys', [HomeController::class, 'getKeys'])->name('getKeys');
        Route::post('/openBox/{id}/{key_id}', [HomeController::class, 'openBox'])->name('openBox');
        Route::get('/updateSelected', [HomeController::class, 'updateSelected'])->name('updateSelected');
    });
});
