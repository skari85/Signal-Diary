"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, MapPin, Phone, Trash2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import SponsorButtons from "@/components/sponsor-buttons"

interface UserSettings {
  name: string
  address: string
  phone: string
  networkProvider: string
}

const networkProviders = [
  "Verizon",
  "AT&T",
  "T-Mobile",
  "Sprint",
  "Cricket Wireless",
  "Boost Mobile",
  "Metro by T-Mobile",
  "Straight Talk",
  "TracFone",
  "Consumer Cellular",
  "Xfinity Mobile",
  "Visible",
  "Mint Mobile",
  "Other",
]

export default function SettingsContent() {
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<UserSettings>({
    name: "",
    address: "",
    phone: "",
    networkProvider: "",
  })
  const [customProvider, setCustomProvider] = useState("")
  const [showCustomProvider, setShowCustomProvider] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Load existing settings
    const savedSettings = localStorage.getItem("userSettings")
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings(parsed)

      // Check if provider is custom (not in the list)
      if (parsed.networkProvider && !networkProviders.includes(parsed.networkProvider)) {
        setCustomProvider(parsed.networkProvider)
        setShowCustomProvider(true)
      }
    }
  }, [])

  const saveSettings = () => {
    if (!mounted) return

    const finalProvider = showCustomProvider ? customProvider : settings.networkProvider
    const finalSettings = {
      ...settings,
      networkProvider: finalProvider,
    }

    localStorage.setItem("userSettings", JSON.stringify(finalSettings))
    alert("Settings saved successfully!")
  }

  const clearAllData = () => {
    if (!mounted) return

    const confirmed = confirm(
      "Are you sure you want to clear all data? This will delete:\n\n" +
        "• All signal logs\n" +
        "• Your personal information\n" +
        "• All settings\n\n" +
        "This cannot be undone.",
    )

    if (confirmed) {
      localStorage.removeItem("signalLogs")
      localStorage.removeItem("userSettings")
      setSettings({
        name: "",
        address: "",
        phone: "",
        networkProvider: "",
      })
      setCustomProvider("")
      setShowCustomProvider(false)
      alert("All data has been cleared.")
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button onClick={() => router.back()} variant="outline" size="sm" className="bg-white/80 border-amber-300">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        </div>

        {/* Personal Information */}
        <Card className="mb-6 border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <p className="text-sm text-gray-600">
              Optional - helps create complete reports for caregivers and providers
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="mt-1 text-lg h-12"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="mt-1 text-lg h-12"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="mt-1 text-lg min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Network Provider */}
        <Card className="mb-6 border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Network Provider
            </CardTitle>
            <p className="text-sm text-gray-600">Helps route reports to the right support team</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="provider" className="text-sm font-medium">
                Select Your Provider
              </Label>
              <Select
                value={showCustomProvider ? "Other" : settings.networkProvider}
                onValueChange={(value) => {
                  if (value === "Other") {
                    setShowCustomProvider(true)
                    setSettings({ ...settings, networkProvider: "" })
                  } else {
                    setShowCustomProvider(false)
                    setSettings({ ...settings, networkProvider: value })
                  }
                }}
              >
                <SelectTrigger id="provider" className="text-lg h-12">
                  <SelectValue placeholder="Choose your network provider..." />
                </SelectTrigger>
                <SelectContent>
                  {networkProviders.map((provider) => (
                    <SelectItem key={provider} value={provider} className="text-lg py-3">
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showCustomProvider && (
              <div>
                <Label htmlFor="custom-provider" className="text-sm font-medium">
                  Enter Provider Name
                </Label>
                <Input
                  id="custom-provider"
                  type="text"
                  placeholder="Enter your provider name"
                  value={customProvider}
                  onChange={(e) => setCustomProvider(e.target.value)}
                  className="mt-1 text-lg h-12"
                />
              </div>
            )}

            {(settings.networkProvider || customProvider) && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Selected:</strong> {showCustomProvider ? customProvider : settings.networkProvider}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  This will be included in your exported reports for easier routing to support.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <MapPin className="w-5 h-5" />
              Privacy Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-700">
            <p className="text-sm">
              All information is stored locally on your device only. Nothing is sent to servers or shared unless you
              choose to export your data.
            </p>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="mb-6">
          <SponsorButtons />
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={saveSettings}
            className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg"
          >
            <Save className="w-6 h-6 mr-2" />
            Save Settings
          </Button>

          <Button onClick={clearAllData} variant="destructive" className="w-full h-14 text-lg rounded-xl shadow-lg">
            <Trash2 className="w-6 h-6 mr-2" />
            Clear All Data
          </Button>
        </div>

        {/* Data Summary */}
        <Card className="mt-6 border-amber-200 bg-white/60">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 text-center">
              Your data is stored locally and never shared automatically. Use the Export feature to share reports when
              needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
