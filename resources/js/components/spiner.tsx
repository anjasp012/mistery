import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect } from 'react'
import useSound from '@/hooks/use-sound'
import { usePage } from '@inertiajs/react'
import { SharedData } from '@/types'

export default function Spiner({ onSpinerEnd }) {
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

  // Gambar asli yang ingin diulang
  const images = ['/4-bronze.png', '/3-bronze.png','/bg-mobile.png', '/bg-kanan.jpg']

  // Jumlah total slide (misalnya 23)
  const totalSlides = 23

  return (
    <div className="m-auto pointer-events-none select-none">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex items-center">
          {[...Array(totalSlides)].map((_, i) => (
            <div
              key={i}
              className={`flex-none w-1/3 sm:px-4 h-full sm:max-h-[450px] flex justify-center items-center my-auto`}
            >
              <img
                src={images[i % images.length]}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
