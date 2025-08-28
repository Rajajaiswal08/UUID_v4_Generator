// Utilities for generating UUID v4
// Prefer secure native API; provide a deterministic fallback.

// Safe wrapper for native crypto.randomUUID (not supported in older browsers).
export function safeRandomUUID() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
  } catch {}
  return null
}

// RFC 4122 version 4 UUID (fallback) using window.crypto.getRandomValues when available.
export function makeUuidV4() {
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    // Very basic fallback: Math.random (not cryptographically strong).
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
  }

  // Per RFC 4122 §4.4: set version and variant bits
  bytes[6] = (bytes[6] & 0x0f) | 0x40  // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80  // variant 10

  const hex = [...bytes].map(b => b.toString(16).padStart(2, '0'))
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join('')
  ].join('-')
}
