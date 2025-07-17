import { router, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import { MoonLoader, RiseLoader } from 'react-spinners';
import ImageBoxOpened from './image-box-opened';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle } from '../ui/dialog';
import { SharedData } from '@/types';
import useSound from '@/hooks/use-sound';
import { useBoxStore } from '@/store/box-store';
import SpriteCanvas, { SpriteCanvasRef } from '../sprite';
import Spiner from '../spiner';
import BoxAnimation from '@/pages/box-animation';

type BoxProps = {
    box: any;
    i: any;
    key_id: string;
    prizes: {
        id: string,
        image: string,
    }[]
};

export default function Box({ prizes, box, key_id, i }: BoxProps) {

    const { themes, auth } = usePage<SharedData>().props;

    const selectedBox = useBoxStore(state => state.selectedBox);
    const thisKey = auth.user.keys.find(key => key.key.id === selectedBox.id);



    const { playSound } = useSound([
        `storage/${themes.sound_click.file}`,
        `storage/${themes.sound_win.file}`,
        `storage/${themes.sound_hover.file}`,
        `storage/${themes.sound_empty.file}`
    ]);
    const [boxShow, setBoxShow] = useState(false);
    const [openSlide, setOpenSlide] = useState(false);
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing } = useForm({
        is_open: box.is_open,
        key: null
    });
    const [errors, setErrors] = useState({
        key: null
    });

    const canvasRef = useRef<SpriteCanvasRef>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const [origin, setOrigin] = useState({ top: 0, left: 0, width: 0, height: 0 });

    const aosAnimations = [
        'fade-up-left',
        'fade-up',
        'fade-up-right',
        'fade-left',
        'zoom-in',
        'fade-right',
        'fade-down-left',
        'fade-down',
        'fade-down-right',
    ];
    const animation = aosAnimations[i];
    const distance = Math.abs(i - 4);
    const delay = distance * 50;
    const isOpened = data.is_open;

    useEffect(() => {
        AOS.init();
    }, [data]);

    // Fungsi buka box
    const openBox = () => {
        if (thisKey.amount > 0) {
            if (boxRef.current) {
                const rect = boxRef.current.getBoundingClientRect();
                setOrigin({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
            }
            setBoxShow(true);
        } else {
            setErrors({
                key: thisKey.key.image
            });
            setOpen(true);
            playSound(`storage/${themes.sound_empty.file}`);
        }
    };

    const [hasAnimated, setHasAnimated] = useState(isOpened);

    const handleAnimationStart = () => {
        setHasAnimated(true);
    };

    const handleAnimationEnd = () => {
        setTimeout(() => {
            setBoxShow(false);
            setOpenSlide(true);
            setData('is_open', true);
        }, 300);
    };

    const handleSpinerEnd = () => {
        setOpen(true);
        setOpenSlide(false);
        playSound(`storage/${themes.sound_win.file}`);
    };

    return (
        <AnimatePresence>
            <div
                onMouseEnter={() => playSound(`storage/${themes.sound_hover.file}`)}
                key={i}
                className={isOpened ? 'pointer-events-none' : 'group'}
                onClick={!isOpened ? () => {
                    playSound(`storage/${themes.sound_click.file}`);
                    openBox();
                } : undefined}
            >
                <motion.div
                    ref={boxRef}
                    data-aos={animation}
                    data-aos-delay={delay}
                    className={`relative aspect-square cursor-pointer rounded-xl transition-all duration-300 ease-in-ease-out ${isOpened ? 'translate-y-px' : 'group-hover:translate-y-px'
                        }`}
                >
                    {isOpened ? (
                        <>
                            <img
                                src={`/storage/${themes.box_hover_card.file}`}
                                alt={themes.box_hover_card.name}
                                className="w-full scale-117 absolute pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                        </>
                    ) : (
                        <>
                            <img
                                src={`/storage/${themes.box_card.file}`}
                                alt={themes.popup_win.name}
                                className="w-full absolute transition-all duration-100 opacity-100 group-hover:opacity-0 pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                            <img
                                src={`/storage/${themes.box_hover_card.file}`}
                                alt={themes.box_hover_card.name}
                                className="w-full scale-117 absolute transition-all duration-100 opacity-0 group-hover:opacity-100 pointer-events-none ease-in-ease-out select-none pointer-events-none"
                            />
                        </>
                    )}
                    <div
                        className={`${hasAnimated ? 'ps-2 pt-3 sm:ps-4 sm:pt-8' : 'pe-1 sm:pe-2 pt-2 sm:pt-6'
                            } transition-[padding] duration-500 ease-in-out relative z-9999 select-none pointer-events-none ${processing && 'blur-sm'
                            }`}
                    >
                        <SpriteCanvas
                            onAnimationStart={handleAnimationStart}
                            onAnimationEnd={handleAnimationEnd}
                            drawFrameIndex={isOpened ? 3 : 0}
                            ref={canvasRef}
                            imageSrc={`/storage/${selectedBox.image_box}`}
                        />
                    </div>

                    <h5
                        className={`text-white absolute inset-x-0 -bottom-[14px] sm:-bottom-[3vh] font-utama text-[8px] md:text-[2vh] text-center transition-all duration-100 select-none pointer-events-none ${isOpened
                            ? 'scale-105 translate-y-px'
                            : 'group-hover:scale-105 group-hover:translate-y-px group-hover:font-kedua'
                            }`}
                    >
                        <span className="text-sm md:text-[2.5vh]">K</span>otak
                        <span className="text-[#f37e1f]">
                            <span className="text-sm md:text-[2.5vh]"> M</span>isterius
                        </span>
                        <span className="text-sm md:text-[2.5vh]"> #{i + 1}</span>
                    </h5>
                </motion.div>
                {boxShow && (
                    <div className='fixed inset-0 z-30 bg-transparent backdrop-blur-xs'>
                      <motion.div
  className="fixed z-50"
  style={{
    willChange: 'transform, top, left, opacity',
    transformOrigin: 'center center',
    width: origin.width * 2.5,
    height: origin.height * 2,
  }}
  initial={{
    top: origin.top-0.4,
    left: origin.left,
    scale: 0.4,
    opacity: 0.5,
    filter: 'blur(10px)',
  }}
  animate={{
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    scale: 1,
    opacity: 1,
    filter: 'blur(0.1px)',
  }}
  exit={{
    scale: 0.8,
    opacity: 0,
  }}
  transition={{
    duration: 0.5,
    ease: [0.33, 1, 0.68, 1],
  }}
  onAnimationComplete={() => {
    post(route('home.openBox', { id: box.id, key_id: key_id }), {
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ['auth'] });
        canvasRef.current?.start();
      },
      onError: () => {
        setOpen(true);
        playSound(`storage/${themes.sound_empty.file}`);
      }
    });
  }}
>
  <div className="w-full h-full relative aspect-square cursor-pointer rounded-xl">
    <div className="relative w-full h-full z-9999 select-none pointer-events-none">
      <SpriteCanvas
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
        drawFrameIndex={isOpened ? 3 : 0}
        ref={canvasRef}
        imageSrc={`/storage/${selectedBox.image_box}`}
      />
    </div>
  </div>
</motion.div>


                    </div>
                )}
            </div>


            {/* Dialog spiner */}
            <Dialog open={openSlide} onOpenChange={setOpenSlide}>
                <DialogOverlay className="bg-transparent backdrop-blur-xs" />
                <DialogContent className="sm:max-w-7xl p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none focus:outline-none">
                    <div className="relative rounded-[100px]">
                        <img
                            loading="lazy"
                            src={`/storage/${themes.spiner_card.file}`}
                            className="select-none pointer-events-none w-full"
                            alt="box"
                        />
                        <div className="absolute flex my-auto inset-y-0 translate-middle-y inset-0 px-1 sm:px-2">
                            <Spiner box={box} prizes={prizes} onSpinerEnd={handleSpinerEnd} />
                        </div>
                        <div className="absolute top-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[80%] w-4/12 border-l-4 border-r-4 border-[#e49231]">
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[98%] w-px border border-2 border-[#e49231] rounded-sm
                            shadow-[0_0_8px_2px_rgba(228,146,49,0.7)]"></div>

                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog hasil box */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className="bg-transparent backdrop-blur-xs" />
                <DialogContent className="w-[80vw] sm:max-w-[60vh] p-0 border-none [&>button:first-of-type]:hidden bg-transparent shadow-none focus:outline-none">
                    {errors?.key ? (
                        <img
                            loading="lazy"
                            src={`/storage/${themes.popup_error.file}`}
                            alt={themes.popup_error.name}
                            className="w-full"
                        />
                    ) : (
                        <>
                            <div
                                className="w-[80px] sm:w-[18vh] transition-[padding] duration-500 ease-in-out absolute -top-2 end-0 sm:-top-3 sm:end-1 z-9999 select-none pointer-events-none"
                            >
                                <SpriteCanvas drawFrameIndex={0} imageSrc={`/storage/${selectedBox.image_box}`} />
                            </div>
                            <img
                                loading="lazy"
                                src={`/storage/${themes.popup_win.file}`}
                                alt={themes.popup_win.name}
                                className="w-full"
                            />
                        </>
                    )}
                    {errors?.key ? (
                        <div className="absolute inset-0 flex flex-col justify-center">
                            <div className="text-white flex justify-center gap-2 items-center text-center font-utama text-xs sm:text-lg">
                                Kunci <span><img loading="lazy" className="w-4 sm:w-6" src={`/storage/${errors?.key}`} alt={errors?.key} /></span> anda habis
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 flex flex-col justify-center">
                                <img loading="lazy" src={`/storage/${box.prize.image}`} alt={box.prize.image} className="w-50 sm:w-[38vh] mx-auto" />
                            </div>
                            <div className="absolute inset-x-0 bottom-5 sm:bottom-10">
                                <div className="text-white text-center font-utama text-xs sm:text-lg w-[76%] mx-auto italic">
                                    Selamat anda memenangkan {box.prize.name}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </AnimatePresence>
    );
}
