import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect } from 'react'
import useSound from '@/hooks/use-sound'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'

type SpinerProps = {
    box: {
        prize: {
            image: string
        }
    },
    prizes: {
        id: string,
        image: string,
    }[],
    onSpinerEnd: void;
};

export default function Spiner({ box, prizes, onSpinerEnd }: SpinerProps) {
    const { themes } = usePage<SharedData>().props
    const { playSound } = useSound([
        `storage/${themes.sound_click.file}`,
        `storage/${themes.sound_win.file}`,
        `storage/${themes.sound_hover.file}`,
        `storage/${themes.sound_empty.file}`,
    ])

    const options: EmblaOptionsType = { loop: true }
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({
            delay: 100,
            playOnInit: true,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
        }),
    ])

    const targetIndex = 6 // slide yang ingin dihentikan

    useEffect(() => {
        if (!emblaApi) return

        const autoplayPlugin = emblaApi?.plugins()?.autoplay

        const handleSlideChange = () => {
            playSound(`storage/${themes.sound_hover.file}`)
        }

        emblaApi.on('select', handleSlideChange)

        const autoplayStopTimeout = setTimeout(() => {
            autoplayPlugin?.stop()

            const currentIndex = emblaApi.selectedScrollSnap()
            const totalSlides = emblaApi.scrollSnapList().length

            const stepsToTarget =
                (targetIndex - currentIndex + totalSlides) % totalSlides

            let step = 0
            let delay = 80

            const slowScrollToTarget = () => {
                if (step >= stepsToTarget) {
                    onSpinerEnd()
                    return
                }
                emblaApi.scrollNext()
                step++
                delay += 100
                setTimeout(slowScrollToTarget, delay)
            }

            slowScrollToTarget()
        }, 4000)

        return () => {
            clearTimeout(autoplayStopTimeout)
            emblaApi.off('select', handleSlideChange)
        }
    }, [emblaApi])

    const image = `/storage/${box.prize.image}`;
    console.log(image);

    const baseImages = prizes.map(prize => `/storage/${prize.image}`);
    const insertIndex = Math.min(6, baseImages.length);
    const imagesWithInserted = [
        ...baseImages.slice(0, insertIndex),
        image,
        ...baseImages.slice(insertIndex)
    ];

    // Loop jadi total 20 elemen
    const totalSlides = 20;
    const images = Array.from({ length: totalSlides }, (_, i) =>
        imagesWithInserted[i % imagesWithInserted.length]
    );



    return (
        <div className="m-auto pointer-events-none select-none">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex items-center">
                    {images.map((imgSrc, i) => (
                        <div
                            key={i}
                            className="flex-none w-1/3 sm:px-4 h-full sm:max-h-[450px] flex justify-center items-center my-auto"
                        >
                            {i == 6 ?
                            <img src={`/storage/${box.prize.image}`} loading="lazy" className="w-10/12 mx-auto my-auto h-full object-contain" />
                             :
                            <img src={imgSrc} loading="lazy" className="w-10/12 mx-auto my-auto h-full object-contain" />
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
