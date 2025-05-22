<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class InputController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/input', [
            'inputs' => Theme::whereType('INPUT')->get()
        ]);
    }

    public function update(Request $request, $slug)
    {
        $input = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($input->file) {
                Storage::disk('public')->delete($input->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $input->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $input->save();
        Cache::forget('theme');
        return back();
    }
}
