import { router, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from '../ui/dialog';
import { ScaleLoader } from 'react-spinners';
import { SharedData } from '@/types';
import { Button } from '../ui/button';
import useSound from '@/hooks/use-sound';

type KlaimForm = {
    kode: string;
};

export default function ClaimCard() {
    const { themes,flash } = usePage<SharedData>().props;
    const { playSound } = useSound([`storage/${themes.sound_win.file}`,`storage/${themes.sound_error.file}`]);

    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<KlaimForm>>({
        kode: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('home.claim'), {
            onSuccess: () => {
                router.reload({ only: ['auth'] })
                setOpen(true);
                playSound(`storage/${themes.sound_win.file}`)
                reset()
            },
            onError: () => {
                setOpen(true);
                playSound(`storage/${themes.sound_error.file}`)
            },
        });
    };

    return (
        <>
            <div data-aos="zoom-in" className="relative w-[30vh] md:w-[42.5vh] mx-auto">
                <img loading='lazy' src={`/storage/${themes.claim_card.file}`} className="select-none pointer-events-none w-full relative" alt="box" />
                <form onSubmit={submit} className="absolute top-1/2 inset-x-0 -translate-y-1/2 mx-auto space-y-[1vw] md:space-y-[.5vh] w-[25vh] md:w-[36vh]">
                    <h3 className="text-white font-utama text-center text-[2vh] md:text-[2.9vh] select-none pointer-events-none">Masukan Kode dibawah</h3>
                    <input
                        required
                        type="text"
                        placeholder='Kode...'
                        name='kode'
                        id="kode"
                        tabIndex={1}
                        value={data.kode}
                        autoComplete={'off'}
                        onChange={(e) => setData('kode', e.target.value)}
                              style={{
                    backgroundImage: `url('/storage/${themes.code_reedem_input.file}')`,
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
                                <img loading='lazy' src={`/storage/${themes.claim_button.file}`} className="w-full group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px" alt="claim-button" />
                            }
                        </button>
                    </div>
                </form>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="w-[80vw] sm:max-w-[60vh] p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none">
                    {errors ?
                    <img loading='lazy' src={`/storage/${themes.popup_win.file}`} alt="box-flash.png" className='w-full' />
                    :
                    <img loading='lazy' src={`/storage/${themes.popup_error.file}`} alt="box-flash.png" className='w-full' />

                    }
                    {errors &&
                        <div className='absolute inset-0 flex flex-col justify-center'>
                                <div className='text-white text-center font-utama text-xs sm:text-lg w-10/12 mx-auto'>{errors.kode}</div>
                        </div>
                    }
                    {flash.success &&
                        <div className='absolute inset-0 flex flex-col justify-center'>
                            <img loading='lazy' src={`/storage/${flash.success.key.image}`} alt="{flash.success.key.image}" className='w-[16vh] sm:w-[30vh] mx-auto' />
                        </div>
                    }
                    {flash.success &&
                        <div className="absolute inset-x-0 bottom-10">
                            <div className='text-white text-center font-utama text-xs sm:text-lg w-8/12 mx-auto italic'>
                                Selamat anda mendapaatkan {flash.success.amount} buah Kunci
                            </div>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
