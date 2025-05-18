import { router, useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { PuffLoader } from "react-spinners";

import React, { useEffect, useState } from 'react'
import Box from './box';

type selectedBoxProps = {
    selectedBox: any;
};

type openBoxForm = {
    openedBox: [];
};

type boxesProps = {
    id: number;
    is_open: boolean;
};


export default function NineBoxes({ selectedBox }: selectedBoxProps) {
    const [boxes, setBoxes] = useState<boxesProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // mulai loading
        fetch(`/home/getNineBoxes/${selectedBox.id}`)
            .then(response => response.json())
            .then(data => {
                setBoxes(data);
                setLoading(false); // selesai loading
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
                        {boxes.map((box, i) => {
                            return (
                                <Box box={box} i={i} selectedBox={selectedBox}/>
                            );
                        })}

                    </div>
                </>
            }
        </>
    )
}
