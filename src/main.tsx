import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './i18n'
import RTLProvider from './contexts/RTLProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RTLProvider>
      <App />
    </RTLProvider>
  </React.StrictMode>
)
