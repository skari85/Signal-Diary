"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SignalZero, PhoneOff, MessageSquareX, History, Download, User, MapPin } from "lucide-react"
import Link from "next/link"
import OptimizedImage from "./optimized-image"

// Add these imports at the top
import PWAInstallPrompt from "./pwa-install-prompt"
import OfflineIndicator from "./offline-indicator"
import Onboarding from "./onboarding"
import HelpTooltip from "./help-tooltip"
import LoadingSpinner from "./loading-spinner"
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

export default function HomeContent() {
  const [location, setLocation] = useState("")
  const [useDropdown, setUseDropdown] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { addLogEntry, recentLocations } = useSignalDiary()

  // Memoize the addLogEntry function
  const handleAddLogEntry = useCallback(async (type: "no-signal" | "call-failed" | "message-failed") => {
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      await addLogEntry(type, location)
      setLocation("")
      toast({
        title: "Log submitted!",
        description: `Issue logged successfully in ${location || "Not specified"}.`,
      })
    } catch (error) {
      console.error('Error logging entry:', error)
      toast({
        title: "Failed to log issue",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [addLogEntry, location, isSubmitting])

  // Memoize location select handler
  const handleLocationSelect = useCallback((value: string) => {
    if (value === "Other") {
      setUseDropdown(false)
      setLocation("")
    } else {
      setLocation(value)
    }
  }, [])

  // Memoize switch to dropdown handler
  const switchToDropdown = useCallback(() => {
    setUseDropdown(true)
    setLocation("")
  }, [])

  // Memoize action buttons to prevent unnecessary re-renders
  const actionButtons = useMemo(() => [
    {
      type: "no-signal" as const,
      label: "No Signal",
      icon: SignalZero,
      className: "bg-red-500 hover:bg-red-600",
      disabled: isSubmitting
    },
    {
      type: "call-failed" as const,
      label: "Call Failed", 
      icon: PhoneOff,
      className: "bg-orange-500 hover:bg-orange-600",
      disabled: isSubmitting
    },
    {
      type: "message-failed" as const,
      label: "Message Didn't Send",
      icon: MessageSquareX,
      className: "bg-blue-500 hover:bg-blue-600", 
      disabled: isSubmitting
    }
  ], [isSubmitting])

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

        {/* Location Selection */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center text-slate-700 flex items-center justify-center gap-2">
              <MapPin className="w-6 h-6" />
              Where did it happen?
              <HelpTooltip 
                title="Location Tracking"
                content="Choose where the signal issue occurred. This helps identify problem areas in your home and provides better evidence when contacting your phone company."
              />
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
                  className="w-full h-10 text-sm border-2 border-slate-300 rounded-lg bg-transparent hover:bg-slate-50"
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
            {actionButtons.map(({ type, label, icon: Icon, className, disabled }) => (
              <Button
                key={type}
                onClick={() => handleAddLogEntry(type)}
                className={`w-full h-16 text-xl text-white font-semibold rounded-xl shadow-md ${className}`}
                disabled={disabled}
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Icon className="w-8 h-8 mr-3" />
                )}
                {label}
              </Button>
            ))}
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
        
        {/* Onboarding */}
        <Onboarding />
      </div>
    </div>
  )
}
