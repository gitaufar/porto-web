import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import About from './About'
import TechStack from './TechStack'
import Project from './Project'
import Journey from './Journey'

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <TechStack />
      <Project />
      <Journey />
    </div>
  )
}

export default App
