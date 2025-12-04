import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Vite ishga tushganini tekshirish
if (import.meta.env.DEV) {
  console.log('✅ Vite Development mode ishga tushdi!');
  console.log('🔧 Vite version:', import.meta.env.MODE);
  console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'https://app.tablecrm.com/api/v1 (default)');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

