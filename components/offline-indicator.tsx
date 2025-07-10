"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WifiOff } from "lucide-react"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    // Set initial state
    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showOfflineMessage) {
    return null
  }

  return (
    <Alert className="fixed top-4 left-4 right-4 z-50 shadow-lg md:left-auto md:right-4 md:w-80">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        You're offline. The app will continue to work, and your data will sync when you're back online.
      </AlertDescription>
    </Alert>
  )
}
