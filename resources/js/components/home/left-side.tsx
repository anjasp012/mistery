import React from 'react'
import LoginCard from './login-card'
import { usePage } from '@inertiajs/react';
import LogoutButton from './logout-button';
import { SharedData } from '@/types';
import ClaimCard from './claim-card';
import Silahkan from './silahkan';
import KembaliButton from './kembali-button';

type selectedBoxProps = {
    selectedBox: any;
    setSelectedBox: (boxId: string) => void;
};

export default function LeftSide({ selectedBox, setSelectedBox }: selectedBoxProps) {
    const { auth,themes } = usePage<SharedData>().props;


    return (
        <>
            <div
                className="relative w-[38.5vw] min-h-screen hidden lg:flex lg:flex-col bg-no-repeat"
                style={{
                    backgroundImage: `url('/storage/${themes.bg_left}')`,
                    backgroundSize: "100% 100%",
                }}
            >
                {auth.user && (
                    <>
                        <div className="absolute top-12 start-11 z-10">
                            <LogoutButton setSelectedBox={setSelectedBox} />
                        </div>
                        <div className="absolute top-12 end-10 z-10">
                            <LogoutButton setSelectedBox={setSelectedBox} />
                        </div>
                    </>
                )}


                <img src={`/storage/${themes.second_logo}`} alt="second_logo" className="select-none pointer-events-none w-[18vh] mx-auto mt-[7vh]" />
                <img src={`/storage/${themes.first_logo}`} alt="first_logo" className="select-none pointer-events-none w-[47vh] mx-auto mt-[0.1vh]" />


                {auth.user ? (
                    selectedBox ? (
                        <>
                            <Silahkan />
                            <KembaliButton setSelectedBox={setSelectedBox}/>
                        </>

                    ) : (
                        <ClaimCard />
                    )
                ) : (
                    <LoginCard />
                )}


                <div className="mt-auto mb-[7vh] w-full">
                    <h5 className="select-none pointer-events-none font-utama text-center text-[2vh] md:text-[3.2vh] italic mb-[0.4vh]">link <span className="text-[#fe9540]">aktif</span> saat ini</h5>
                    <img src={`/storage/${themes.google_logo}`} className="select-none pointer-events-none w-[38vh] mx-auto mb-[2.5vh]" alt="gggbet303.png" />
                    <div className="flex flex-col lg:flex-row lg:w-full gap-6 justify-center lg:items-center mb-[3vh]">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <img src="lb.png" alt="lb" className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <img src="wa.png" alt="wa" className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                            <img src="lc.png" alt="lc" className="w-[8.6vh] hover:scale-105 transition-all select-none" />
                        </a>
                    </div>
                    <img src={`/storage/${themes.third_logo}`} className="select-none pointer-events-none w-84 mx-auto" alt="18.png" />
                </div>
            </div>

        </>
    )
}
