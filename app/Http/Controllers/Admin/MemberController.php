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
use Illuminate\Validation\Rule;

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
            'user_boxes.*.prize_boxes.*.prize_id' => ['required', 'integer', Rule::exists('prizes', 'id')],
        ], [
            'user_boxes.*.prize_boxes.*.prize_id' => 'Prize Field Required'
        ]);


        $member = User::create([
            'name' => $request->username,
            'username' => $request->username,
        ]);
        foreach ($request->user_boxes as $box) {
            $user_box = $member->boxes()->create([
                'box_id'    => $box['box_id'],
                'key_id'    => $box['box_id'],
                'is_active' => $box['is_active'],
            ]);

            if ($user_box->is_active && !empty($box['prize_boxes'])) {
                $user_box->prizes()->createMany($box['prize_boxes']);
            }
        }

        $member->keys()->createMany(
            Key::all()->map(fn($key) => [
                'key_id' => $key->id,
                'amount' => 0,
            ])->toArray()
        );

        return to_route('admin.member.index')->with('success', 'Created Successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('admin/member/show', [
            'prizes' => Prize::all(),
            'boxes' => Box::all(),
            'member' => User::with('boxes.prizes.prize')->find($id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return inertia('admin/member/edit', [
            'prizes' => Prize::all(),
            'boxes' => Box::all(),
            'member' => User::with('boxes')->find($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $member = User::find($id);
        $request->validate([
            'user_boxes.*.prize_boxes.*.prize_id' => ['required', 'integer', Rule::exists('prizes', 'id')],
        ], [
            'user_boxes.*.prize_boxes.*.prize_id' => 'Prize Field Required'
        ]);
        foreach ($request->user_boxes as $boxData) {
            $userBox = $member->boxes()->where('id', $boxData['id'])->first();
            $userBox->update([
                'is_active' => $boxData['is_active'] ? 1 : 0
            ]);
            foreach ($boxData['prize_boxes'] ?? [] as $prizeBox) {
                if (isset($prizeBox['id'])) {
                    // Update prize yang sudah ada
                    $userBox->prizes()->where('id', $prizeBox['id'])->update([
                        'prize_id' => $prizeBox['prize_id'],
                        'is_open' => $prizeBox['is_open']
                    ]);
                } else {
                    // Tambah prize baru
                    $userBox->prizes()->create([
                        'prize_id' => $prizeBox['prize_id'],
                        'is_open' => $prizeBox['is_open']
                    ]);
                }
            }

        }

        return to_route('admin.member.index')->with('success', 'Update Successfully');
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
