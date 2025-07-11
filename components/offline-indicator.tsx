"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WifiOff, Wifi } from "lucide-react"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (!online) {
        setShowOfflineMessage(true)
      } else if (showOfflineMessage) {
        // Show "back online" message briefly
        setTimeout(() => setShowOfflineMessage(false), 3000)
      }
    }

    // Set initial status
    updateOnlineStatus()

    // Listen for online/offline events
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [showOfflineMessage])

  if (!showOfflineMessage) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card
        className={`border-2 shadow-lg ${isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-orange-600" />}
            <div>
              <p className={`font-medium ${isOnline ? "text-green-800" : "text-orange-800"}`}>
                {isOnline ? "Back Online" : "You're Offline"}
              </p>
              <p className={`text-sm ${isOnline ? "text-green-700" : "text-orange-700"}`}>
                {isOnline
                  ? "All features are available again"
                  : "The app still works offline. Your data is saved locally."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
