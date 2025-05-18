<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class BackgroundController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/background', [
            'backgrounds' => Theme::select('bg_left', 'bg_right', 'bg_mobile')->first()
        ]);
    }

    public function update(Request $request)
    {
        $background = Theme::first();
        $request->validate([
            'name' => 'required|string',
            'image' => 'nullable|file|image',
        ]);

        if ($request->name == 'Background Desktop Left') {
            if ($request->hasFile('image')) {
                if ($background->bg_left) {
                    Storage::disk('public')->delete($background->bg_left);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $background->bg_left = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Background Desktop Right') {
            if ($request->hasFile('image')) {
                if ($background->bg_right) {
                    Storage::disk('public')->delete($background->bg_right);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $background->bg_right = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }
        if ($request->name == 'Background Mobile') {
            if ($request->hasFile('image')) {
                if ($background->bg_mobile) {
                    Storage::disk('public')->delete($background->bg_mobile);
                }
                $filename = $request->file('image')->hashName(); // nama acak, ekstensi asli
                $background->bg_mobile = $request->file('image')->storeAs('themes', $filename, 'public');
            }
        }

        $background->save();
        Cache::forget('theme_first');

        return back();
    }
}
