import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

export default function LinkAktif() {
    const { themes } = usePage<SharedData>().props;
  return (
    <div data-aos="zoom-in">
    <h5 className="text-white font-utama text-center text-[2vh] md:text-[3.2vh] italic mb-[0.4vh] select-none pointer-events-none">link <span className="text-[#fe9540]">aktif</span> saat ini</h5>
    <img loading='lazy' src={`/storage/${themes.google_logo.file}`} className="w-[20vh] mx-auto mb-[1.5vh] select-none pointer-events-none" alt="gggbet303.png"/>
</div>

  )
}
