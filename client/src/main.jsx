import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppDEMO.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
