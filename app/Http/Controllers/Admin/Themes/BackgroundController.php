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
            'backgrounds' => Theme::whereType('BACKGROUND')->get()
        ]);
    }

    public function update(Request $request, $slug)
    {
        $background = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($background->file) {
                Storage::disk('public')->delete($background->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $background->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $background->save();
        Cache::forget('theme');

        return back();
    }
}
