import { useBoxStore } from '@/store/box-store';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import { ScaleLoader } from 'react-spinners';

export default function KembaliButton() {

    const [loading, setLoading] = useState(false);
    const { themes } = usePage<SharedData>().props;
    const setSelectedBox = useBoxStore(state => state.setSelectedBox);
    return (
        <button disabled={loading} data-aos="zoom-in" onClick={() => (setLoading(true), setSelectedBox(''))} type="button" className="mx-auto cursor-pointer group">
            {loading ?
            <ScaleLoader
                    color="rgba(255, 255, 255, 0.8)"
                    width={2}
                    height={17}
                />
            :
            <img loading='lazy' src={`/storage/${themes.back_button.file}`} className="w-[14vw] md:w-[5vw] group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px" alt="back-button" />
            }
        </button>
    )
}
