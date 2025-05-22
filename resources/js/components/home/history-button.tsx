import useSound from '@/hooks/use-sound';
import { useBoxStore } from '@/store/box-store';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { Dialog, DialogContent, DialogOverlay } from '../ui/dialog';

export default function HistoryButton() {

    const setSelectedBox = useBoxStore(state => state.setSelectedBox);
    const { themes } = usePage<SharedData>().props;
    const { playSound } = useSound([`storage/${themes.sound_show.file}`]);
    const [histories, setHistories] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingOpenList, setLoadingOpenList] = useState(false);
    const handleHistory = () => {
        setLoadingOpenList(true);
        setLoading(true); // mulai loading
        fetch(`/home/getHistories`)
            .then(response => response.json())
            .then(data => {
                setHistories(data);
                setLoading(false); // selesai loading
                playSound(`storage/${themes.sound_show.file}`)
                setLoadingOpenList(false);
                setOpen(true);
            })
            .catch(error => {
                console.error('Gagal ambil data:', error);
                setLoading(false);
                setLoadingOpenList(false);
            });
    };

    return (
        <>
            <button
                data-aos="zoom-in"
                onClick={handleHistory}
                className="mx-auto cursor-pointer w-[14vw] md:w-[5vw] group"
            >
                {loading ?
                    <ScaleLoader
                        color="rgba(255, 255, 255, 0.8)"
                        width={2}
                        height={17}
                    />
                    :
                    <img loading='lazy'
                        src={`/storage/${themes.history_button.file}`}
                        className="w-full group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px"
                        alt="logout-button"
                    />
                }
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogOverlay className='bg-transparent backdrop-blur-xs' />
                <DialogContent className="select-none focus:outline-none w-[80vw] sm:max-w-[100vh] aspect-square p-0 border-none [&>button:first-of-type]:top-6 [&>button:first-of-type]:sm:top-15 [&>button:first-of-type]:end-8 [&>button:first-of-type]:sm:end-20 [&>button:first-of-type]:text-white bg-transparent shadow-none">
                    <img loading='lazy' src={`/storage/${themes.popup_win.file}`} alt="box-flash.png" className='w-full select-none' />
                    <div className='absolute inset-0 flex flex-col justify-center'>
                        <h5 className='text-white text-center mb-4 font-utama'>
                            Histori Hadiah
                        </h5>
                        {loadingOpenList ? 'Loading...' : <div className='font-utama text-xs sm:text-lg h-[76%] w-[76%] mx-auto overflow-y-scroll'>
                            <div>
                                <div className="grid grid-cols-3 gap-5">
                                    {histories?.map((history, index) => (
                                        <div key={index}>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`/storage/${history.prize.image}`}
                                                    alt={history.prize.name}
                                                    className="w-4 h-4 sm:w-12 sm:h-12 object-cover rounded-full"
                                                />
                                                <span className="text-xs sm:text-normal font-bold text-white">{history.prize.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
