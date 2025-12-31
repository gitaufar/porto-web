import Scene from "../component/Three/Scene"
import { useState, useEffect } from "react"
import TextType from "../component/Text/TextType"
import { useScroll } from '../utils/ScrollProvider.jsx'

export default function Home() {
  const [showShootingStar, setShowShootingStar] = useState(false)
  const { activeSection, scrollState, experienceIndex } = useScroll() || { activeSection: 'home', scrollState: { from: 'home', to: 'about', t: 0 }, experienceIndex: 0 }

  useEffect(() => {
    const spawnStar = () => {
      setShowShootingStar(true)
      const delay = Math.random() * 4000 + 1000 // random 1-5 seconds
      setTimeout(spawnStar, delay)
    }
    spawnStar()
  }, [])

  // scroll state and activeSection are provided by ScrollProvider (Lenis)

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
        experienceIndex={experienceIndex}
      />

      {/* Gradient Overlay (moved to App.jsx) */}

      {/* UI Content */}
      <div className="relative z-2 flex justify-center h-full px-6 md:px-20 items-center text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold">M Zhafir Aufar</h1>
          <TextType
            text={["Software Engineer", "Frontend Developer", "Mobile Developer"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="mt-4 text-2xl md:text-5xl text-white"
          />
        </div>
      </div>
    </div>
  )
}

