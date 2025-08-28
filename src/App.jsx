import React, { useEffect, useState } from 'react'
import './styles/App.css'
import UUIDCard from './components/UUIDCard.jsx'
import ApiBadge from './components/ApiBadge.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="app">
      <header className="container header">
        <div className="brand">
          <img src="/uuid.svg" alt="UUID icon" width="28" height="28" />
          <h1>UUID v4 Generator</h1>
        </div>

        <div className="actions">
          <button className="btn ghost" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <a className="btn" href="https://github.com/" target="_blank" rel="noreferrer">⭐ Star</a>
        </div>
      </header>

      <main className="container">
        <UUIDCard />
        <ApiBadge />
      </main>

      <footer className="footer">
        <div className="container">
          <small>Built with React + Vite • UUID generation uses <code>crypto.randomUUID()</code> with a fallback.</small>
        </div>
      </footer>
    </div>
  )
}
