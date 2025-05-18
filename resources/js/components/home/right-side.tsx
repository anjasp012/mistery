import React, { useState } from 'react'
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

type RightSideProps = {
    keys: any[];
    boxes: any[];
    selectedBox: any;
    setSelectedBox: (boxId: string) => void;
};

export default function RightSide({ selectedBox, setSelectedBox, boxes, keys }: RightSideProps) {
    const { auth, themes } = usePage<SharedData>().props;

    return (
        <div className="w-full lg:w-[61.5vw] min-h-screen flex flex-col relative px-4 py-0 bg-right"
        style={{
    backgroundImage: `url('/storage/${themes.bg_mobile}')`,
  }}
>
  <style>
    {`
      @media (min-width: 640px) {
        div.bg-right {
          background-image: url('/storage/${themes.bg_right}') !important;
        }
      }
    `}
  </style>
            <div className="mt-[2vh] md:hidden">
                {auth.user ? <>
                    <div className="absolute top-3 start-4 z-10">
                        <LogoutButton setSelectedBox={setSelectedBox} />
                    </div>
                    <div className="absolute top-3 end-4 z-10">
                        <LogoutButton setSelectedBox={setSelectedBox} />
                    </div>

                </> : ''}
                <img src={`/storage/${themes.second_logo}`} alt="second_logo" className="w-1/4 mx-auto mb-2 select-none pointer-events-none" />
                <img src={`/storage/${themes.first_logo}`} alt="first_logo" className="w-1/2 mx-auto select-none pointer-events-none" />
            </div>

            {selectedBox ?
                <>
                    <div className="flex flex-col mx-auto gap-y-[1vh] sm:gap-y-[2.5vh] items-center justify-center sm:h-screen py-3 sm:py-0">
                        <Key />
                        <div className="sm:hidden">
                            <Silahkan />
                        </div>
                        <NineBoxes selectedBox={selectedBox} />
                    </div>
                    <div className="sm:hidden text-center mt-2">
                        <KembaliButton setSelectedBox={setSelectedBox} />
                        <LinkAktif />
                    </div>
                </>
                :
                <>
                    <div className="flex flex-col gap-y-[2.5vh] items-center justify-center sm:h-screen py-3 sm:py-0">
                        <VoucherCard keys={keys}/>
                        <SixBoxes boxes={boxes} setSelectedBox={setSelectedBox} />
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
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        <img src="lb.png" alt="lb" className="w-[6vh] hover:scale-105 transition-all select-none"/>
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        <img src="wa.png" alt="wa" className="w-[6vh] hover:scale-105 transition-all select-none"/>
                    </a>
                    <a href="http://" target="_blank" rel="noopener noreferrer">
                        <img src="lc.png" alt="lc" className="w-[6vh] hover:scale-105 transition-all select-none"/>
                    </a>
                </div>
                <img src={`storage/${themes.third_logo}`} className="w-1/2 mx-auto select-none pointer-events-none" alt="18.png"/>
            </div>
        </div>
    )
}
