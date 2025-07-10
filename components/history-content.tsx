"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, SignalZero, PhoneOff, MessageSquareX, Filter, User, TrendingUp } from "lucide-react"
import Link from "next/link"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

const getIcon = (type: string) => {
  switch (type) {
    case "no-signal":
      return <SignalZero className="w-6 h-6 text-red-500" />
    case "call-failed":
      return <PhoneOff className="w-6 h-6 text-orange-500" />
    case "message-failed":
      return <MessageSquareX className="w-6 h-6 text-blue-500" />
    default:
      return null
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "no-signal":
      return "No Signal"
    case "call-failed":
      return "Call Failed"
    case "message-failed":
      return "Message Didn't Send"
    default:
      return type
  }
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }
}

export default function HistoryContent() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    const savedLogs = localStorage.getItem("signal-diary-logs")
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs)
      setLogs(parsedLogs)
    }
  }, [])

  const filteredLogs = filter === "all" ? logs : logs.filter((log) => log.type === filter)

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <Link href="/">
            <Button variant="outline" size="lg" className="h-12 w-12 rounded-xl border-2 bg-transparent">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Log History</h1>
        </div>

        {/* Filter */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Filter className="w-5 h-5 text-slate-600" />
              <label className="text-lg font-medium text-slate-700">Filter by type</label>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-12 text-lg border-2 border-slate-300 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="no-signal">No Signal</SelectItem>
                <SelectItem value="call-failed">Call Failed</SelectItem>
                <SelectItem value="message-failed">Message Didn't Send</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Log Entries */}
        <div className="space-y-3">
          {filteredLogs.length === 0 ? (
            <Card className="border-2 border-slate-200 shadow-lg">
              <CardContent className="pt-6 text-center">
                <p className="text-lg text-slate-600">No entries found</p>
                <p className="text-slate-500 mt-2">Start logging issues from the home screen</p>
              </CardContent>
            </Card>
          ) : (
            filteredLogs.map((log) => {
              const { date, time } = formatDate(log.timestamp)
              return (
                <Card key={log.id} className="border-2 border-slate-200 shadow-lg">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getIcon(log.type)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-800">{getTypeLabel(log.type)}</h3>
                        <p className="text-slate-600 mt-1 flex items-center gap-1">📍 {log.location}</p>
                        <p className="text-sm text-slate-500 mt-2">
                          {date} at {time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-3 gap-3">
          <Link href="/patterns">
            <Button className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md">
              <TrendingUp className="w-5 h-5 mr-1" />
              Patterns
            </Button>
          </Link>
          <Link href="/export">
            <Button className="w-full h-12 text-base bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
              Export Log
            </Button>
          </Link>
          <Link href="/settings">
            <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md">
              <User className="w-5 h-5 mr-1" />
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
