"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignalZero, PhoneOff, MessageSquareX, History, Download, User, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Add these imports at the top
import PWAInstallPrompt from "./pwa-install-prompt"
import OfflineIndicator from "./offline-indicator"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

const COMMON_LOCATIONS = [
  "Kitchen",
  "Living Room",
  "Bedroom",
  "Bathroom",
  "Porch",
  "Stairs",
  "Basement",
  "Attic",
  "Garage",
  "Backyard",
  "Front Yard",
  "Dining Room",
  "Office",
  "Hallway",
  "Balcony",
  "Other",
]

export default function HomeContent() {
  const [location, setLocation] = useState("")
  const [useDropdown, setUseDropdown] = useState(true)
  const [recentLocations, setRecentLocations] = useState<string[]>([])

  useEffect(() => {
    // Load recent locations from logs
    const savedLogs = localStorage.getItem("signal-diary-logs")
    if (savedLogs) {
      const logs = JSON.parse(savedLogs)
      const locations = logs
        .map((log: LogEntry) => log.location)
        .filter((loc: string) => loc && loc !== "Not specified")

      // Get unique locations, most recent first
      const uniqueLocations = [...new Set(locations)].slice(0, 5)
      setRecentLocations(uniqueLocations)
    }
  }, [])

  const addLogEntry = (type: LogEntry["type"]) => {
    const finalLocation = location || "Not specified"

    const newEntry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      location: finalLocation,
      timestamp: new Date().toISOString(),
    }

    const existingLogs = localStorage.getItem("signal-diary-logs")
    const logs = existingLogs ? JSON.parse(existingLogs) : []
    const updatedLogs = [newEntry, ...logs]

    localStorage.setItem("signal-diary-logs", JSON.stringify(updatedLogs))

    // Update recent locations
    if (finalLocation !== "Not specified") {
      const newRecentLocations = [finalLocation, ...recentLocations.filter((loc) => loc !== finalLocation)].slice(0, 5)
      setRecentLocations(newRecentLocations)
    }

    setLocation("")

    // Show confirmation with location
    alert(`Issue logged successfully in ${finalLocation}!`)
  }

  const handleLocationSelect = (value: string) => {
    if (value === "Other") {
      setUseDropdown(false)
      setLocation("")
    } else {
      setLocation(value)
    }
  }

  const switchToDropdown = () => {
    setUseDropdown(true)
    setLocation("")
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <Image
              src="/signal-diary-logo.png"
              alt="Signal Diary Logo"
              width={80}
              height={80}
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
          <p className="text-lg text-slate-600">Track your phone signal issues</p>
        </div>

        {/* Location Selection */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center text-slate-700 flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6" />
              Where did it happen?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {useDropdown ? (
              <div className="space-y-3">
                <Select value={location} onValueChange={handleLocationSelect}>
                  <SelectTrigger className="h-12 text-lg border-2 border-slate-300 rounded-lg">
                    <SelectValue placeholder="Select a room or location" />
                  </SelectTrigger>
                  <SelectContent>
                    {recentLocations.length > 0 && (
                      <>
                        <SelectItem value="" disabled className="font-semibold text-blue-600">
                          Recent Locations
                        </SelectItem>
                        {recentLocations.map((loc) => (
                          <SelectItem key={`recent-${loc}`} value={loc} className="pl-4">
                            📍 {loc}
                          </SelectItem>
                        ))}
                        <SelectItem value="" disabled className="font-semibold text-slate-600">
                          Common Locations
                        </SelectItem>
                      </>
                    )}
                    {COMMON_LOCATIONS.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {location && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 font-medium">Selected: {location}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Type your location (e.g., Kitchen, Porch)"
                  className="h-12 text-lg border-2 border-slate-300 rounded-lg"
                />
                <Button
                  onClick={switchToDropdown}
                  variant="outline"
                  className="w-full h-10 text-sm border-2 border-slate-300 rounded-lg bg-transparent"
                >
                  Or choose from common locations
                </Button>
              </div>
            )}
            <p className="text-sm text-slate-500 text-center">
              {location ? "Ready to log your issue!" : "This helps identify problem areas in your home"}
            </p>
          </CardContent>
        </Card>

        {/* Main Action Buttons */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center text-slate-700">What happened?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => addLogEntry("no-signal")}
              className="w-full h-16 text-xl bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md"
            >
              <SignalZero className="w-8 h-8 mr-3" />
              No Signal
            </Button>

            <Button
              onClick={() => addLogEntry("call-failed")}
              className="w-full h-16 text-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md"
            >
              <PhoneOff className="w-8 h-8 mr-3" />
              Call Failed
            </Button>

            <Button
              onClick={() => addLogEntry("message-failed")}
              className="w-full h-16 text-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md"
            >
              <MessageSquareX className="w-8 h-8 mr-3" />
              Message Didn't Send
            </Button>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/history">
            <Button className="w-full h-14 text-base bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
              <History className="w-5 h-5 mr-1" />
              History
            </Button>
          </Link>

          <Link href="/patterns">
            <Button className="w-full h-14 text-base bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md">
              📊 Patterns
            </Button>
          </Link>

          <Link href="/export">
            <Button className="w-full h-14 text-base bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
              <Download className="w-5 h-5 mr-1" />
              Export
            </Button>
          </Link>
        </div>

        <Link href="/settings">
          <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md">
            <User className="w-5 h-5 mr-2" />
            Settings
          </Button>
        </Link>

        {/* PWA Components */}
        <PWAInstallPrompt />
        <OfflineIndicator />
      </div>
    </div>
  )
}
