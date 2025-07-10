"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignalZero, PhoneOff, MessageSquareX, History, BarChart3, Settings, Wifi } from "lucide-react"
import { useRouter } from "next/navigation"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import OfflineIndicator from "@/components/offline-indicator"

interface SignalLog {
  id: string
  type: "no_signal" | "call_failed" | "message_failed"
  location: string
  timestamp: string
}

const commonLocations = [
  "Kitchen",
  "Living Room",
  "Bedroom",
  "Bathroom",
  "Porch",
  "Stairs",
  "Basement",
  "Garage",
  "Garden",
  "Office",
]

export default function HomeContent() {
  const [mounted, setMounted] = useState(false)
  const [location, setLocation] = useState("")
  const [useCustomLocation, setUseCustomLocation] = useState(false)
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const [logs, setLogs] = useState<SignalLog[]>([])
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Load existing logs and recent locations
    const savedLogs = localStorage.getItem("signalLogs")
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs)
      setLogs(parsedLogs)

      // Extract recent locations (last 5 unique locations)
      const locations = parsedLogs
        .map((log: SignalLog) => log.location)
        .filter((loc: string) => loc.trim() !== "")
        .reverse()

      const uniqueLocations = [...new Set(locations)].slice(0, 5)
      setRecentLocations(uniqueLocations)
    }
  }, [])

  const logIssue = (type: "no_signal" | "call_failed" | "message_failed") => {
    if (!mounted) return

    const newLog: SignalLog = {
      id: Date.now().toString(),
      type,
      location: location.trim() || "Not specified",
      timestamp: new Date().toISOString(),
    }

    const updatedLogs = [...logs, newLog]
    setLogs(updatedLogs)
    localStorage.setItem("signalLogs", JSON.stringify(updatedLogs))

    // Update recent locations
    if (location.trim()) {
      const newRecentLocations = [location.trim(), ...recentLocations.filter((loc) => loc !== location.trim())].slice(
        0,
        5,
      )
      setRecentLocations(newRecentLocations)
    }

    // Show confirmation
    const issueTypes = {
      no_signal: "No Signal",
      call_failed: "Call Failed",
      message_failed: "Message Didn't Send",
    }

    alert(`${issueTypes[type]} logged successfully${location.trim() ? ` in ${location.trim()}` : ""}!`)

    // Clear location for next entry
    setLocation("")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
      <div className="max-w-md mx-auto">
        <OfflineIndicator />
        <PWAInstallPrompt />

        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/signal-diary-logo.png"
            alt="Signal Diary"
            width={64}
            height={64}
            className="mx-auto mb-4 rounded-lg"
          />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
          <p className="text-slate-600">Track your phone signal issues</p>
        </div>

        {/* Location Input */}
        <Card className="mb-6 border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="w-5 h-5" />
              Where did it happen?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={!useCustomLocation ? "default" : "outline"}
                size="sm"
                onClick={() => setUseCustomLocation(false)}
                className="flex-1"
              >
                Choose Room
              </Button>
              <Button
                variant={useCustomLocation ? "default" : "outline"}
                size="sm"
                onClick={() => setUseCustomLocation(true)}
                className="flex-1"
              >
                Type Location
              </Button>
            </div>

            {!useCustomLocation ? (
              <div className="space-y-3">
                {recentLocations.length > 0 && (
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Recent locations:</Label>
                    <div className="flex flex-wrap gap-2">
                      {recentLocations.map((loc) => (
                        <Button
                          key={loc}
                          variant="outline"
                          size="sm"
                          onClick={() => setLocation(loc)}
                          className={`text-xs ${location === loc ? "bg-amber-100 border-amber-400" : ""}`}
                        >
                          {loc}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="location-select" className="text-sm text-gray-600 mb-2 block">
                    Common rooms:
                  </Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location-select" className="text-lg h-12">
                      <SelectValue placeholder="Select a room..." />
                    </SelectTrigger>
                    <SelectContent>
                      {commonLocations.map((loc) => (
                        <SelectItem key={loc} value={loc} className="text-lg py-3">
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="location-input" className="text-sm text-gray-600 mb-2 block">
                  Enter location:
                </Label>
                <Input
                  id="location-input"
                  type="text"
                  placeholder="e.g., Kitchen, Porch, Stairs..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issue Buttons */}
        <div className="space-y-4 mb-8">
          <Button
            onClick={() => logIssue("no_signal")}
            className="w-full h-16 text-xl bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
          >
            <SignalZero className="w-8 h-8 mr-3" />
            No Signal
          </Button>

          <Button
            onClick={() => logIssue("call_failed")}
            className="w-full h-16 text-xl bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg"
          >
            <PhoneOff className="w-8 h-8 mr-3" />
            Call Failed
          </Button>

          <Button
            onClick={() => logIssue("message_failed")}
            className="w-full h-16 text-xl bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
          >
            <MessageSquareX className="w-8 h-8 mr-3" />
            Message Didn't Send
          </Button>
        </div>

        {/* Auto-save Notice */}
        <div className="text-center mb-8">
          <p className="text-sm text-slate-600 bg-white/60 rounded-lg px-4 py-2 border border-amber-200">
            ✓ Your log is saved automatically
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => router.push("/app/history")}
            variant="outline"
            className="h-14 text-lg bg-white/80 border-amber-300 hover:bg-amber-50"
          >
            <History className="w-6 h-6 mr-2" />
            History
          </Button>

          <Button
            onClick={() => router.push("/app/patterns")}
            variant="outline"
            className="h-14 text-lg bg-white/80 border-amber-300 hover:bg-amber-50"
          >
            <BarChart3 className="w-6 h-6 mr-2" />
            Patterns
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => router.push("/app/export")}
            variant="outline"
            className="h-14 text-lg bg-white/80 border-amber-300 hover:bg-amber-50"
          >
            <History className="w-6 h-6 mr-2" />
            Export
          </Button>

          <Button
            onClick={() => router.push("/app/settings")}
            variant="outline"
            className="h-14 text-lg bg-white/80 border-amber-300 hover:bg-amber-50"
          >
            <Settings className="w-6 h-6 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
