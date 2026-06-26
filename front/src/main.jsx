

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import './i18n'
// import App from './App.jsx'
// import { ThemeProvider } from './contexts/ThemeContext'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { VisualThemeProvider } from './contexts/VisualThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VisualThemeProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </VisualThemeProvider>
  </StrictMode>,
)