import { useCallback, useState } from 'react'

/**
 * Custom React hook to copy text to the clipboard.
 * Returns a copy function and the current status.
 */
export default function useClipboard() {
  
  const [status, setStatus] = useState('idle')

  /**
   * Copies the provided text to the clipboard.
   * @param {string} text - The text to copy.
   */
  const copyToClipboard = useCallback(async (text) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch (error) {
      // Optionally log the error for debugging
      // console.error('Clipboard copy failed:', error)
      setStatus('error')
    } finally {
      // Reset status after 1.2 seconds
      setTimeout(() => setStatus('idle'), 1200)
    }
  }, [])

  return { copy: copyToClipboard, status }
}
