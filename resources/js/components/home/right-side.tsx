import React, { useEffect, useState } from 'react'
import SixBoxes from './six-boxes'
import VoucherCard from './voucher-card'
import NineBoxes from './nine-boxes';
import KlaimCard from './claim-card';
import LoginCard from './login-card';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import Key from './key';
import LogoutButton from './logout-button';
import Silahkan from './silahkan';
import KembaliButton from './kembali-button';
import LinkAktif from './link-aktif';
import { useBoxStore } from '@/store/box-store';
import { useHistoryBoxStore } from '@/store/history-box-store';

type RightSideProps = {
    keys: any[];
    boxes: any[];
};

export default function RightSide({ boxes, keys }: RightSideProps) {
    const { auth, themes } = usePage<SharedData>().props;
    const selectedBox = useBoxStore(state => state.selectedBox);
    const setHistorySelectedBox = useHistoryBoxStore(state => state.setHistorySelectedBox);

    useEffect(() => {
        if (boxes.length > 0) {
            const box = boxes[Math.floor(Math.random() * boxes.length)];
            setHistorySelectedBox(box)
        }
    }, [boxes]);


    return (
        <div className="w-full lg:w-[61.5vw] min-h-screen flex flex-col relative px-4 py-0 bg-right"
            style={{
                backgroundImage: `url('/storage/${themes.bg_mobile.file}')`,
                backgroundSize: 'cover',
            }}
        >
            <style>
                {`
      @media (min-width: 64rem) {
        div.bg-right {
          background-image: url('/storage/${themes.bg_right.file}') !important;
        background-size: 100% 100% !important;
        }
      }
    `}
            </style>
            <div className="mt-[2vh] md:hidden">
                {auth.user ? <>
                    <div className="absolute top-3 start-4 z-10">
                        <LogoutButton />
                    </div>
                    <div className="absolute top-3 end-4 z-10">
                        <LogoutButton />
                    </div>

                </> : ''}
                <img loading='lazy' src={`/storage/${themes.second_logo.file}`} alt="second_logo" className="w-1/4 mx-auto mb-2 select-none pointer-events-none" />
                <img loading='lazy' src={`/storage/${themes.first_logo.file}`} alt="first_logo" className="w-1/2 mx-auto select-none pointer-events-none" />
            </div>

            {selectedBox ?
                <>
                    <div className="flex flex-col mx-auto gap-y-[1vh] sm:gap-y-[2.5vh] items-center justify-center sm:h-screen py-3 sm:py-0">
                        <Key />
                        <div className="sm:hidden">
                            <Silahkan />
                        </div>
                        <NineBoxes />
                    </div>
                    <div className="sm:hidden text-center mt-2">
                        <KembaliButton />
                        <LinkAktif />
                    </div>
                </>
                :
                <>
                    <div className="flex flex-col gap-y-[2.5vh] items-center justify-center sm:h-screen py-3 sm:py-0">
                        <VoucherCard keys={keys} />
                        <SixBoxes boxes={boxes} />
                    </div>
                    <div className="md:hidden">
                        {auth.user ?
                            <KlaimCard />
                            :
                            <LoginCard />
                        }
                    </div>
                </>
            }
            <div className="md:hidden mt-auto mb-[2vh]">
                <div className="flex flex-row lg:w-full gap-6 justify-center lg:items-center mb-[3vh]">
                    <a href={themes.main_disini.link} target="_blank" rel="noopener noreferrer">
                        <img loading='lazy' src={`/storage/${themes.main_disini.file}`} alt={themes.main_disini.name} className="w-[6vh] hover:scale-105 transition-all select-none" />
                    </a>
                    <a href={themes.chat_disini_wa.link} target="_blank" rel="noopener noreferrer">
                        <img loading='lazy' src={`/storage/${themes.chat_disini_wa.file}`} alt={themes.chat_disini_wa.name} className="w-[6vh] hover:scale-105 transition-all select-none" />
                    </a>
                    <a href={themes.chat_disini_live.link} target="_blank" rel="noopener noreferrer">
                        <img loading='lazy' src={`/storage/${themes.chat_disini_live.file}`} alt={themes.chat_disini_live.name} className="w-[6vh] hover:scale-105 transition-all select-none" />
                    </a>
                </div>
                <img loading='lazy' src={`storage/${themes.third_logo.file}`} className="w-1/2 mx-auto select-none pointer-events-none" alt="18.png" />
            </div>
        </div>
    )
}
