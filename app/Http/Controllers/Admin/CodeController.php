<?php

namespace App\Http\Controllers\Admin;

use App\Models\Code;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CodeResource;
use App\Models\Key;
use App\Models\User;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         return inertia('admin/code-reedem/index', [
            'codes' => CodeResource::collection(Code::query()
                ->when($request->has('search'), function ($q) use ($request) {
                    $search = $request->input('search');
                    $q->where('code', 'like', "%" . Str::lower(trim($search)) . "%");
                })
                ->orderBy('created_at', 'desc')
                ->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/code-reedem/create',[
            'members' => User::whereRole('MEMBER')->get(),
            'keys' => Key::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'code' => 'required',
            'key_id' => 'required',
            'amount' => 'required',
        ]);

        Code::create($request->all());
        return to_route('admin.code-reedem.index')->with('success', 'Created Successfully');
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
         return inertia('admin/code-reedem/edit',[
            'members' => User::whereRole('MEMBER')->get(),
            'keys' => Key::all(),
            'code' => Code::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
           $request->validate([
            'user_id' => 'required',
            'code' => 'required',
            'key_id' => 'required',
            'amount' => 'required',
        ]);
        $code = Code::find($id);
        $code->update($request->all());
        return to_route('admin.code-reedem.index')->with('success', 'Update Successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $code = Code::find($id);
        $code->delete();
        return to_route('admin.code-reedem.index')->with('success', 'Delete Successfully');

    }
}
