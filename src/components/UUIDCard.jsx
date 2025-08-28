import React, { useEffect, useMemo, useState } from 'react'
import { makeUuidV4, safeRandomUUID } from '../utils/uuid.js'
import useClipboard from '../hooks/useClipboard.js'

export default function UUIDCard() {
  const [uuid, setUuid] = useState('')
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('uuid-history') || '[]')
    } catch {
      return []
    }
  })
  const { copy, status } = useClipboard()

  // Generate initial UUID on first load
  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleGenerate() {
    // Prefer native crypto.randomUUID if available, else fallback
    const newId = safeRandomUUID() || makeUuidV4()
    setUuid(newId)
    setHistory(prev => {
      const next = [newId, ...prev].slice(0, 20) // keep last 20
      localStorage.setItem('uuid-history', JSON.stringify(next))
      return next
    })
  }

  function handleClear() {
    setHistory([])
    localStorage.removeItem('uuid-history')
  }

  function handleDownload() {
    const blob = new Blob([history.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'uuids.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const version = useMemo(() => uuid?.split('-')[2]?.[0] || '4', [uuid])

  return (
    <section className="card">
      <div className="row">
        <h2>Your UUID</h2>
        <span className="chip">v{version}</span>
      </div>

      <div className="uuid-box" aria-live="polite">
        <code>{uuid || '—'}</code>
      </div>

      <div className="grid">
        <button className="btn primary" onClick={handleGenerate}>Generate</button>
        <button className="btn" onClick={() => copy(uuid)} disabled={!uuid}>{status === 'copied' ? '✓ Copied' : 'Copy'}</button>
        <button className="btn" onClick={handleDownload} disabled={!history.length}>Download</button>
        <button className="btn danger" onClick={handleClear} disabled={!history.length}>Clear</button>
      </div>

      <div className="history">
        <div className="row">
          <h3>Recent (last {history.length})</h3>
          <small>keeps 20</small>
        </div>
        <ul>
          {history.map((id) => (
            <li key={id}>
              <code>{id}</code>
              <button className="btn xs" onClick={() => copy(id)}>Copy</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
