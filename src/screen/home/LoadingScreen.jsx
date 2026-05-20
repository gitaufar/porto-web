import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const name = 'aufarzhfr'
  const [visibleCount, setVisibleCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timeouts = []
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= name.length) {
          clearInterval(interval)

          // ⏸️ pause 300ms after last letter
          timeouts.push(setTimeout(() => {
            setFading(true)

            // remove after fade (0.6s + buffer)
            timeouts.push(setTimeout(() => {
              setHidden(true)
            }, 700))
          }, 1000))

          return prev
        }
        return prev + 1
      })
    }, 180)

    return () => {
      clearInterval(interval)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes dropBounce {
          0% {
            opacity: 0;
            transform: translateY(-40px);
          }
          60% {
            opacity: 1;
            transform: translateY(8px);
          }
          80% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="flex gap-1 text-4xl font-bold tracking-wide text-white">
        {name.split('').map((char, i) => (
          <span
            key={i}
            className={i < visibleCount ? 'inline-block' : 'opacity-0'}
            style={{
              animation:
                i < visibleCount
                  ? 'dropBounce 0.6s ease-out forwards'
                  : 'none',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
