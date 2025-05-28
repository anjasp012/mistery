import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

export default function Key() {
    const { auth,themes } = usePage<SharedData>().props;
    return (
                    <div className="relative">
                        <img loading='lazy' src={`/storage/${themes.key_card.file}`} alt="box" className="w-full select-none pointer-events-none" />
                        <div className="flex justify-center items-center absolute inset-0 w-[80%] sm:w-[60%] mx-auto my-auto">
                            {/* <img loading='lazy' src={`/storage/${key.key.image}`} className="w-full select-none pointer-events-none" alt={key.key.image} /> */}
                            {/* <div className="text-white select-none pointer-events-none">x<span className="text-xs sm:text-xl">{ key.amount }</span></div> */}
                            Unlock
                        </div>
                    </div>
    )
}
