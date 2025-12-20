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

  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'project', 'contact']

    const getClosestSection = () => {
      const centerY = window.innerHeight / 2
      let closest = 'home'
      let minDist = Infinity

      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const secCenter = rect.top + rect.height / 2
        const dist = Math.abs(secCenter - centerY)
        if (dist < minDist) {
          minDist = dist
          closest = id
        }
      })

      return closest
    }

    const handleScroll = () => {
      const closest = getClosestSection()
      setActiveSection(closest)
    }

    // initial
    setActiveSection(getClosestSection())

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
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

