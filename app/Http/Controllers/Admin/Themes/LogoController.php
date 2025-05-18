<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class LogoController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/logo', [
            'logos' => Theme::select('first_logo', 'second_logo', 'third_logo', 'google_logo')->first()
        ]);
    }

    public function update(Request $request)
    {
        $logo = Theme::first();
        $request->validate([
            'name' => 'required|string',
            'image' => 'nullable|file|image',
        ]);

        if ($request->name == 'First Logo') {
            if ($request->hasFile('image')) {
                if ($logo->first_logo) {
                    Storage::disk('public')->delete($logo->first_logo);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $logo->first_logo = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Second Logo') {
            if ($request->hasFile('image')) {
                if ($logo->second_logo) {
                    Storage::disk('public')->delete($logo->second_logo);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $logo->second_logo = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Third Logo') {
            if ($request->hasFile('image')) {
                if ($logo->third_logo) {
                    Storage::disk('public')->delete($logo->third_logo);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $logo->third_logo = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Google Logo') {
            if ($request->hasFile('image')) {
                if ($logo->google_logo) {
                    Storage::disk('public')->delete($logo->google_logo);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $logo->google_logo = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }

        $logo->save();
        Cache::forget('theme_first');

        return back();
    }
}
