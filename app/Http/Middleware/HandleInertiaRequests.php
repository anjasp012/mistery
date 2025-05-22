<?php

namespace App\Http\Middleware;

use App\Models\Box;
use App\Models\Key;
use App\Models\Theme;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user()?->load('keys'),
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error')
            ],
            'themes' => fn() => Cache::rememberForever('theme', function () {
                return Theme::whereIn('slug', [
                    'sound_win',
                    'sound_empty',
                    'sound_error',
                    'sound_show',
                    'sound_hover',
                    'sound_click',
                    'slider_1',
                    'popup_win',
                    'popup_error',
                    'first_logo',
                    'second_logo',
                    'third_logo',
                    'google_logo',
                    'chat_disini_live',
                    'chat_disini_wa',
                    'main_disini',
                    'username_input',
                    'code_reedem_input',
                    'box_card',
                    'slider_card',
                    'slider_overlay_card',
                    'key_card',
                    'box_hover_card',
                    'claim_card',
                    'login_card',
                    'info_button',
                    'history_button',
                    'claim_button',
                    'back_button',
                    'logout_button',
                    'login_button',
                    'bg_mobile',
                    'bg_right',
                    'bg_left'
                ])->select('slug', 'file','link', 'is_active')->get()->keyBy('slug');
            })

        ];
    }
}
