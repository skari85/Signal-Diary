"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, TrendingUp, MapPin, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

interface LocationStats {
  location: string
  count: number
  percentage: number
  issues: { type: string; count: number }[]
}

interface TimeStats {
  period: string
  count: number
  percentage: number
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

const getTypeColor = (type: string) => {
  switch (type) {
    case "no-signal":
      return "bg-red-500"
    case "call-failed":
      return "bg-orange-500"
    case "message-failed":
      return "bg-blue-500"
    default:
      return "bg-gray-500"
  }
}

export default function PatternsContent() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [timeframe, setTimeframe] = useState<string>("week")
  const [locationStats, setLocationStats] = useState<LocationStats[]>([])
  const [timeStats, setTimeStats] = useState<TimeStats[]>([])
  const [issueTypeStats, setIssueTypeStats] = useState<{ type: string; count: number; percentage: number }[]>([])

  useEffect(() => {
    const savedLogs = localStorage.getItem("signal-diary-logs")
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs)
      setLogs(parsedLogs)
      analyzePatterns(parsedLogs, timeframe)
    }
  }, [timeframe])

  const analyzePatterns = (allLogs: LogEntry[], period: string) => {
    // Filter logs by timeframe
    const now = new Date()
    const cutoffDate = new Date()

    if (period === "week") {
      cutoffDate.setDate(now.getDate() - 7)
    } else if (period === "month") {
      cutoffDate.setMonth(now.getMonth() - 1)
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    }

    const filteredLogs = allLogs.filter((log) => new Date(log.timestamp) >= cutoffDate)

    // Analyze locations
    const locationCounts = filteredLogs.reduce(
      (acc, log) => {
        const location = log.location === "Not specified" ? "Unspecified" : log.location
        if (!acc[location]) {
          acc[location] = { total: 0, issues: {} }
        }
        acc[location].total++
        if (!acc[location].issues[log.type]) {
          acc[location].issues[log.type] = 0
        }
        acc[location].issues[log.type]++
        return acc
      },
      {} as Record<string, { total: number; issues: Record<string, number> }>,
    )

    const locationStatsData = Object.entries(locationCounts)
      .map(([location, data]) => ({
        location,
        count: data.total,
        percentage: Math.round((data.total / filteredLogs.length) * 100),
        issues: Object.entries(data.issues).map(([type, count]) => ({ type, count })),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    setLocationStats(locationStatsData)

    // Analyze issue types
    const typeCounts = filteredLogs.reduce(
      (acc, log) => {
        acc[log.type] = (acc[log.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const issueTypeStatsData = Object.entries(typeCounts)
      .map(([type, count]) => ({
        type,
        count,
        percentage: Math.round((count / filteredLogs.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    setIssueTypeStats(issueTypeStatsData)

    // Analyze time patterns
    const timePatterns = filteredLogs.reduce(
      (acc, log) => {
        const hour = new Date(log.timestamp).getHours()
        let timeOfDay = ""

        if (hour >= 5 && hour < 12) timeOfDay = "Morning (5AM-12PM)"
        else if (hour >= 12 && hour < 17) timeOfDay = "Afternoon (12PM-5PM)"
        else if (hour >= 17 && hour < 21) timeOfDay = "Evening (5PM-9PM)"
        else timeOfDay = "Night (9PM-5AM)"

        acc[timeOfDay] = (acc[timeOfDay] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const timeStatsData = Object.entries(timePatterns)
      .map(([period, count]) => ({
        period,
        count,
        percentage: Math.round((count / filteredLogs.length) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    setTimeStats(timeStatsData)
  }

  const getPeriodLabel = () => {
    switch (timeframe) {
      case "week":
        return "this week"
      case "month":
        return "this month"
      case "year":
        return "this year"
      default:
        return "this week"
    }
  }

  const getInsight = () => {
    if (logs.length === 0) return null

    const topLocation = locationStats[0]
    const topTime = timeStats[0]
    const topIssue = issueTypeStats[0]

    if (!topLocation || !topTime || !topIssue) return null

    const insights = []

    if (topLocation.count > 1) {
      insights.push(`Most problems happen in the ${topLocation.location.toLowerCase()} (${topLocation.count} issues)`)
    }

    if (topTime.count > 1 && topTime.percentage > 40) {
      insights.push(`${topTime.percentage}% of issues occur in the ${topTime.period.toLowerCase()}`)
    }

    if (topIssue.count > 1) {
      insights.push(`${getTypeLabel(topIssue.type)} is your most common issue (${topIssue.count} times)`)
    }

    return insights.length > 0 ? insights : null
  }

  const filteredLogsCount = (() => {
    const now = new Date()
    const cutoffDate = new Date()

    if (timeframe === "week") {
      cutoffDate.setDate(now.getDate() - 7)
    } else if (timeframe === "month") {
      cutoffDate.setMonth(now.getMonth() - 1)
    } else {
      cutoffDate.setFullYear(now.getFullYear() - 1)
    }

    return logs.filter((log) => new Date(log.timestamp) >= cutoffDate).length
  })()

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
          <h1 className="text-2xl font-bold text-slate-800">Signal Patterns</h1>
        </div>

        {/* Timeframe Selector */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-slate-600" />
              <label className="text-lg font-medium text-slate-700">Time Period</label>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="h-12 text-lg border-2 border-slate-300 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-2 border-purple-200 bg-purple-50 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-purple-900 mb-2">
                {filteredLogsCount} issues {getPeriodLabel()}
              </h2>
              {filteredLogsCount === 0 ? (
                <p className="text-purple-700">No signal issues recorded {getPeriodLabel()}. Great job!</p>
              ) : (
                <p className="text-purple-700">Here are your signal issue patterns</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        {getInsight() && (
          <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getInsight()?.map((insight, index) => (
                  <p key={index} className="text-blue-800 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    {insight}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Location Breakdown */}
        {locationStats.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Issues by Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {locationStats.map((stat, index) => (
                  <div key={stat.location} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{stat.location}</span>
                      <span className="text-sm text-slate-600">
                        {stat.count} issues ({stat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      {stat.issues.map((issue) => (
                        <span key={issue.type} className="bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {getTypeLabel(issue.type)}: {issue.count}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Issue Type Breakdown */}
        {issueTypeStats.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700">Issue Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {issueTypeStats.map((stat) => (
                  <div key={stat.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{getTypeLabel(stat.type)}</span>
                      <span className="text-sm text-slate-600">
                        {stat.count} times ({stat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`${getTypeColor(stat.type)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Time of Day Breakdown */}
        {timeStats.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeStats.map((stat) => (
                  <div key={stat.period} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-800">{stat.period}</span>
                      <span className="text-sm text-slate-600">
                        {stat.count} issues ({stat.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Data State */}
        {filteredLogsCount === 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <p className="text-lg text-slate-600 mb-2">No signal issues {getPeriodLabel()}</p>
              <p className="text-slate-500">Start logging issues to see patterns and insights</p>
              <Link href="/" className="inline-block mt-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Log Your First Issue</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/history">
            <Button className="w-full h-12 text-lg bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
              View History
            </Button>
          </Link>
          <Link href="/export">
            <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
              Export Data
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
