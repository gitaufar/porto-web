import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import About from './screen/home/About'
import Project from './screen/home/Project'
import Contact from './screen/home/Contact'
import Home from './screen/home/Home'
import Experience from './screen/home/Experience'
import LoadingScreen from './screen/home/LoadingScreen'
import Techstack from './screen/home/Techstack'
import AllProjects from './screen/projects/AllProjects'

function HomePage() {
  return (
    <>
      {/* Loading screen overlays everything while 3D assets are loading */}
      <LoadingScreen />

      <Home />
      <About />
      <Experience />
      <Project />
      <Techstack />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div>
      <Navbar />

      {/* Global gradient overlay placed above the 3D canvas but below UI content */}
      <div className="fixed inset-0 pointer-events-none bg-linear-to-b from-black/60 via-black/20 to-black/80 z-1" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
