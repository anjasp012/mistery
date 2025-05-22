<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class LinkController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/link', [
            'links' => Theme::whereType('LINK')->orderBy('name')->get()
        ]);
    }

     public function update(Request $request, $slug)
    {
        $link = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
            'link' => 'required|url',
        ]);

        if ($request->hasFile('file')) {
            if ($link->file) {
                Storage::disk('public')->delete($link->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $link->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }
        $link->link = $request->link;

        $link->save();
        Cache::forget('theme');
        return back();
    }
}
