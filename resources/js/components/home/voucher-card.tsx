import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from "embla-carousel";
import { useHistoryBoxStore } from "@/store/history-box-store";
import SpriteCanvas from "../sprite";

export default function VoucherCard({ keys }: any[]) {
    const { auth, themes } = usePage<SharedData>().props;
    const options: EmblaOptionsType = { loop: true }
    const historySelectedBox = useHistoryBoxStore(state => state.historySelectedBox);
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])


    return (
        <div data-aos="zoom-in" className="relative w-[93%] sm:w-[92.1vh] h-auto">
            <img loading="lazy" src={`/storage/${themes.slider_card.file}`} alt={themes.slider_card.file} className="w-full h-auto select-none pointer-events-none" />
            <div className="absolute top-1/2 -translate-y-1/2">
                <div className="grid grid-cols-6 md:grid-cols-12 mx-auto gap-6 sm:gap-8 items-center overflow-hidden w-[95%]">
                    <div className="col-span-2 md:col-span-4">
                        <div
                            className={`w-full transition-[padding] duration-500 ease-in-out relative z-9999 select-none pointer-events-none`}
                        >
                            <SpriteCanvas drawFrameIndex={3} imageSrc={`/storage/${historySelectedBox.image_box}`} />
                        </div>
                    </div>
                    <div className="col-span-4 md:col-span-8">
                        <div className="flex flex-col g-0">
                            <div className="relative">
                                <img loading="lazy" src={`/storage/${themes.slider_overlay_card.file}`} className="w-full h-full select-none pointer-events-none" alt="kotak-gacha.png" />
                                <div className="absolute inset-0 h-full w-full flex px-3">
                                    <div className="embla">
                                        <div className="embla__viewport" ref={emblaRef}>
                                            <div className="embla__container">
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                                <div className="embla__slide">
                                                    <div className="embla__slide__item">
                                                        <img src="/Voucher.png" alt="Voucher.png" className="w-full" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-6 gap-2 sm:gap-[1.5vh]">
                                {auth.user ?
                                    <>
                                        {auth.user.keys?.map((key, i) => (
                                            <div key={i} className="col-span-1">
                                                <div className="relative">
                                                    <img loading="lazy" src={`/storage/${themes.key_card.file}`} alt={themes.key_card.name} className="w-full select-none pointer-events-none" />
                                                    <div className="flex justify-center items-center absolute inset-0 w-[70%] mx-auto my-auto">
                                                        <img loading="lazy" data-aos="zoom-in" src={`/storage/${key.key.image}`} className="w-full select-none pointer-events-none" alt={key.key.image} />
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
                                                    <img loading="lazy" src={`/storage/${themes.key_card.file}`} alt={themes.key_card.name} className="w-full" />
                                                    <div className="flex justify-center items-center absolute inset-0 w-[70%] mx-auto my-auto">
                                                        <img loading="lazy" data-aos="zoom-in" src={`/storage/${key.image}`} className="w-[65%]" alt={key.image} />
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
