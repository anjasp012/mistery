<?php

namespace App\Http\Controllers;

use App\Models\Box;
use App\Models\Key;
use App\Models\Prize;
use App\Models\PrizeBox;
use App\Models\User;
use App\Models\UserBox;
use App\Models\UserKey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class HomeController extends Controller
{
    public function index() {
        if (auth()->check() && auth()->user()->role == 'ADMIN') {
            return redirect(route('admin.dashboard'));
        }
        $data = [
            'boxes' => Box::all(),
            'keys' => Key::all(),
        ];
        return inertia('home', $data);
    }

    public function login(Request $request) {
        $request->validate(['username' => 'required']);
        $user = User::whereRole('MEMBER')->where('username', $request->username)->first();
        if (!$user) {
            return back()->withErrors(['username' => 'Tidak ada user dengan username ' .$request->username]);
        }
        Auth::login($user);
        return to_route('home');
    }

    public function claim(Request $request) {
        $request->validate(['kode' => 'required']);
        $code = auth()->user()->codes()->where('code', $request->kode)->first();
        if (!$code) {
            return back()->withErrors(['kode' => 'Kode Salah']);
        }
        if ($code->is_reedem == true) {
            return back()->withErrors(['kode' => 'Kode Sudah Dipakai']);
        }
        $userKey = auth()->user()->keys->where('key_id', $code->key_id)->first();
        $updateAmount = $userKey->amount + $code->amount;
        $userKey->update([
            'amount' => $updateAmount,
        ]);
        $code->update([
            'is_reedem' => true
        ]);
        return back()->with('success', $code);
    }

    public function getBoxes() {
        $boxes = Box::all();
        return $boxes;
    }

    public function getNineBoxes($id) {
        $userBoxes = PrizeBox::where('user_box_id', $id)->with(['prize'])->select('id', 'is_open', 'prize_id')->get();
        return $userBoxes;
    }
    public function getPrizeList() {
        $Prizes = Prize::inRandomOrder()->get();
        return $Prizes;
    }

    public function getKeys() {
        $userKeys = collect();
        if (auth()->check()) {
            $userKeys = UserKey::with(['key'])->where('user_id', auth()->id())->get();
        }
        $keys = Key::all();
        $keys->each(function ($key) use ($userKeys) {
            $userKey = $userKeys->firstWhere('key_id', $key->id);
            $key->amount = $userKey ? $userKey->amount : 0;
        });

        return $keys;
    }

    public function openBox($id, $key_id) {
        $userKey = auth()->user()->keys->where('key_id', $key_id)->first();
        if ($userKey->amount == 0) {
                return back()->withErrors(['key' => $userKey->key->image]);
        }
        $prizeBox = PrizeBox::find($id);
        $userKey->update([
            'amount' => $userKey->amount - 1
        ]);
        $prizeBox->update([
            'is_open'=> true
        ]);
        return back();
    }
}
