"use client"

import { useEffect } from "react"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming
          console.log("Navigation timing:", {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            firstPaint: navEntry.responseEnd - navEntry.requestStart,
          })
        }

        if (entry.entryType === "paint") {
          console.log(`${entry.name}: ${entry.startTime}ms`)
        }

        if (entry.entryType === "largest-contentful-paint") {
          console.log(`LCP: ${entry.startTime}ms`)
        }

        if (entry.entryType === "first-input") {
          const fidEntry = entry as PerformanceEventTiming
          console.log(`FID: ${fidEntry.processingStart - fidEntry.startTime}ms`)
        }

        if (entry.entryType === "layout-shift") {
          const clsEntry = entry as any
          if (!clsEntry.hadRecentInput) {
            console.log(`CLS: ${clsEntry.value}`)
          }
        }
      }
    })

    // Observe different entry types
    try {
      observer.observe({ entryTypes: ["navigation", "paint"] })
      observer.observe({ entryTypes: ["largest-contentful-paint"] })
      observer.observe({ entryTypes: ["first-input"] })
      observer.observe({ entryTypes: ["layout-shift"] })
    } catch (error) {
      console.log("Performance observer not supported:", error)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
