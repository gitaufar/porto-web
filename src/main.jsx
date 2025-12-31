import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScrollToHash from './utils/ScrollToHash.jsx'
import { BrowserRouter } from "react-router-dom"
import ScrollProvider from './utils/ScrollProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollProvider>
        <ScrollToHash />
        <App />
      </ScrollProvider>
    </BrowserRouter>
  </StrictMode>,
)
