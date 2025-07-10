"use client"

import { useState, useEffect, useCallback } from "react"

export interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: Date
  notes?: string
}

export interface SignalDiaryData {
  entries: LogEntry[]
  recentLocations: string[]
  commonLocations: string[]
}

const STORAGE_KEY = "signal-diary-data"

export function useSignalDiary() {
  const [data, setData] = useState<SignalDiaryData>({
    entries: [],
    recentLocations: [],
    commonLocations: [],
  })

  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Convert timestamp strings back to Date objects
        const entries = parsed.entries.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }))
        setData({
          ...parsed,
          entries,
        })
      }
    } catch (error) {
      console.error("Error loading signal diary data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save data to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
        console.error("Error saving signal diary data:", error)
      }
    }
  }, [data, isLoading])

  const addLogEntry = useCallback((type: LogEntry["type"], location: string, notes?: string) => {
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      type,
      location,
      timestamp: new Date(),
      notes,
    }

    setData((prevData) => {
      const newEntries = [newEntry, ...prevData.entries]

      // Update recent locations (keep last 10, most recent first)
      const newRecentLocations = [location, ...prevData.recentLocations.filter((loc) => loc !== location)].slice(0, 10)

      // Update common locations (locations with 2+ entries)
      const locationCounts = newEntries.reduce(
        (acc, entry) => {
          acc[entry.location] = (acc[entry.location] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const newCommonLocations = Object.entries(locationCounts)
        .filter(([, count]) => count >= 2)
        .sort(([, a], [, b]) => b - a)
        .map(([location]) => location)
        .slice(0, 10)

      return {
        entries: newEntries,
        recentLocations: newRecentLocations,
        commonLocations: newCommonLocations,
      }
    })
  }, [])

  const deleteLogEntry = useCallback((id: string) => {
    setData((prevData) => ({
      ...prevData,
      entries: prevData.entries.filter((entry) => entry.id !== id),
    }))
  }, [])

  const clearAllData = useCallback(() => {
    setData({
      entries: [],
      recentLocations: [],
      commonLocations: [],
    })
  }, [])

  const exportData = useCallback(() => {
    return {
      exportDate: new Date().toISOString(),
      totalEntries: data.entries.length,
      entries: data.entries,
      summary: {
        noSignalCount: data.entries.filter((e) => e.type === "no-signal").length,
        callFailedCount: data.entries.filter((e) => e.type === "call-failed").length,
        messageFailedCount: data.entries.filter((e) => e.type === "message-failed").length,
        mostCommonLocations: data.commonLocations.slice(0, 5),
        dateRange:
          data.entries.length > 0
            ? {
                from: new Date(Math.min(...data.entries.map((e) => e.timestamp.getTime()))).toISOString(),
                to: new Date(Math.max(...data.entries.map((e) => e.timestamp.getTime()))).toISOString(),
              }
            : null,
      },
    }
  }, [data])

  return {
    data,
    isLoading,
    addLogEntry,
    deleteLogEntry,
    clearAllData,
    exportData,
  }
}
