import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext' // 1. Mərkəzi provayderimizi bura import edirik
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Ən üst təbəqəyə ThemeProvider-i qoyuruq */}
   <AuthProvider>
     <ThemeProvider> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
   </AuthProvider>
  </StrictMode>,
)