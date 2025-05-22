<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Models\Theme;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function edit()
    {
        return inertia('admin/themes/slider', [
            'sliders' => Theme::whereType('SLIDER')->get()
        ]);
    }

    public function store() {

        Theme::create([
            'type' => 'SLIDER',
            'name' => $name = 'SLIDER '. Theme::whereType('SLIDER')->count() + 1,
            'slug' => Str::slug($name),
            'file' => '/',
            'is_active' => true
        ]);
    }

    public function update(Request $request, $slug)
    {
        $slider = Theme::whereSlug($slug)->first();
        $request->validate([
            'name' => 'required|string',
            'file' => 'nullable|file|file',
        ]);

        if ($request->hasFile('file')) {
            if ($slider->file) {
                Storage::disk('public')->delete($slider->file);
            }
            $filename = $request->file('file')->hashName(); // nama acak, ekstensi asli
            $slider->file = $request->file('file')->storeAs('themes', $filename, 'public');
        }

        $slider->save();
        Cache::forget('theme');

        return back();
    }
}
