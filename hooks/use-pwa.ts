"use client"

import { useState, useEffect } from "react"

interface PWAHook {
  isInstalled: boolean
  isOnline: boolean
  canInstall: boolean
  installApp: () => Promise<void>
}

export function usePWA(): PWAHook {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      if (typeof window !== "undefined") {
        const isStandalone =
          window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
        setIsInstalled(isStandalone)
      }
    }

    // Check online status
    const updateOnlineStatus = () => {
      if (typeof navigator !== "undefined") {
        setIsOnline(navigator.onLine)
      }
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    checkInstalled()
    updateOnlineStatus()

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.addEventListener("appinstalled", handleAppInstalled)
      window.addEventListener("online", updateOnlineStatus)
      window.addEventListener("offline", updateOnlineStatus)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        window.removeEventListener("appinstalled", handleAppInstalled)
        window.removeEventListener("online", updateOnlineStatus)
        window.removeEventListener("offline", updateOnlineStatus)
      }
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) {
      throw new Error("Install prompt not available")
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("User accepted the install prompt")
      }

      setDeferredPrompt(null)
    } catch (error) {
      console.error("Error installing app:", error)
      throw error
    }
  }

  return {
    isInstalled,
    isOnline,
    canInstall: !!deferredPrompt,
    installApp,
  }
}
