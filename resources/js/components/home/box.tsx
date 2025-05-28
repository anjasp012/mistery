import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'
import AOS from 'aos';
import { MoonLoader, RiseLoader } from 'react-spinners';
import ImageBoxOpened from './image-box-opened';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '../ui/dialog';
import { SharedData } from '@/types';
import useSound from '@/hooks/use-sound';
import { useBoxStore } from '@/store/box-store';
import SpriteCanvas, { SpriteCanvasRef } from '../sprite';

type BoxProps = {
    box: any;
    i: any;
    key_id: string;
};

export default function Box({ box, key_id, i }: BoxProps) {

    const { themes } = usePage<SharedData>().props;
    const selectedBox = useBoxStore(state => state.selectedBox);
    const { playSound } = useSound([`storage/${themes.sound_click.file}`, `storage/${themes.sound_win.file}`, `storage/${themes.sound_hover.file}`, `storage/${themes.sound_empty.file}`]);
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        is_open: box.is_open,
        key: null
    });
    // Tambahkan di atas
    const canvasRef = useRef<SpriteCanvasRef>(null);



    const aosAnimations = [
        'fade-up-left',
        'fade-up',
        'fade-up-right',
        'fade-left',
        'zoom-in',
        'fade-right',
        'fade-down-left',
        'fade-down',
        'fade-down-right',
    ];
    const animation = aosAnimations[i];
    const distance = Math.abs(i - 4);
    const delay = distance * 50;
    const isOpened = data.is_open;

    useEffect(() => {
        AOS.init();
    }, [data]);

    const openBox = () => {

        post(route('home.openBox', { id: box.id, key_id: key_id }), {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['auth'] })
                canvasRef.current?.start();
                playSound(`storage/${themes.sound_win.file}`)


                // setOpen(true)
            },
            onError: () => {
                setOpen(true)
                playSound(`storage/${themes.sound_empty.file}`)
            }
        });
    };

    const [hasAnimated, setHasAnimated] = useState(isOpened);

    const handleAnimationStart = () => {
        setHasAnimated(true);
    };

  const handleAnimationEnd = () => {
    setTimeout(() => {
        setData('is_open', true);
        setOpen(true);
    }, 300);
};

    return (
        <>
            <div
                onMouseEnter={() => playSound(`storage/${themes.sound_hover.file}`)}
                key={i}
                className={isOpened ? 'pointer-events-none' : 'group'}
                onClick={!isOpened ? () => (playSound(`storage/${themes.sound_click.file}`), openBox()) : undefined}
            >
                <div
                    data-aos={animation}
                    data-aos-delay={delay}
                    className={`relative aspect-square cursor-pointer rounded-xl transition-all duration-300 ease-in-ease-out ${isOpened ? 'translate-y-px' : 'group-hover:translate-y-px'
                        }`}
                >
                    {isOpened ? (
                        <>
                            <img
                                src={`/storage/${themes.box_hover_card.file}`}
                                alt={themes.box_hover_card.name}
                                className="w-full scale-117 absolute pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={`/storage/${themes.box_card.file}`}
                                alt={themes.popup_win.name}
                                className="w-full absolute transition-all duration-100 opacity-100 group-hover:opacity-0 pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                            <img
                                src={`/storage/${themes.box_hover_card.file}`}
                                alt={themes.box_hover_card.name}
                                className="w-full scale-117 absolute transition-all duration-100 opacity-0 group-hover:opacity-100 pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                        </>
                    )}
                    <div
                        className={`${hasAnimated ? 'ps-4 pt-8' : 'pe-2 pt-6'
                            } transition-[padding] duration-500 ease-in-out relative z-9999 select-none pointer-events-none ${processing && 'blur-sm'
                            }`}
                    >
                        <SpriteCanvas onAnimationStart={handleAnimationStart} onAnimationEnd={handleAnimationEnd} drawFrameIndex={isOpened ? 3 : 0} ref={canvasRef} imageSrc={`/storage/${selectedBox.image_box}`} />
                    </div>

                    <h5
                        className={`text-white absolute inset-x-0 -bottom-[14px] sm:-bottom-[3vh] font-utama text-[8px] md:text-[2vh] text-center transition-all duration-100 select-none pointer-events-none ${isOpened
                            ? 'scale-105 translate-y-px'
                            : 'group-hover:scale-105 group-hover:translate-y-px group-hover:font-kedua'
                            }`}
                    >
                        <span className="text-sm md:text-[2.5vh]">K</span>otak
                        <span className="text-[#f37e1f]">
                            <span className="text-sm md:text-[2.5vh]"> M</span>isterius
                        </span>
                        <span className="text-sm md:text-[2.5vh]"> #{i + 1}</span>
                    </h5>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="w-[80vw] sm:max-w-[60vh] p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none focus:outline-none">
                    {errors.key ?
                        <img loading='lazy' src={`/storage/${themes.popup_error.file}`} alt={themes.popup_error.name} className='w-full' />
                        :
                        <>
                        <div
                            className={`w-[80px] sm:w-[18vh] transition-[padding] duration-500 ease-in-out absolute top-0 end-3 sm:end-1 z-9999 select-none pointer-events-none`}
                        >
                            <SpriteCanvas drawFrameIndex={0} imageSrc={`/storage/${selectedBox.image_box}`} />
                        </div>
                            {/* <img loading='lazy' src={`/storage/${selectedBox.image_box}`} alt="box-flash.png" className='w-[80px] sm:w-[14vh] absolute top-0 end-3 sm:end-4' /> */}
                            <img loading='lazy' src={`/storage/${themes.popup_win.file}`} alt={themes.popup_win.name} className='w-full' />
                        </>
                    }
                    {errors.key ?
                        <div className='absolute inset-0 flex flex-col justify-center'>
                            <div className='text-white flex justify-center gap-2 items-center text-center font-utama text-xs sm:text-lg'>Kunci <span><img loading='lazy' className='w-4 sm:w-6' src={`/storage/${errors.key}`} alt={errors.key} /></span> anda habis</div>
                        </div>
                        :
                        <>
                            <div className='absolute inset-0 flex flex-col justify-center'>
                                <img loading='lazy' src={`/storage/${box.prize.image}`} alt={box.prize.image} className='w-30 sm:w-[24vh] mx-auto' />
                            </div>
                            <div className="absolute inset-x-0 bottom-5 sm:bottom-10">
                                <div className='text-white text-center font-utama text-xs sm:text-lg w-[76%] mx-auto italic'>
                                    Selamat anda memenangkan {box.prize.name}
                                </div>
                            </div>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
