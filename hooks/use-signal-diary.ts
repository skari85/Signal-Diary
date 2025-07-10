"use client"

import { useState, useEffect, useCallback } from "react"

export interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
  notes?: string
}

export interface UserSettings {
  name: string
  address: string
  phoneNumber: string
  networkProvider: string
}

const STORAGE_KEY = "signal-diary-logs"
const SETTINGS_KEY = "signal-diary-settings"

export function useSignalDiary() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    address: "",
    phoneNumber: "",
    networkProvider: "",
  })
  const [recentLocations, setRecentLocations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage
  const loadData = useCallback(() => {
    try {
      // Load logs
      const savedLogs = localStorage.getItem(STORAGE_KEY)
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs) as LogEntry[]
        if (Array.isArray(parsedLogs)) {
          setLogs(parsedLogs)

          // Extract recent locations
          const locations = parsedLogs
            .map((log) => log.location)
            .filter((loc): loc is string => Boolean(loc) && loc !== "Not specified" && loc !== "Unknown")

          const uniqueLocations = Array.from(new Set(locations)).slice(0, 10)
          setRecentLocations(uniqueLocations)
        }
      }

      // Load settings
      const savedSettings = localStorage.getItem(SETTINGS_KEY)
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings) as UserSettings
        setSettings(parsedSettings)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save logs to localStorage
  const saveLogs = useCallback((newLogs: LogEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs))
    } catch (error) {
      console.error("Error saving logs:", error)
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: UserSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
    } catch (error) {
      console.error("Error saving settings:", error)
    }
  }, [])

  // Add new log entry
  const addLogEntry = useCallback(
    (type: LogEntry["type"], location: string, notes?: string) => {
      const newEntry: LogEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        location: location || "Not specified",
        timestamp: new Date().toISOString(),
        notes,
      }

      const updatedLogs = [newEntry, ...logs]
      setLogs(updatedLogs)
      saveLogs(updatedLogs)

      // Update recent locations
      if (location && location !== "Not specified" && location !== "Unknown") {
        const newRecentLocations = [location, ...recentLocations.filter((loc) => loc !== location)].slice(0, 10)
        setRecentLocations(newRecentLocations)
      }

      return newEntry
    },
    [logs, recentLocations, saveLogs],
  )

  // Delete log entry
  const deleteLogEntry = useCallback(
    (id: string) => {
      const updatedLogs = logs.filter((log) => log.id !== id)
      setLogs(updatedLogs)
      saveLogs(updatedLogs)
    },
    [logs, saveLogs],
  )

  // Update settings
  const updateSettings = useCallback(
    (newSettings: Partial<UserSettings>) => {
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)
      saveSettings(updatedSettings)
    },
    [settings, saveSettings],
  )

  // Clear all data
  const clearAllData = useCallback(() => {
    setLogs([])
    setRecentLocations([])
    setSettings({
      name: "",
      address: "",
      phoneNumber: "",
      networkProvider: "",
    })
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(SETTINGS_KEY)
  }, [])

  // Get weekly stats
  const getWeeklyStats = useCallback(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const weeklyLogs = logs.filter((log) => new Date(log.timestamp) >= oneWeekAgo)

    return {
      total: weeklyLogs.length,
      noSignal: weeklyLogs.filter((log) => log.type === "no-signal").length,
      callFailed: weeklyLogs.filter((log) => log.type === "call-failed").length,
      messageFailed: weeklyLogs.filter((log) => log.type === "message-failed").length,
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

  // Export data
  const exportData = useCallback(() => {
    const csvContent = [
      "Date,Time,Issue Type,Location,Notes",
      ...logs.map((log) => {
        const date = new Date(log.timestamp)
        const issueType = log.type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
        return `${date.toLocaleDateString()},${date.toLocaleTimeString()},${issueType},"${log.location}","${log.notes || ""}"`
      }),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `signal-diary-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [logs])

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    logs,
    settings,
    recentLocations,
    isLoading,
    addLogEntry,
    deleteLogEntry,
    updateSettings,
    clearAllData,
    getWeeklyStats,
    getLogsByType,
    getLogsByLocation,
    exportData,
  }
}
