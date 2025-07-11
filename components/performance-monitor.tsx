"use client"

import { useEffect } from "react"

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime)
        }
        if (entry.entryType === "first-input") {
          console.log("FID:", (entry as any).processingStart - entry.startTime)
        }
        if (entry.entryType === "layout-shift") {
          if (!(entry as any).hadRecentInput) {
            console.log("CLS:", (entry as any).value)
          }
        }
      }
    })

    try {
      observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })
    } catch (error) {
      // Ignore if not supported
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
