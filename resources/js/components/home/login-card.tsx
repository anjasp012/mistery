import { useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react'
import { ScaleLoader } from 'react-spinners';
import { Input } from '../ui/input';
import { SharedData } from '@/types';
import useSound from '@/hooks/use-sound';
import { Dialog, DialogContent, DialogOverlay } from '../ui/dialog';

type LoginForm = {
    username: string;
};

export default function LoginCard() {
    const { themes } = usePage<SharedData>().props;
    const { playSound } = useSound([`storage/${themes.sound_error.file}`]);
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('home.login'), {
            preserveScroll: true,
            onError: () => {
                playSound(`storage/${themes.sound_error.file}`)
                setOpen(true)
            }
        });

    };

    return (
        <>
            <div data-aos="zoom-in" className="relative w-[30vh] md:w-[42.5vh] mx-auto">
                <img loading='lazy' src={`/storage/${themes.login_card.file}`} className="select-none pointer-events-none w-full relative" alt="box" />
                <form onSubmit={submit} className="absolute top-1/2 inset-x-0 -translate-y-1/2 mx-auto space-y-[1vw] md:space-y-[.5vh] w-[25vh] md:w-[36vh]">
                    <h3 className="text-white font-utama text-center text-[2vh] md:text-[2.9vh] select-none pointer-events-none">Silahkan Login</h3>
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
                        style={{
                    backgroundImage: `url('/storage/${themes.username_input.file}')`,
                    backgroundSize: "100% 100%",
                }}
                        className="text-white text-center mx-auto w-full h-8 md:h-[6.5vh] px-3 md:px-5 py-0
               focus:outline-none focus:saturate-300 hover:saturate-300
               md:rounded-2xl
               placeholder:italic
               text-xs placeholder:text-xs md:text-lg md:placeholder:text-lg
            bg-no-repeat"
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
                                <img loading='lazy' src={`/storage/${themes.login_button.file}`} className="w-full group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px" alt="login-button" />
                            }
                        </button>
                    </div>
                </form>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="select-none focus:outline-none w-[80vw] sm:max-w-[60vh] p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none">
                    <img loading='lazy' src={`/storage/${themes.popup_error.file}`} alt="box-flash.png" className='w-full select-none' />
                    <div className='absolute inset-0 flex flex-col justify-center'>
                        <div className='text-white flex justify-center gap-2 items-center text-center font-utama text-xs sm:text-lg w-[80%] mx-auto'>{errors.username}</div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
