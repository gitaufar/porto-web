import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StackingCards = ({
  children,
  sectionId = 'stacking-section',
  className = '',
}) => {
  const containerRef = useRef(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = gsap.utils.toArray(
      container.querySelectorAll('.stacking-card')
    )

    if (!cards.length) return

    // Pastikan semua card absolute
    gsap.set(cards, {
      position: 'absolute',
      inset: 0,
    })

    const scrollLength = window.innerHeight * cards.length

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: true,
        scrub: true,
        id: sectionId,
      },
    })

    cards.forEach((card, i) => {
      // Card baru masuk
      tl.from(card, {
        y: 120,
        scale: 0.95,
        opacity: 0,
        duration: 1,
        onStart: () => {
          // Card aktif HARUS paling depan
          gsap.set(card, { zIndex: 100 + i })
        },
      })

      // Card sebelumnya terdorong ke belakang
      if (i > 0) {
        tl.to(
          cards[i - 1],
          {
            scale: 0.9,
            opacity: 0.4,
            y: 20,
            zIndex: 10,
            duration: 1,
          },
          '<'
        )
      }
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [sectionId])

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  )
}

export const StackingCard = ({ children, className = '' }) => {
  return (
    <div
      className={`stacking-card w-full max-w-4xl mx-auto ${className}`}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  )
}

export default StackingCards