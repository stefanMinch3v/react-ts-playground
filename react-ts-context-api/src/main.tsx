import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> // strictmode, runs every component function twice when the component is rendered
    <App />
  </React.StrictMode>,
)
