<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SoundController extends Controller
{
    public function edit() {
        return inertia('admin/themes/sound', [
                'sounds' => Theme::whereType('SOUND')->orderBy('name')->get()
            ]);
        }

     public function update(Request $request, $slug)
    {
        $sound = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file',
        ]);

        if ($request->hasFile('file')) {
            if ($sound->file) {
                Storage::disk('public')->delete($sound->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $sound->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $sound->save();
        Cache::forget('theme');
        return back();
    }
}
