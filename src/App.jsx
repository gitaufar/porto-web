import './App.css'
import Navbar from './component/Navbar/Navbar'
import About from './screen/About'
import Project from './screen/Project'
import Contact from './screen/Contact'
import Home from './screen/Home'
import Experience from './screen/Experience'
import LoadingScreen from './screen/LoadingScreen'

function App() {
  return (
    <div>
      <Navbar />

      {/* Loading screen overlays everything while 3D assets are loading */}
      <LoadingScreen />

      {/* Global gradient overlay placed above the 3D canvas but below UI content */}
      <div className="fixed inset-0 pointer-events-none bg-linear-to-b from-black/60 via-black/20 to-black/80 z-1" />

      <Home />
      <About />
      <Experience />
      <Project />
      <Contact />
    </div>
  )
}

export default App
