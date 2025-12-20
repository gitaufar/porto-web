import Scene from "../component/Three/Scene"
import { useState, useEffect } from "react"

export default function Home() {
  const [showShootingStar, setShowShootingStar] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const spawnStar = () => {
      setShowShootingStar(true)
      const delay = Math.random() * 4000 + 1000 // random 1-5 seconds
      setTimeout(spawnStar, delay)
    }
    spawnStar()
  }, [])

  const [scrollState, setScrollState] = useState({ from: 'home', to: 'about', t: 0 })

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'project', 'contact']

    const computeScrollState = () => {
      const centerY = window.innerHeight / 2
      let closest = 'home'
      let minDist = Infinity
      let closestIndex = 0

      sections.forEach((id, idx) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const secCenter = rect.top + rect.height / 2
        const dist = Math.abs(secCenter - centerY)
        if (dist < minDist) {
          minDist = dist
          closest = id
          closestIndex = idx
        }
      })

      setActiveSection(closest)

      const currentEl = document.getElementById(sections[closestIndex])
      if (!currentEl) {
        setScrollState({ from: closest, to: closest, t: 0 })
        return
      }

      const rect = currentEl.getBoundingClientRect()
      const secCenter = rect.top + rect.height / 2

      // transitioning from previous to current
      if (secCenter > centerY && closestIndex > 0) {
        const prevSection = sections[closestIndex - 1]
        const prevEl = document.getElementById(prevSection)
        if (prevEl) {
          const prevRect = prevEl.getBoundingClientRect()
          const prevCenter = prevRect.top + prevRect.height / 2
          const totalDist = Math.abs(secCenter - prevCenter)
          const currentDist = centerY - prevCenter
          const t = Math.max(0, Math.min(1, currentDist / totalDist))
          setScrollState({ from: prevSection, to: closest, t })
          return
        }
      }

      // transitioning from current to next
      if (secCenter < centerY && closestIndex < sections.length - 1) {
        const nextSection = sections[closestIndex + 1]
        const nextEl = document.getElementById(nextSection)
        if (nextEl) {
          const nextRect = nextEl.getBoundingClientRect()
          const nextCenter = nextRect.top + nextRect.height / 2
          const totalDist = Math.abs(nextCenter - secCenter)
          const currentDist = centerY - secCenter
          const t = Math.max(0, Math.min(1, currentDist / totalDist))
          setScrollState({ from: closest, to: nextSection, t })
          return
        }
      }

      setScrollState({ from: closest, to: closest, t: 0 })
    }

    computeScrollState()

    window.addEventListener('scroll', computeScrollState)
    window.addEventListener('resize', computeScrollState)
    return () => {
      window.removeEventListener('scroll', computeScrollState)
      window.removeEventListener('resize', computeScrollState)
    }
  }, [])

  const handleStarFinished = () => {
    setShowShootingStar(false)
  }

  return (
    <div id="home" className="relative h-screen overflow-hidden">
      {/* Three.js Background */}
      <Scene 
        showShootingStar={showShootingStar} 
        onStarFinished={handleStarFinished}
        activeSection={activeSection}
        scrollState={scrollState}
      />

      {/* Gradient Overlay (moved to App.jsx) */}

      {/* UI Content */}
      <div className="relative z-2 flex justify-center h-full px-20 items-center text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold">M Zhafir Aufar</h1>
          <p className="mt-4 text-5xl">Frontend & Mobile Developer</p>
        </div>
      </div>
    </div>
  )
}

