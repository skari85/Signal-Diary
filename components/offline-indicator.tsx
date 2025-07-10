"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { WifiOff, Wifi } from "lucide-react"

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine
      setIsOnline(online)

      if (!online) {
        setShowIndicator(true)
      } else {
        // Show "back online" message briefly
        if (!isOnline) {
          setShowIndicator(true)
          setTimeout(() => setShowIndicator(false), 3000)
        }
      }
    }

    // Set initial status
    updateOnlineStatus()

    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [isOnline])

  if (!showIndicator) {
    return null
  }

  return (
    <Card
      className={`border-2 shadow-lg ${isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {isOnline ? <Wifi className="w-6 h-6 text-green-600" /> : <WifiOff className="w-6 h-6 text-orange-600" />}
          <div>
            <h3 className={`font-semibold ${isOnline ? "text-green-900" : "text-orange-900"}`}>
              {isOnline ? "Back Online" : "You're Offline"}
            </h3>
            <p className={`text-sm ${isOnline ? "text-green-800" : "text-orange-800"}`}>
              {isOnline
                ? "Your connection has been restored."
                : "Don't worry - you can still log signal issues. They'll be saved locally."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
