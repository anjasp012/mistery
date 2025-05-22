import React from 'react'
import LoginCard from './login-card'
import { usePage } from '@inertiajs/react';
import LogoutButton from './logout-button';
import { SharedData } from '@/types';
import ClaimCard from './claim-card';
import Silahkan from './silahkan';
import KembaliButton from './kembali-button';
import { useBoxStore } from '@/store/box-store';
import { useHistoryBoxStore } from '@/store/history-box-store';

export default function LeftSide() {
    const { auth,themes } = usePage<SharedData>().props;
    const selectedBox = useBoxStore(state => state.selectedBox);

    return (
        <>
            <div
                className="relative w-[38.5vw] min-h-screen hidden lg:flex lg:flex-col bg-no-repeat"
                style={{
                    backgroundImage: `url('/storage/${themes.bg_left.file}')`,
                    backgroundSize: "100% 100%",
                }}
            >
                {auth.user && (
                    <>
                        <div className="absolute top-12 start-11 z-10">
                            <LogoutButton />
                        </div>
                        <div className="absolute top-12 end-10 z-10">
                            <LogoutButton />
                        </div>
                    </>
                )}


                <img loading='lazy' src={`/storage/${themes.second_logo.file}`} alt="second_logo" className="select-none pointer-events-none w-[18vh] mx-auto mt-[7vh]" />
                <img loading='lazy' src={`/storage/${themes.first_logo.file}`} alt="first_logo" className="select-none pointer-events-none w-[47vh] mx-auto mt-[0.1vh]" />


                {auth.user ? (
                    selectedBox ? (
                        <>
                            <Silahkan />
                            <KembaliButton/>
                        </>

                    ) : (
                        <ClaimCard />
                    )
                ) : (
                    <LoginCard />
                )}


                <div className="mt-auto mb-[7vh] w-full">
                    <h5 className="text-white select-none pointer-events-none font-utama text-center text-[2vh] md:text-[3.2vh] italic mb-[0.4vh]">link <span className="text-[#fe9540]">aktif</span> saat ini</h5>
                    <img loading='lazy' src={`/storage/${themes.google_logo.file}`} className="select-none pointer-events-none w-[38vh] mx-auto mb-[2.5vh]" alt="gggbet303.png" />
                    <div className="flex flex-col lg:flex-row lg:w-full gap-6 justify-center lg:items-center mb-[3vh]">
                        <a href={themes.main_disini.link} target="_blank" rel="noopener noreferrer">
                            <img loading='lazy' src={`/storage/${themes.main_disini.file}`} alt={themes.main_disini.name} className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                        <a href={themes.chat_disini_wa.link} target="_blank" rel="noopener noreferrer">
                            <img loading='lazy' src={`/storage/${themes.chat_disini_wa.file}`} alt={themes.chat_disini_wa.name} className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                        <a href={themes.chat_disini_live.link} target="_blank" rel="noopener noreferrer">
                            <img loading='lazy' src={`/storage/${themes.chat_disini_live.file}`} alt={themes.chat_disini_live.name} className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                    </div>
                    <img loading='lazy' src={`/storage/${themes.third_logo.file}`} className="select-none pointer-events-none w-84 mx-auto" alt="18.png" />
                </div>
            </div>

        </>
    )
}
