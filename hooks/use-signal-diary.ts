"use client"

import { useState, useEffect } from "react"

export interface LogEntry {
  id: string
  type: "no_signal" | "call_failed" | "message_failed"
  location: string
  timestamp: string
  notes?: string
}

export function useSignalDiary() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLogs = localStorage.getItem("signal-diary-logs")
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs) as LogEntry[]
        setLogs(Array.isArray(parsedLogs) ? parsedLogs : [])
      } catch (error) {
        console.error("Error parsing saved logs:", error)
        setLogs([])
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("signal-diary-logs", JSON.stringify(logs))
    }
  }, [logs, mounted])

  const addLog = (entry: Omit<LogEntry, "id">) => {
    const newEntry: LogEntry = {
      ...entry,
      id: Date.now().toString(),
    }
    setLogs((prev) => [...prev, newEntry])
  }

  const deleteLog = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id))
  }

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weeklyLogs = logs.filter((log) => new Date(log.timestamp) >= oneWeekAgo)

    return {
      total: weeklyLogs.length,
      no_signal: weeklyLogs.filter((log) => log.type === "no_signal").length,
      call_failed: weeklyLogs.filter((log) => log.type === "call_failed").length,
      message_failed: weeklyLogs.filter((log) => log.type === "message_failed").length,
    }
  }

  const getRecentLocations = (): string[] => {
    const locationCounts = logs.reduce(
      (acc, log) => {
        acc[log.location] = (acc[log.location] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(locationCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([location]) => location)
      .filter((location): location is string => Boolean(location))
  }

  const exportData = () => {
    const csvContent = [
      "Date,Time,Issue Type,Location,Notes",
      ...logs.map((log) => {
        const date = new Date(log.timestamp)
        return `${date.toLocaleDateString()},${date.toLocaleTimeString()},${log.type.replace("_", " ")},${log.location},"${log.notes || ""}"`
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `signal-diary-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    logs,
    addLog,
    deleteLog,
    getWeeklyStats,
    getRecentLocations,
    exportData,
  }
}
