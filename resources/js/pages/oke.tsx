import React from 'react'
import BoxAnimation from './box-animation'

export default function Oke() {
    return (
        <div className="w-7/12 mx-auto">
        <div className='grid grid-cols-3 gap-10'>
            {/* <SpriteFrame/> */}
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
                <BoxAnimation />
            </div>
        </div>
    )
}
