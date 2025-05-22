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
            'logos' => Theme::whereType('LOGO')->get()
        ]);
    }

    public function update(Request $request, $slug)
    {
        $logo = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($logo->file) {
                Storage::disk('public')->delete($logo->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $logo->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $logo->save();
        Cache::forget('theme');

        return back();
    }
}
