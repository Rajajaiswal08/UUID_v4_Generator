import React, { useEffect, useState } from 'react'

export default function ApiBadge() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    async function getQuote() {
      try {
        const res = await fetch('https://api.quotable.io/random')
        const data = await res.json()
        setQuote(data.content)
      } catch {
        setQuote('Tip: UUIDs are universally unique identifiers.')
      }
    }
    getQuote()
  }, [])

  return (
    <div className="api-badge" role="note">
      <span>🛰️ Free API:</span>
      <p>{quote || 'Loading...'}</p>
    </div>
  )
}
