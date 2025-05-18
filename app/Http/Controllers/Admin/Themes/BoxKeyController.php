<?php

namespace App\Http\Controllers\Admin\Themes;

use App\Http\Controllers\Controller;
use App\Models\Box;
use App\Models\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class BoxKeyController extends Controller
{
    public function edit()
    {
        $boxes = Box::all()->keyBy('id');
        $keys = Key::all()->keyBy('id');

        $boxeskeys = [];

        foreach ($boxes as $id => $box) {
            $key = $keys->get($id);

            $boxeskeys[] = [
                'id' => $box->id,
                'name' => $box->name,
                'image_box' => $box->image_box,
                'image_box_opened' => $box->image_box_opened,
                'image_key' => $key ? $key->image : null,
            ];
        }

        return inertia('admin/themes/box-key', [
            'boxeskeys' => $boxeskeys
        ]);
    }
    public function update($id, Request $request) {
        $request->validate([
            'name' => 'required|string',
            'image_box' => 'nullable|file|image',
            'image_box_opened' => 'nullable|file|image',
            'image_key' => 'nullable|file|image',
        ]);

        $box = Box::find($id);
        $key = Key::find($id);

        $box->name = $request->name;
        $key->name = $request->name;
        if ($request->hasFile('image_box')) {
            if ($box->image_box) {
                Storage::disk('public')->delete($box->image_box);
            }
            $filename = $request->file('image_box')->hashName(); // nama acak, ekstensi asli
            $box->image_box = $request->file('image_box')->storeAs('themes', $filename, 'public');
        }
        if ($request->hasFile('image_box_opened')) {
            if ($box->image_box_opened) {
                Storage::disk('public')->delete($box->image_box_opened);
            }
            $filename = $request->file('image_box_opened')->hashName(); // nama acak, ekstensi asli
            $box->image_box_opened = $request->file('image_box_opened')->storeAs('themes', $filename, 'public');
        }
        if ($request->hasFile('image_key')) {
            if ($key->image) {
                Storage::disk('public')->delete($key->image);
            }
            $filename = $request->file('image_key')->hashName(); // nama acak, ekstensi asli
            $key->image = $request->file('image_key')->storeAs('themes', $filename, 'public');
        }

        $box->save();
        $key->save();
        Cache::forget('theme_first');

        return back();
    }
}
