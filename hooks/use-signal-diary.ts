"use client"

import { useState, useEffect, useCallback } from "react"

export interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

const STORAGE_KEY = "signal-diary-logs"

export function useSignalDiary() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load logs from localStorage
  const loadLogs = useCallback(() => {
    try {
      const savedLogs = localStorage.getItem(STORAGE_KEY)
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs) as LogEntry[]
        setLogs(parsedLogs)

        // Extract recent locations
        const locations = parsedLogs
          .map((log) => log.location)
          .filter((loc): loc is string => loc !== null && loc !== undefined && loc !== "Not specified")

        const uniqueLocations = Array.from(new Set(locations)).slice(0, 5)
        setRecentLocations(uniqueLocations)
      }
    } catch (error) {
      console.error("Error loading logs:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Add new log entry
  const addLogEntry = useCallback(
    async (type: LogEntry["type"], location: string) => {
      const finalLocation = location || "Not specified"

      const newEntry: LogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        location: finalLocation,
        timestamp: new Date().toISOString(),
      }

      try {
        const updatedLogs = [newEntry, ...logs]
        setLogs(updatedLogs)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))

        // Update recent locations
        if (finalLocation !== "Not specified") {
          const newRecentLocations = [finalLocation, ...recentLocations.filter((loc) => loc !== finalLocation)].slice(
            0,
            5,
          )
          setRecentLocations(newRecentLocations)
        }

        return newEntry
      } catch (error) {
        console.error("Error adding log entry:", error)
        throw error
      }
    },
    [logs, recentLocations],
  )

  // Delete log entry
  const deleteLogEntry = useCallback(
    (id: string) => {
      try {
        const updatedLogs = logs.filter((log) => log.id !== id)
        setLogs(updatedLogs)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs))
      } catch (error) {
        console.error("Error deleting log entry:", error)
        throw error
      }
    },
    [logs],
  )

  // Clear all logs
  const clearLogs = useCallback(() => {
    try {
      setLogs([])
      setRecentLocations([])
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Error clearing logs:", error)
      throw error
    }
  }, [])

  // Export logs as JSON
  const exportLogs = useCallback(() => {
    try {
      const dataStr = JSON.stringify(logs, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `signal-diary-logs-${new Date().toISOString().split("T")[0]}.json`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error exporting logs:", error)
      throw error
    }
  }, [logs])

  // Get logs by type
  const getLogsByType = useCallback(
    (type: LogEntry["type"]) => {
      return logs.filter((log) => log.type === type)
    },
    [logs],
  )

  // Get logs by location
  const getLogsByLocation = useCallback(
    (location: string) => {
      return logs.filter((log) => log.location === location)
    },
    [logs],
  )

  // Get logs by date range
  const getLogsByDateRange = useCallback(
    (startDate: Date, endDate: Date) => {
      return logs.filter((log) => {
        const logDate = new Date(log.timestamp)
        return logDate >= startDate && logDate <= endDate
      })
    },
    [logs],
  )

  // Load logs on mount
  useEffect(() => {
    loadLogs()
  }, [loadLogs])

  return {
    logs,
    recentLocations,
    isLoading,
    addLogEntry,
    deleteLogEntry,
    clearLogs,
    exportLogs,
    getLogsByType,
    getLogsByLocation,
    getLogsByDateRange,
    loadLogs,
  }
}
