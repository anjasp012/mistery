<?php

namespace App\Http\Controllers\Admin;

use App\Models\Prize;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PrizeResource;

class PrizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('admin/prize/index', [
            'prizes' => PrizeResource::collection(Prize::query()
                ->when($request->has('search'), function ($q) use ($request) {
                    $search = $request->input('search');
                    $q->where('name', 'like', "%" . Str::lower(trim($search)) . "%");
                })
                ->orderBy('name')
                ->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/prize/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'image' => 'nullable|file|image',
        ]);
        if ($request->hasFile('image')) {
            $filename = $request->file('image')->hashName();
            $image = $request->file('image')->storeAs('prizes', $filename, 'public');
        }
        Prize::create([
            'name' => $request->name,
            'image' => $image,
        ]);
        return to_route('admin.prize.index')->with('success', 'Created Successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return inertia('admin/prize/edit', [
            'prize' => Prize::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $prize = Prize::find($id);
        try {
            $prize->delete();
            return to_route('admin.prize.index')->with('success', 'Delete Successfully');
        } catch (\Throwable $th) {
            return to_route('admin.prize.index')->with('error', 'Delete Error');
        }
    }
}
