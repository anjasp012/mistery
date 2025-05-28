import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect } from 'react'
import useSound from '@/hooks/use-sound';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Spiner({onSpinerEnd, setOpenSlide}) {
    const { themes } = usePage<SharedData>().props;
     const { playSound } = useSound([`storage/${themes.sound_click.file}`, `storage/${themes.sound_win.file}`, `storage/${themes.sound_hover.file}`, `storage/${themes.sound_empty.file}`]);

    const options: EmblaOptionsType = { loop: true }
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ delay: 100, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: false }),
    ])

    const targetIndex = 6 // slide yang ada 'oke'-nya

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
                    setOpenSlide(false)
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

    return (
        <div className="embla pointer-events-none select-none">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="embla__slide">
                            <div className="mx-4 text-center">
                                <div>
                                    <img
                                        src="/Voucher.png"
                                        alt={`Voucher ${i + 1}`}
                                        className="w-full block"
                                    />
                                    {i === 6 ? <div className='block'>oke</div> : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
