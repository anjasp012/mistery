import { useBoxStore } from '@/store/box-store';
import { SharedData } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default function LogoutButton() {

    const setSelectedBox = useBoxStore(state => state.setSelectedBox);
    const { themes } = usePage<SharedData>().props;
    const { post, processing } = useForm();
    const handleLogout = () => {
        post(route('logout'), {
            onSuccess: () => {
                setSelectedBox('');
            },
        });
    };

    return (
        <button
            data-aos="zoom-in"
            onClick={handleLogout}
            className="mx-auto cursor-pointer w-[14vw] md:w-[5vw] group"
        >
            {processing ?
                <ScaleLoader
                    color="rgba(255, 255, 255, 0.8)"
                    width={2}
                    height={17}
                />
                :
                <img loading='lazy'
                    src={`/storage/${themes.logout_button}`}
                    className="w-full group-hover:saturate-120 group-focus:translate-x-px group-focus:translate-y-px"
                    alt="logout-button"
                />
            }
        </button>
    );
}
