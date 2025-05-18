import React from 'react'

type ImageBoxProps = {
    image: string;
};

export default function ImageBoxOpened({image} : ImageBoxProps) {
    return (
        <img
            data-aos="zoom-in"
            src={image}
            alt="opened-box"
            className="w-full px-3 pt-4 sm:px-7 sm:pt-10 relative "
        />
    )
}
