<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PopupController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/popup', [
            'popups' => Theme::whereType('POPUP')->orderBy('name')->get()
        ]);
    }

      public function update(Request $request, $slug)
    {
        $popup = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($popup->file) {
                Storage::disk('public')->delete($popup->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $popup->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }
        $popup->save();
        Cache::forget('theme');
        return back();
    }
}
