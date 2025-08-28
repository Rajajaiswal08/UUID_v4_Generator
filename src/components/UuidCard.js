import React, { useState } from 'react'
import useClipboard from '../hooks/useClipboard'

function UuidCard({ onAdd }) {
  const [uuid, setUuid] = useState('')
  const { copy, status } = useClipboard()

  const generateUuid = () => {
    const newUuid = crypto.randomUUID()
    setUuid(newUuid)
    onAdd(newUuid)
  }

  return (
    <div className="card">
      <button onClick={generateUuid}>Generate UUID</button>
      {uuid && (
        <div className="uuid-box">
          {uuid}
          <button onClick={() => copy(uuid)}>
            {status === 'copied' ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default UuidCard

// src/
//   components/
//     Header.js
//     UuidCard.js
//     HistoryList.js
//     Footer.js
//   hooks/
//     useClipboard.js
//   styles/
//     App.css
//   App.js
//   index.js