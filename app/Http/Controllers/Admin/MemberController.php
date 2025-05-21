<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MemberResource;
use App\Models\Box;
use App\Models\Key;
use App\Models\Prize;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return inertia('admin/member/index', [
            'members' => MemberResource::collection(User::whereRole('MEMBER')
                ->when($request->has('search'), function ($q) use ($request) {
                    $search = $request->input('search');
                    $q->where('username', 'like', "%" . Str::lower(trim($search)) . "%");
                })
                ->orderBy('username')
                ->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/member/create', [
            'prizes' => Prize::all(),
            'boxes' => Box::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_boxes.*.prize_id' => 'required'
        ], [
            'user_boxes.*.prize_id' => 'Prize Field Required'
        ]);

        $member = User::create([
            'name' => $request->username,
            'username' => $request->username,
        ]);
        $member->boxes()->createMany($request->user_boxes);
        $keys = Key::get();
        $member->keys()->createMany(
            $keys->map(function ($key) {
                return [
                    'key_id' => $key->id,
                    'amount' => 0,
                ];
            })->toArray()
        );

        return to_route('admin.member.index')->with('success', 'Created Successfuly');
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
        //
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
        $member = User::find($id);
        $member->delete();
        return back()->with('success', 'Delete Successfuly');
    }
}
