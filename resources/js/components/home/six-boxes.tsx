import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog';
import useSound from '@/hooks/use-sound';
import { useBoxStore } from '@/store/box-store';
import { useHistoryBoxStore } from '@/store/history-box-store';
import SpriteCanvas from '../sprite';

type SixBoxesProps = {
    boxes: any[];
};

export default function sixBoxes({ boxes }: SixBoxesProps) {
    const [prizes, setPrizes] = useState();
    const [loadingOpenList, setLoadingOpenList] = useState(false);
    const [openList, setOpenList] = useState(false);

    const { auth, themes } = usePage<SharedData>().props;
    const { playSound } = useSound([`storage/${themes.sound_click.file}`, `storage/${themes.sound_hover.file}`, `storage/${themes.sound_empty.file}`, `storage/${themes.sound_show.file}`]);
    const [open, setOpen] = useState(false);
    const setSelectedBox = useBoxStore(state => state.setSelectedBox);
    const setHistorySelectedBox = useHistoryBoxStore(state => state.setHistorySelectedBox);

    const openPrizeList = (id: string) => {
        setLoadingOpenList(true);
        fetch(`/home/getPrizeList`)
            .then(response => response.json())
            .then(data => {
                setPrizes(data);
                setOpenList(true);
                playSound(`storage/${themes.sound_show.file}`)
            })
            .catch(error => {
                console.error('Gagal ambil data:', error);
            });
        setLoadingOpenList(false)

    }


    return (
        <>
            <div className="grid grid-cols-3 gap-5 sm:gap-[4vh] w-[95%] sm:w-[81.5vh] mx-auto">
                {boxes?.map((box, i) => (

                    <div onMouseEnter={() => playSound(`storage/${themes.sound_hover.file}`)} key={i} data-aos="zoom-in" className="group hover:translate-y-px transition-all duration-300 ease-in-ease-out">
                        <div className='absolute z-[9999] -end-3 -top-3 sm:-top-4 sm:-end-5 cursor-pointer active:translate-y-px' onClick={(e) => auth.user ? (openPrizeList(box.id), playSound(`storage/${themes.sound_click.file}`)) : (setOpen(true), playSound(`storage/${themes.sound_empty.file}`))}>
                            <img loading='lazy' src={`/storage/${themes.info_button.file}`} className={`sm:w-[8vh] w-9 select-none pointer-events-none`} alt={themes.info_button.name} />
                        </div>
                        <div onClick={() => auth.user ? (playSound(`storage/${themes.sound_click.file}`), setSelectedBox(box), setHistorySelectedBox(box)) : (setOpen(true), playSound(`storage/${themes.sound_empty.file}`))} className="aspect-square cursor-pointer rounded-xl">

                            <img loading='lazy' src={`/storage/${themes.box_card.file}`} alt={themes.box_card.name} className="w-full absolute transition-all duration-100 opacity-100 group-hover:opacity-0 select-none pointer-events-none ease-in-ease-out" />

                            <img loading='lazy' src={`/storage/${themes.box_hover_card.file}`} alt={themes.box_hover_card.name} className="w-full scale-117 absolute transition-all duration-100 opacity-0 group-hover:opacity-100 select-none pointer-events-none ease-in-ease-out" />

                            <div
                                className={`pe-1 sm:pe-2 pt-2 sm:pt-6 transition-[padding] duration-500 ease-in-out relative z-9999 select-none pointer-events-none`}
                            >
                                <SpriteCanvas drawFrameIndex={0} imageSrc={`/storage/${box.image_box}`} />
                            </div>
                            {/* <img loading='lazy' src={`/storage/${box.image_box}`} className="w-full px-3 pt-4 sm:px-7 sm:pt-10 relative select-none pointer-events-none" alt={box.image_box} /> */}
                            <h5
                                className={`text-white absolute inset-x-0 -bottom-[14px] sm:-bottom-[3vh] font-utama text-[8px] md:text-[2vh] text-center transition-all duration-100 group-hover:scale-105 group-hover:translate-y-px group-hover:font-kedua select-none pointer-events-none`}
                            >
                                <span className="text-sm md:text-[2.5vh]">K</span>otak
                                <span> {box.name}</span>
                            </h5>
                        </div>
                    </div>
                ))}

            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="select-none focus:outline-none w-[80vw] sm:max-w-[60vh] p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none">
                    <img loading='lazy' src={`/storage/${themes.popup_error.file}`} alt="box-flash.png" className='w-full select-none' />
                    <div className='absolute inset-0 flex flex-col justify-center'>
                        <div className='text-white flex justify-center gap-2 items-center text-center font-utama text-xs sm:text-lg'>Silahkan Login Terlebih dahulu</div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={openList} onOpenChange={setOpenList}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="select-none focus:outline-none w-[80vw] sm:max-w-[100vh] aspect-square p-0 border-none [&>button:first-of-type]:top-6 [&>button:first-of-type]:sm:top-15 [&>button:first-of-type]:end-8 [&>button:first-of-type]:sm:end-20 [&>button:first-of-type]:text-white bg-transparent shadow-none">
                    <img loading='lazy' src={`/storage/${themes.popup_win.file}`} alt="box-flash.png" className='w-full select-none' />
                    <div className='absolute inset-0 flex flex-col justify-center'>
                        <h5 className='text-white text-center mb-4 font-utama'>
                            List Hadiah
                        </h5>
                        {loadingOpenList ? 'Loading...' : <div className='font-utama text-xs sm:text-lg h-[76%] w-[76%] mx-auto overflow-y-scroll'>
                            <div>
                                <div className="grid grid-cols-3 gap-5">
                                    {prizes?.map((prize, index) => (
                                        <div key={index}>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`/storage/${prize.image}`}
                                                    alt={prize.name}
                                                    className="w-4 h-4 sm:w-12 sm:h-12 object-cover rounded-full"
                                                />
                                                <span className="text-xs sm:text-normal font-bold text-white">{prize.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>





                            </div>
                        </div>}
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}
