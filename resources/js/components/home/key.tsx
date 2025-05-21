import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

export default function Key() {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="grid grid-cols-6 w-[95%] sm:w-[83vh] gap-2 sm:gap-x-[1.5vh]">
            {auth.user.keys.map((key, i)=> (
                <div key={i} data-aos="zoom-in" data-aos-delay={ i * 50 } className="col-span-1">
                    <div className="relative">
                        <img loading='lazy' src="/Box.png" alt="box" className="w-full select-none pointer-events-none" />
                        <div className="flex justify-center items-center absolute inset-0 w-[80%] sm:w-[60%] mx-auto my-auto">
                            <img loading='lazy' src={`/storage/${key.key.image}`} className="w-full select-none pointer-events-none" alt={key.key.image} />
                            <div className="text-white select-none pointer-events-none">x<span className="text-xs sm:text-xl">{ key.amount }</span></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
