"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X } from "lucide-react"
import { usePWA } from "@/hooks/use-pwa"

export default function PWAInstallPrompt() {
  const { canInstall, install, isInstalled } = usePWA()
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("pwa-install-dismissed")
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("pwa-install-dismissed", "true")
  }

  const handleInstall = async () => {
    const success = await install()
    if (success) {
      setIsDismissed(true)
    }
  }

  if (!canInstall || isInstalled || isDismissed) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 shadow-lg border-2 md:left-auto md:right-4 md:w-80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-lg">Install Signal Diary</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-6 w-6 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>Install the app for quick access and offline use</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={handleInstall} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Install
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Not now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
