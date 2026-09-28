/* ============================================
   Kivo — Punto de entrada de React (Semana 7)
   Carga Bootstrap desde npm (no por CDN), luego
   los estilos propios de Kivo y monta el
   componente principal App dentro de #root.
   ============================================ */

import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './styles/estilos.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
