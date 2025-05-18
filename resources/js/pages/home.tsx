import AOS from 'aos';
import 'aos/dist/aos.css';
import LeftSide from "@/components/home/left-side";
import RightSide from "@/components/home/right-side";
import { useEffect, useState } from 'react';

export default function home({boxes, keys}: any) {

    const [selectedBox, setSelectedBox] = useState<string>('');
    useEffect(() => {
        AOS.init();
      }, [])
    return (
        <div className="relative">
            <div className='flex overflow-x-hidden'>
                <LeftSide selectedBox={selectedBox} setSelectedBox={setSelectedBox} />
                <RightSide keys={keys} boxes={boxes} selectedBox={selectedBox} setSelectedBox={setSelectedBox} />
            </div>
        </div>
    )
}
