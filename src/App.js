import React, { useState } from 'react'
import Header from './components/Header'
import UuidCard from './components/UuidCard'
import HistoryList from './components/HistoryList'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  const [history, setHistory] = useState([])

  // Example function to add a new UUID to history
  const handleAddUuid = (uuid) => {
    setHistory([uuid, ...history])
  }

  return (
    <div className="app">
      <Header />
      <main>
        <UuidCard onAdd={handleAddUuid} />
        <HistoryList items={history} />
      </main>
      <Footer />
    </div>
  )
}

export default App