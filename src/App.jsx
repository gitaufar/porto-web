import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import About from './About'
import TechStack from './TechStack'
import Project from './Project'

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <TechStack />
      <Project />
    </div>
  )
}

export default App
