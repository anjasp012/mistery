import { useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler } from 'react'
import { ScaleLoader } from 'react-spinners';
import { Input } from '../ui/input';
import { SharedData } from '@/types';
import useSound from '@/hooks/use-sound';

type LoginForm = {
    username: string;
};

export default function LoginCard() {
    const { playSound } = useSound();
    const { themes } = usePage<SharedData>().props;
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('home.login'), {
            preserveScroll: true,
            onError: () => {
                playSound('error.wav')
            }
        });

    };

    return (
        <div data-aos="zoom-in" className="relative w-[30vh] md:w-[42.5vh] mx-auto">
            <img src="/box-login.png" className="select-none pointer-events-none w-full relative" alt="box" />
            <form onSubmit={submit} className="absolute top-1/2 inset-x-0 -translate-y-1/2 mx-auto space-y-[1vw] md:space-y-[.5vh] w-[25vh] md:w-[36vh]">
                <h3 className="font-utama text-center text-[2vh] md:text-[2.9vh] select-none pointer-events-none">Silahkan Login</h3>
                <input
                    required
                    type="text"
                    placeholder='Username...'
                    id="username"
                    name='username'
                    autoComplete='off'
                    tabIndex={1}
                    value={data.username}
                    onChange={(e) => setData('username', e.target.value)}
                    style={{ backgroundSize: '100% 100%' }}
                    className="text-center mx-auto w-full h-8 md:h-[6.5vh] px-3 md:px-5 py-0
               focus:outline-none focus:saturate-300 hover:saturate-300
               md:rounded-2xl
               placeholder:italic
               text-xs placeholder:text-xs md:text-lg md:placeholder:text-lg
               bg-[url('username-password-box.png')] bg-no-repeat"
                />
                <div className="flex">
                    <button disabled={processing} type="submit" className="w-[12vh] md:w-[20vh] mx-auto cursor-pointer group select-none">
                        {processing ?
                            <ScaleLoader
                                color="rgba(255, 255, 255, 0.8)"
                                height={'3.55vw'}
                                width={'.5vw'}
                            />
                            :
                            <img src={`/storage/${themes.login_button}`} className="w-full group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px" alt="login-button" />
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
