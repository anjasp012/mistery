import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog';
import useSound from '@/hooks/use-sound';

type SixBoxesProps = {
    boxes: any[];
    setSelectedBox: (boxId: string) => void;
};

export default function sixBoxes({ boxes, setSelectedBox }: SixBoxesProps) {
    const { playSound } = useSound();
    const [open, setOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <div className="grid grid-cols-3 gap-5 sm:gap-[4vh] w-[95%] sm:w-[81.5vh] mx-auto">
                {boxes?.map((box, i) => (

                    <div onMouseEnter={() => playSound('/hover.wav')} onClick={() => auth.user ? (setSelectedBox(box), playSound('/click.wav')) : (setOpen(true), playSound('empty.wav'))} key={i} data-aos="zoom-in" className="group ">
                        <div className="aspect-square cursor-pointer relative rounded-xl group-hover:translate-y-px transition-all duration-300 ease-in-ease-out">

                            <img src="/kotak-chest.png" alt="kotak-chest" className="w-full absolute transition-all duration-100 opacity-100 group-hover:opacity-0 select-none pointer-events-none ease-in-ease-out" />

                            <img src="/kotak-chest-hover.png" alt="kotak-chest-hover" className="w-full scale-117 absolute transition-all duration-100 opacity-0 group-hover:opacity-100 select-none pointer-events-none ease-in-ease-out" />

                            <img src="/Icon-Tanda-Tanya.png" className="absolute z-20 sm:-top-4 sm:-end-5 sm:w-[8vh] w-9 -end-3 -top-3 select-none pointer-events-none" alt="/Icon-Tanda-Tanya.png" />

                            <img src={`/storage/${box.image_box}`} className="w-full px-3 pt-4 sm:px-7 sm:pt-10 relative select-none pointer-events-none" alt={box.image_box} />
                            <h5
                                className={`absolute inset-x-0 -bottom-[14px] sm:-bottom-[3vh] font-utama text-[8px] md:text-[2vh] text-center transition-all duration-100 group-hover:scale-105 group-hover:translate-y-px group-hover:font-kedua select-none pointer-events-none`}
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
                    <img src="/box-flash.png" alt="box-flash.png" className='w-full select-none' />
                        <div className='absolute inset-0 flex flex-col justify-center'>
                            <div className='flex justify-center gap-2 items-center text-center font-utama text-xl'>Silahkan Login Terlebih dahulu</div>
                        </div>
                </DialogContent>
            </Dialog>
        </>

    )
}
