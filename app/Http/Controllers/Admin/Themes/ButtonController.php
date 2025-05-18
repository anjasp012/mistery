<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ButtonController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/button', [
            'buttons' => Theme::select('login_button', 'logout_button', 'claim_button', 'back_button', 'history_button')->first()
        ]);
    }

    public function update(Request $request)
    {
        $button = Theme::first();
        $request->validate([
            'name' => 'required|string',
            'image' => 'nullable|file|image',
        ]);

        if ($request->name == 'Login Button') {
            if ($request->hasFile('image')) {
                if ($button->login_button) {
                    Storage::disk('public')->delete($button->login_button);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $button->login_button = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Logout Button') {
            if ($request->hasFile('image')) {
                if ($button->logout_button) {
                    Storage::disk('public')->delete($button->logout_button);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $button->logout_button = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Claim Button') {
            if ($request->hasFile('image')) {
                if ($button->claim_button) {
                    Storage::disk('public')->delete($button->claim_button);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $button->claim_button = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Back Button') {
            if ($request->hasFile('image')) {
                if ($button->back_button) {
                    Storage::disk('public')->delete($button->back_button);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $button->back_button = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'History Button') {
            if ($request->hasFile('image')) {
                if ($button->history_button) {
                    Storage::disk('public')->delete($button->history_button);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $button->history_button = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }

        $button->save();
        Cache::forget('theme_first');

        return back();
    }
}
