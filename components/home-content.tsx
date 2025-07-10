"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useSignalDiary } from "@/hooks/use-signal-diary"
import { useToast } from "@/hooks/use-toast"
import { Phone, PhoneOff, MessageSquareX, MapPin, Clock, Plus } from "lucide-react"
import { format } from "date-fns"

const issueTypes = [
  { value: "no-signal", label: "No Signal", icon: PhoneOff, color: "bg-red-500" },
  { value: "call-failed", label: "Call Failed", icon: Phone, color: "bg-orange-500" },
  { value: "message-failed", label: "Message Failed", icon: MessageSquareX, color: "bg-yellow-500" },
] as const

export default function HomeContent() {
  const { data, addLogEntry, isLoading } = useSignalDiary()
  const { toast } = useToast()

  const [selectedType, setSelectedType] = useState<string>("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedType || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select an issue type and enter a location.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      addLogEntry(selectedType as any, location.trim(), notes.trim() || undefined)

      toast({
        title: "Issue Logged",
        description: `${issueTypes.find((t) => t.value === selectedType)?.label} recorded for ${location}`,
      })

      // Reset form
      setSelectedType("")
      setLocation("")
      setNotes("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log the issue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuickLocation = (quickLocation: string) => {
    setLocation(quickLocation)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Signal Diary</h1>
        <p className="text-muted-foreground">Track phone signal issues to help improve your network experience</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">No Signal</span>
              <Badge variant="secondary">{data.entries.filter((e) => e.type === "no-signal").length}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium">Call Failed</span>
              <Badge variant="secondary">{data.entries.filter((e) => e.type === "call-failed").length}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium">Message Failed</span>
              <Badge variant="secondary">{data.entries.filter((e) => e.type === "message-failed").length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log New Issue Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Log New Issue
          </CardTitle>
          <CardDescription>Record a phone signal problem you're experiencing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of issue" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where did this happen? (e.g., Home, Main Street, Doctor's Office)"
                className="w-full"
              />

              {/* Quick Location Buttons */}
              {(data.recentLocations.length > 0 || data.commonLocations.length > 0) && (
                <div className="space-y-2">
                  {data.recentLocations.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Recent Locations</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.recentLocations.slice(0, 5).map((loc, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickLocation(loc)}
                            className="text-xs h-7"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {loc}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.commonLocations.length > 0 && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Common Locations</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {data.commonLocations.slice(0, 5).map((loc, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickLocation(loc)}
                            className="text-xs h-7"
                          >
                            <MapPin className="w-3 h-3 mr-1" />
                            {loc}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details about the issue..."
                className="min-h-[80px]"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Logging Issue..." : "Log Issue"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      {data.entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Your latest signal problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.entries.slice(0, 5).map((entry) => {
                const issueType = issueTypes.find((t) => t.value === entry.type)
                const Icon = issueType?.icon || Phone

                return (
                  <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${issueType?.color || "bg-gray-500"}`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{issueType?.label}</span>
                        <span className="text-sm text-muted-foreground">at {entry.location}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(entry.timestamp, "MMM d, yyyy h:mm a")}
                      </div>
                      {entry.notes && <div className="text-sm mt-1 text-muted-foreground">{entry.notes}</div>}
                    </div>
                  </div>
                )
              })}

              {data.entries.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm">
                    View All Issues ({data.entries.length})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
