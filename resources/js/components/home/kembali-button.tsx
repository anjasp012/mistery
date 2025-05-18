import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

type selectedBoxProps = {
    setSelectedBox: (boxId: string) => void;
};

export default function KembaliButton({ setSelectedBox }: selectedBoxProps) {
    const { themes } = usePage<SharedData>().props;
    return (
        <button data-aos="zoom-in" onClick={() => setSelectedBox('')} type="button" className="mx-auto cursor-pointer group">
            <img src={`/storage/${themes.back_button}`} className="w-[14vw] md:w-[5vw] group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px" alt="login-button" />
        </button>
    )
}
