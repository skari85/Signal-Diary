"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignalZero, PhoneOff, MessageSquareX, History, Download, User, MapPin, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "./optimized-image"
import PWAInstallPrompt from "./pwa-install-prompt"
import OfflineIndicator from "./offline-indicator"
import { useSignalDiary } from "@/hooks/use-signal-diary"
import { toast } from "@/hooks/use-toast"

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
] as const

const ISSUE_TYPES = [
  {
    type: "no-signal" as const,
    label: "No Signal",
    icon: SignalZero,
    className: "bg-red-500 hover:bg-red-600",
    description: "Phone shows no signal bars",
  },
  {
    type: "call-failed" as const,
    label: "Call Failed",
    icon: PhoneOff,
    className: "bg-orange-500 hover:bg-orange-600",
    description: "Call couldn't connect or dropped",
  },
  {
    type: "message-failed" as const,
    label: "Message Didn't Send",
    icon: MessageSquareX,
    className: "bg-blue-500 hover:bg-blue-600",
    description: "Text message failed to send",
  },
]

export default function HomeContent() {
  const [location, setLocation] = useState("")
  const [useDropdown, setUseDropdown] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addLogEntry, recentLocations, logs, getWeeklyStats } = useSignalDiary()

  // Handle adding log entry
  const handleAddLogEntry = useCallback(
    async (type: "no-signal" | "call-failed" | "message-failed") => {
      if (isSubmitting) return

      setIsSubmitting(true)

      try {
        await addLogEntry(type, location)
        setLocation("")
        toast({
          title: "Issue logged successfully!",
          description: `${ISSUE_TYPES.find((t) => t.type === type)?.label} logged in ${location || "Not specified"}.`,
        })
      } catch (error) {
        console.error("Error logging entry:", error)
        toast({
          title: "Failed to log issue",
          description: "Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [addLogEntry, location, isSubmitting],
  )

  // Handle location selection
  const handleLocationSelect = useCallback((value: string) => {
    if (value === "Other") {
      setUseDropdown(false)
      setLocation("")
    } else {
      setLocation(value)
    }
  }, [])

  // Switch to dropdown
  const switchToDropdown = useCallback(() => {
    setUseDropdown(true)
    setLocation("")
  }, [])

  // Get recent activity
  const recentActivity = useMemo(() => {
    return logs.slice(0, 3).map((log) => ({
      ...log,
      issueType: ISSUE_TYPES.find((t) => t.type === log.type),
      timestamp: new Date(log.timestamp),
    }))
  }, [logs])

  // Get weekly stats
  const weeklyStats = useMemo(() => getWeeklyStats(), [getWeeklyStats])

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <OptimizedImage
              src="/signal-diary-logo.png"
              alt="Signal Diary Logo"
              width={80}
              height={80}
              className="rounded-2xl"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
          <p className="text-lg text-slate-600">Track your phone signal issues</p>
        </div>

        {/* Quick Stats */}
        {weeklyStats.total > 0 && (
          <Card className="border-2 border-purple-200 bg-purple-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-semibold text-purple-900">This Week</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{weeklyStats.total}</div>
                  <div className="text-sm text-purple-700">Total Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{weeklyStats.noSignal}</div>
                  <div className="text-sm text-purple-700">No Signal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                        <SelectItem value="header-recent" disabled className="font-semibold text-blue-600">
                          Recent Locations
                        </SelectItem>
                        {recentLocations.map((loc) => (
                          <SelectItem key={`recent-${loc}`} value={loc} className="pl-4">
                            📍 {loc}
                          </SelectItem>
                        ))}
                        <SelectItem value="header-common" disabled className="font-semibold text-slate-600">
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
                  disabled={isSubmitting}
                />
                <Button
                  onClick={switchToDropdown}
                  variant="outline"
                  className="w-full h-10 text-sm border-2 border-slate-300 rounded-lg bg-transparent"
                  disabled={isSubmitting}
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
            {ISSUE_TYPES.map((issue) => {
              const Icon = issue.icon
              return (
                <Button
                  key={issue.type}
                  onClick={() => handleAddLogEntry(issue.type)}
                  className={`w-full h-16 text-xl text-white font-semibold rounded-xl shadow-md ${issue.className}`}
                  disabled={isSubmitting}
                >
                  <Icon className="w-8 h-8 mr-3" />
                  <div className="text-left">
                    <div className="font-bold">{issue.label}</div>
                    <div className="text-sm opacity-90">{issue.description}</div>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg border bg-gray-50">
                    <div className="flex items-start gap-3">
                      {log.issueType?.icon && <log.issueType.icon className="w-5 h-5 mt-0.5 text-slate-600" />}
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{log.issueType?.label}</div>
                        <div className="text-sm text-slate-600">
                          {log.location} • {log.timestamp.toLocaleDateString()} at{" "}
                          {log.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/history" prefetch={false}>
            <Button className="w-full h-16 text-base bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md transition-all duration-200 active:scale-95">
              <History className="w-6 h-6 mr-1" />
              History
            </Button>
          </Link>

          <Link href="/patterns" prefetch={false}>
            <Button className="w-full h-16 text-base bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md transition-all duration-200 active:scale-95">
              📊 Patterns
            </Button>
          </Link>

          <Link href="/export" prefetch={false}>
            <Button className="w-full h-16 text-base bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md transition-all duration-200 active:scale-95">
              <Download className="w-6 h-6 mr-1" />
              Export
            </Button>
          </Link>
        </div>

        <Link href="/settings" prefetch={false}>
          <Button className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-all duration-200 active:scale-95">
            <User className="w-6 h-6 mr-2" />
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
