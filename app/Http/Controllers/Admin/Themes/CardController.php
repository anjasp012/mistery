<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class CardController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/card', [
            'cards' => Theme::whereType('CARD')->orderBy('name')->get()
        ]);
    }

     public function update(Request $request, $slug)
    {
        $card = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($card->file) {
                Storage::disk('public')->delete($card->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $card->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $card->save();
        Cache::forget('theme');
        return back();
    }
}
