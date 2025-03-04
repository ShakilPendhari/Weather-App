'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function NetworkDetector({ children }) {
  const [isOnline, setIsOnline] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      router.push('/')  // Redirect to home when back online
    }

    const handleOffline = () => {
      setIsOnline(false)
      router.push('/offline')
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  // If offline, don't render children
  if (!isOnline) {
    return null
  }

  return children
}