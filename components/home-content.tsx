"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Phone,
  PhoneOff,
  MessageSquareX,
  History,
  TrendingUp,
  Download,
  Settings,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

const issueTypes = [
  {
    id: "no-signal" as const,
    label: "No Signal",
    description: "Phone shows no signal bars",
    icon: PhoneOff,
    color: "bg-red-500 hover:bg-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: "call-failed" as const,
    label: "Call Failed",
    description: "Call couldn't connect or dropped",
    icon: Phone,
    color: "bg-orange-500 hover:bg-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: "message-failed" as const,
    label: "Message Didn't Send",
    description: "Text message failed to send",
    icon: MessageSquareX,
    color: "bg-blue-500 hover:bg-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
]

export default function HomeContent() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const [currentLocation, setCurrentLocation] = useState("")
  const [isLogging, setIsLogging] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = () => {
    try {
      // Load logs
      const savedLogs = localStorage.getItem("signal-diary-logs")
      if (savedLogs) {
        const parsedLogs: LogEntry[] = JSON.parse(savedLogs)
        setLogs(parsedLogs)

        // Extract recent locations
        const locations = parsedLogs.map((log) => log.location).filter((loc) => loc && loc !== "Not specified")

        const uniqueLocations = Array.from(new Set(locations)).slice(0, 5)
        setRecentLocations(uniqueLocations)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const logIssue = async (type: LogEntry["type"]) => {
    if (isLogging) return

    setIsLogging(true)

    try {
      const newEntry: LogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        location: currentLocation || "Not specified",
        timestamp: new Date().toISOString(),
      }

      const updatedLogs = [newEntry, ...logs]
      setLogs(updatedLogs)
      localStorage.setItem("signal-diary-logs", JSON.stringify(updatedLogs))

      // Update recent locations
      if (currentLocation && currentLocation !== "Not specified") {
        const newRecentLocations = [currentLocation, ...recentLocations.filter((loc) => loc !== currentLocation)].slice(
          0,
          5,
        )
        setRecentLocations(newRecentLocations)
      }

      // Clear location input
      setCurrentLocation("")

      // Show success feedback
      const issueType = issueTypes.find((issue) => issue.id === type)
      alert(`✓ ${issueType?.label} logged successfully!`)
    } catch (error) {
      console.error("Error logging issue:", error)
      alert("Error logging issue. Please try again.")
    } finally {
      setIsLogging(false)
    }
  }

  const getRecentStats = () => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const recentLogs = logs.filter((log) => new Date(log.timestamp) >= weekAgo)

    return {
      total: recentLogs.length,
      noSignal: recentLogs.filter((log) => log.type === "no-signal").length,
      callFailed: recentLogs.filter((log) => log.type === "call-failed").length,
      messageFailed: recentLogs.filter((log) => log.type === "message-failed").length,
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-amber-50 p-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    )
  }

  const stats = getRecentStats()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
          <p className="text-slate-600 text-lg">Track your phone signal issues</p>
        </div>

        {/* Quick Stats */}
        {stats.total > 0 && (
          <Card className="border-2 border-purple-200 bg-purple-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-semibold text-purple-900">This Week</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{stats.total}</div>
                  <div className="text-sm text-purple-700">Total Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-900">{stats.noSignal}</div>
                  <div className="text-sm text-purple-700">No Signal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Input */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="w-5 h-5" />
              Current Location
            </CardTitle>
            <p className="text-sm text-slate-600">Optional: Where are you experiencing the issue?</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="location" className="text-lg font-medium">
                Location (Optional)
              </Label>
              <Input
                id="location"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                placeholder="e.g., Home, Work, Main Street"
                className="mt-2 h-12 text-lg border-2 border-slate-300 rounded-lg"
              />
            </div>

            {recentLocations.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-slate-700">Recent Locations</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recentLocations.map((location) => (
                    <Button
                      key={location}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentLocation(location)}
                      className="text-sm border-amber-300 text-amber-700 hover:bg-amber-50"
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issue Logging Buttons */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">What's the problem?</CardTitle>
            <p className="text-sm text-slate-600">Tap the button that matches your issue</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {issueTypes.map((issue) => {
              const Icon = issue.icon
              return (
                <Button
                  key={issue.id}
                  onClick={() => logIssue(issue.id)}
                  disabled={isLogging}
                  className={`w-full h-16 text-left ${issue.color} text-white font-semibold rounded-xl shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-50`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8" />
                    <div>
                      <div className="text-lg font-bold">{issue.label}</div>
                      <div className="text-sm opacity-90">{issue.description}</div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {logs.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.slice(0, 3).map((log) => {
                  const issue = issueTypes.find((i) => i.id === log.type)
                  const date = new Date(log.timestamp)
                  const Icon = issue?.icon || AlertTriangle

                  return (
                    <div key={log.id} className={`p-3 rounded-lg border-2 ${issue?.bgColor} ${issue?.borderColor}`}>
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 mt-0.5 text-slate-600" />
                        <div className="flex-1">
                          <div className="font-medium text-slate-800">{issue?.label}</div>
                          <div className="text-sm text-slate-600">
                            {log.location} • {date.toLocaleDateString()} at{" "}
                            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/history">
            <Button className="w-full h-14 text-lg bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
              <History className="w-6 h-6 mr-2" />
              View History
            </Button>
          </Link>
          <Link href="/patterns">
            <Button className="w-full h-14 text-lg bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md">
              <TrendingUp className="w-6 h-6 mr-2" />
              See Patterns
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/export">
            <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
              <Download className="w-6 h-6 mr-2" />
              Export Data
            </Button>
          </Link>
          <Link href="/settings">
            <Button className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md">
              <Settings className="w-6 h-6 mr-2" />
              Settings
            </Button>
          </Link>
        </div>

        {/* Welcome Message */}
        {logs.length === 0 && (
          <Card className="border-2 border-green-200 bg-green-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Welcome to Signal Diary!</h3>
                  <p className="text-sm text-green-700">
                    When you experience a phone signal issue, use the buttons above to log it. Your data stays private
                    on your device.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-sm text-slate-500">Your data is stored locally and never shared automatically</p>
          <Link href="/" className="text-sm text-amber-600 hover:text-amber-700 underline">
            ← Back to Landing Page
          </Link>
        </div>
      </div>
    </div>
  )
}
