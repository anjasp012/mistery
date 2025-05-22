import { router, useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { PuffLoader } from "react-spinners";

import React, { useEffect, useState } from 'react'
import Box from './box';
import useSound from '@/hooks/use-sound';
import { useBoxStore } from '@/store/box-store';
import { SharedData } from '@/types';

type boxesProps = {
    id: number;
    is_open: boolean;
};


export default function NineBoxes() {
     const { themes } = usePage<SharedData>().props;
    const { playSound } = useSound([`storage/${themes.sound_show.file}`]);
    const [boxes, setBoxes] = useState<boxesProps[]>([]);
    const [loading, setLoading] = useState(true);
    const selectedBox = useBoxStore(state => state.selectedBox);



    useEffect(() => {
        setLoading(true); // mulai loading
        fetch(`/home/getNineBoxes/${selectedBox.id}`)
            .then(response => response.json())
            .then(data => {
                setBoxes(data);
                setLoading(false); // selesai loading
                playSound(`storage/${themes.sound_show.file}`)
            })
            .catch(error => {
                console.error('Gagal ambil data:', error);
                setLoading(false);
            });
    }, [selectedBox]);

    return (
        <>
            {loading
                ?
                <PuffLoader
                    color="rgba(255, 255, 255, 0.8)"
                    size={200}
                // loading={loading}
                />
                :
                <>
                    <div className="grid grid-cols-3 gap-5 sm:gap-[4vh] w-[95%] sm:w-[83vh] mx-auto mb-3 sm:mb-6">
                        {(boxes && boxes.length > 0 ? boxes : Array(9).fill({
                            id: 0,
                            key_id: selectedBox.id,
                            image: null,
                            prize: {
                                image: null
                            }
                        })).map((box, i) => (
                            <Box box={box} key_id={selectedBox.id} i={i} key={i} />
                        ))}


                    </div>
                </>
            }
        </>
    )
}
