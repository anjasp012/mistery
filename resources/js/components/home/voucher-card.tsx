import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function VoucherCard({keys}: any[]) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div data-aos="zoom-in" className="relative w-[93%] sm:w-[92.1vh] h-auto">
            <img src="/box-gacha.png" alt="box-gacha.png" className="w-full h-auto select-none pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2">
                <div className="grid grid-cols-6 md:grid-cols-12 mx-auto gap-6 sm:gap-8 items-center overflow-hidden w-[95%]">
                    <div className="col-span-2 md:col-span-4">
                        <img src="/Silver-2.png" className="w-full select-none pointer-events-none" alt="silver-2" />
                    </div>
                    <div className="col-span-4 md:col-span-8">
                        <div className="flex flex-col g-0">
                            <div className="relative">
                                <img src="/kotak-gacha.png" className="w-full h-auto select-none pointer-events-none" alt="kotak-gacha.png" />
                                {/* <div className="absolute inset-0 sm:w-[95%] mx-auto my-auto content-center">
                            <div className="owl-carousel owl-theme">
                                <div className="item">
                                    <img src="/Voucher.png" className="w-full h-full" alt="voucher"/>
                                </div>
                                <div className="item">
                                    <img src="/Voucher.png" className="w-full h-full" alt="voucher"/>
                                </div>
                                <div className="item">
                                    <img src="/Voucher.png" className="w-full h-full" alt="voucher"/>
                                </div>
                                <div className="item">
                                    <img src="/Voucher.png" className="w-full h-full" alt="voucher"/>
                                </div>
                            </div>
                        </div> */}
                            </div>
                            <div className="grid grid-cols-6 gap-2 sm:gap-[1.5vh]">
                                {auth.user ?
                                    <>
                                        {auth.user.keys?.map((key, i) => (
                                            <div key={i} className="col-span-1">
                                                <div className="relative">
                                                    <img src="box.png" alt="box" className="w-full select-none pointer-events-none" />
                                                    <div className="flex justify-center items-center absolute inset-0 w-[70%] mx-auto my-auto">
                                                        <img data-aos="zoom-in" src={`/storage/${key.key.image}`} className="w-full select-none pointer-events-none" alt={key.key.image} />
                                                        <div data-aos="zoom-in" className="text-[6px] sm:text-normal text-white select-none pointer-events-none">x<span className="text-[8px] sm:text-xl">{key.amount}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>

                                    : <>
                                        {keys?.map((key) => (
                                            <div key={key.id} className="col-span-1">
                                                <div className="relative">
                                                    <img src="box.png" alt="box" className="w-full" />
                                                    <div className="flex justify-center items-center absolute inset-0 w-[70%] mx-auto my-auto">
                                                        <img data-aos="zoom-in" src={`/storage/${key.image}`} className="w-[65%]" alt={key.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
