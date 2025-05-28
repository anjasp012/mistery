import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect } from 'react'
import useSound from '@/hooks/use-sound';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Spiner({onSpinerEnd}) {
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
                    return
                }

                emblaApi.scrollNext()
                step++
                delay += 100
                setTimeout(slowScrollToTarget, delay)
            }

            slowScrollToTarget()
        }, 40000)

        return () => {
            clearTimeout(autoplayStopTimeout)
            emblaApi.off('select', handleSlideChange)
        }
    }, [emblaApi])

    return (
        <div className="m-auto w-full pointer-events-none select-none">
  <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex-none px-2 md:px-4 w-1/3 md:w-1/5"
        >
          <div className="text-center">
            <img
              src="/Voucher.png"
              alt={`Voucher ${i + 1}`}
              className="w-full block"
            />
            {i === 6 && <div className="block">oke</div>}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    )
}
