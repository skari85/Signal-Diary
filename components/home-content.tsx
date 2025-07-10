"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  PhoneOff,
  MessageSquareX,
  MapPin,
  BarChart3,
  Download,
  Settings,
  History,
  TrendingUp,
  Clock,
  Home,
  Building,
  Car,
  Store,
  Plus,
} from "lucide-react"
import { useSignalDiary } from "@/hooks/use-signal-diary"
import { format } from "date-fns"
import Link from "next/link"

export default function HomeContent() {
  const { logs, addLog, getWeeklyStats, getRecentLocations } = useSignalDiary()
  const [customLocation, setCustomLocation] = useState("")
  const [showCustomLocation, setShowCustomLocation] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleLogIssue = (type: "no_signal" | "call_failed" | "message_failed", location: string) => {
    addLog({
      type,
      location: location || "Unknown",
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    })
    setCustomLocation("")
    setShowCustomLocation(false)
  }

  const weeklyStats = getWeeklyStats()
  const recentLocations = getRecentLocations()
  const recentLogs = logs.slice(-5).reverse()

  const issueTypeLabels = {
    no_signal: "No Signal",
    call_failed: "Call Failed",
    message_failed: "Message Failed",
  }

  const issueTypeColors = {
    no_signal: "bg-red-100 text-red-800 border-red-200",
    call_failed: "bg-orange-100 text-orange-800 border-orange-200",
    message_failed: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }

  const commonLocations = [
    { name: "Home", icon: Home },
    { name: "Kitchen", icon: Home },
    { name: "Bedroom", icon: Home },
    { name: "Living Room", icon: Home },
    { name: "Office", icon: Building },
    { name: "Car", icon: Car },
    { name: "Store", icon: Store },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Signal Diary</h1>
                <p className="text-gray-600">Track your phone signal issues</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/history">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="log" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="log">Log Issue</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="log" className="space-y-6">
            {/* Issue Type Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-red-200 hover:border-red-300 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <PhoneOff className="w-12 h-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-red-800 mb-2">No Signal</h3>
                  <p className="text-gray-600 text-sm mb-4">Can't make calls or use data</p>
                  <Button
                    className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-lg"
                    onClick={() => {
                      if (recentLocations.length > 0) {
                        handleLogIssue("no_signal", recentLocations[0])
                      } else {
                        setShowCustomLocation(true)
                      }
                    }}
                  >
                    Log No Signal
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">Call Failed</h3>
                  <p className="text-gray-600 text-sm mb-4">Call dropped or wouldn't connect</p>
                  <Button
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white text-lg"
                    onClick={() => {
                      if (recentLocations.length > 0) {
                        handleLogIssue("call_failed", recentLocations[0])
                      } else {
                        setShowCustomLocation(true)
                      }
                    }}
                  >
                    Log Call Failed
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 hover:border-yellow-300 transition-colors cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <MessageSquareX className="w-12 h-12 text-yellow-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-yellow-800 mb-2">Message Failed</h3>
                  <p className="text-gray-600 text-sm mb-4">Text message didn't send</p>
                  <Button
                    className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 text-white text-lg"
                    onClick={() => {
                      if (recentLocations.length > 0) {
                        handleLogIssue("message_failed", recentLocations[0])
                      } else {
                        setShowCustomLocation(true)
                      }
                    }}
                  >
                    Log Message Failed
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Location Selection */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Where did this happen?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recent Locations */}
                {recentLocations.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Recent locations:</p>
                    <div className="flex flex-wrap gap-2">
                      {recentLocations.slice(0, 5).map((location, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() => handleLogIssue("no_signal", location)}
                        >
                          <MapPin className="w-3 h-3 mr-1" />
                          {location}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Locations */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Common locations:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {commonLocations.map((loc) => (
                      <Button
                        key={loc.name}
                        variant="outline"
                        size="sm"
                        className="bg-transparent justify-start"
                        onClick={() => handleLogIssue("no_signal", loc.name)}
                      >
                        <loc.icon className="w-3 h-3 mr-2" />
                        {loc.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Location */}
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                    onClick={() => setShowCustomLocation(!showCustomLocation)}
                  >
                    <Plus className="w-3 h-3 mr-2" />
                    Add custom location
                  </Button>

                  {showCustomLocation && (
                    <div className="mt-2 flex gap-2">
                      <Input
                        placeholder="Enter location (e.g., Porch, Basement)"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          if (customLocation.trim()) {
                            handleLogIssue("no_signal", customLocation.trim())
                          }
                        }}
                        disabled={!customLocation.trim()}
                      >
                        Use
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            {/* Weekly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-amber-200">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.total}</p>
                  <p className="text-sm text-gray-600">Total Issues</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardContent className="p-4 text-center">
                  <PhoneOff className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.no_signal}</p>
                  <p className="text-sm text-gray-600">No Signal</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-4 text-center">
                  <Phone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.call_failed}</p>
                  <p className="text-sm text-gray-600">Call Failed</p>
                </CardContent>
              </Card>

              <Card className="border-yellow-200">
                <CardContent className="p-4 text-center">
                  <MessageSquareX className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{weeklyStats.message_failed}</p>
                  <p className="text-sm text-gray-600">Message Failed</p>
                </CardContent>
              </Card>
            </div>

            {/* Most Common Locations */}
            {recentLocations.length > 0 && (
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Most Common Problem Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentLocations.slice(0, 5).map((location, index) => {
                      const locationCount = logs.filter((log) => log.location === location).length
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{location}</span>
                          <Badge variant="secondary">{locationCount} issues</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            {recentLogs.length > 0 ? (
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={issueTypeColors[log.type]}>{issueTypeLabels[log.type]}</Badge>
                          <div>
                            <p className="font-medium">{log.location}</p>
                            <p className="text-sm text-gray-600">{format(new Date(log.timestamp), "MMM d, h:mm a")}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-amber-200">
                <CardContent className="p-8 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No issues logged yet</h3>
                  <p className="text-gray-600 mb-4">Start logging signal problems to see your activity here.</p>
                  <Button onClick={() => document.querySelector('[value="log"]')?.click()}>Log Your First Issue</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/export">
            <Button variant="outline" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </Link>
          <Link href="/patterns">
            <Button variant="outline" className="bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Patterns
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
