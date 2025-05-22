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
            'buttons' => Theme::whereType('BUTTON')->get()
        ]);
    }

    public function update(Request $request, $slug)
    {
        $button = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($button->file) {
                Storage::disk('public')->delete($button->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $button->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $button->save();
        Cache::forget('theme');
        return back();
    }
}
