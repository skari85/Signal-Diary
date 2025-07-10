"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, MapPin, Save, Trash2, Phone, Wifi } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  name: string
  address: string
  networkProvider: string
  customProvider: string
  phoneNumber: string
}

const NETWORK_PROVIDERS = [
  { value: "verizon", label: "Verizon" },
  { value: "att", label: "AT&T" },
  { value: "tmobile", label: "T-Mobile" },
  { value: "sprint", label: "Sprint" },
  { value: "uscellular", label: "U.S. Cellular" },
  { value: "cricket", label: "Cricket Wireless" },
  { value: "boost", label: "Boost Mobile" },
  { value: "metro", label: "Metro by T-Mobile" },
  { value: "straight-talk", label: "Straight Talk" },
  { value: "tracfone", label: "TracFone" },
  { value: "consumer-cellular", label: "Consumer Cellular" },
  { value: "xfinity", label: "Xfinity Mobile" },
  { value: "visible", label: "Visible" },
  { value: "mint", label: "Mint Mobile" },
  { value: "other", label: "Other" },
]

export default function SettingsContent() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    address: "",
    networkProvider: "",
    customProvider: "",
    phoneNumber: "",
  })
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load saved profile
    const savedProfile = localStorage.getItem("signal-diary-profile")
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      // Handle legacy profiles that might not have new fields
      setProfile({
        name: parsed.name || "",
        address: parsed.address || "",
        networkProvider: parsed.networkProvider || "",
        customProvider: parsed.customProvider || "",
        phoneNumber: parsed.phoneNumber || "",
      })
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("signal-diary-profile", JSON.stringify(profile))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const handleClear = () => {
    if (confirm("Are you sure you want to clear your information?")) {
      setProfile({
        name: "",
        address: "",
        networkProvider: "",
        customProvider: "",
        phoneNumber: "",
      })
      localStorage.removeItem("signal-diary-profile")
    }
  }

  const clearAllData = () => {
    if (
      confirm(
        "Are you sure you want to delete ALL your data? This will remove your profile and all logged signal issues. This cannot be undone.",
      )
    ) {
      localStorage.removeItem("signal-diary-profile")
      localStorage.removeItem("signal-diary-logs")
      localStorage.removeItem("pwa-install-dismissed")
      setProfile({
        name: "",
        address: "",
        networkProvider: "",
        customProvider: "",
        phoneNumber: "",
      })
      alert("All data has been cleared.")
    }
  }

  const getProviderDisplayName = () => {
    if (profile.networkProvider === "other" && profile.customProvider) {
      return profile.customProvider
    }
    const provider = NETWORK_PROVIDERS.find((p) => p.value === profile.networkProvider)
    return provider?.label || ""
  }

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
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        </div>

        {/* Profile Information */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
              <User className="w-6 h-6" />
              Your Information
            </CardTitle>
            <p className="text-sm text-slate-600">
              This information is optional and stored only on your device. It will be included in exported reports to
              help caregivers and network providers.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your full name"
                className="h-12 text-lg border-2 border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-slate-700 mb-2">
                <Phone className="w-5 h-5 inline mr-1" />
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                value={profile.phoneNumber}
                onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                placeholder="Enter your phone number"
                className="h-12 text-lg border-2 border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-lg font-medium text-slate-700 mb-2">
                <MapPin className="w-5 h-5 inline mr-1" />
                Your Address
              </label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                placeholder="Enter your home address&#10;(Street, City, State, ZIP)"
                className="min-h-[100px] text-lg border-2 border-slate-300 rounded-lg resize-none"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Network Provider */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
              <Wifi className="w-6 h-6" />
              Network Provider
            </CardTitle>
            <p className="text-sm text-slate-600">
              Select your phone service provider. This helps route your reports to the right support team.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="provider" className="block text-lg font-medium text-slate-700 mb-2">
                Your Phone Service Provider
              </label>
              <Select
                value={profile.networkProvider}
                onValueChange={(value) => setProfile({ ...profile, networkProvider: value })}
              >
                <SelectTrigger className="h-12 text-lg border-2 border-slate-300 rounded-lg">
                  <SelectValue placeholder="Select your provider" />
                </SelectTrigger>
                <SelectContent>
                  {NETWORK_PROVIDERS.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {profile.networkProvider === "other" && (
              <div>
                <label htmlFor="custom-provider" className="block text-lg font-medium text-slate-700 mb-2">
                  Provider Name
                </label>
                <Input
                  id="custom-provider"
                  value={profile.customProvider}
                  onChange={(e) => setProfile({ ...profile, customProvider: e.target.value })}
                  placeholder="Enter your provider name"
                  className="h-12 text-lg border-2 border-slate-300 rounded-lg"
                />
              </div>
            )}

            {getProviderDisplayName() && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 font-medium">
                  Selected Provider: <span className="font-bold">{getProviderDisplayName()}</span>
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Your reports will include this provider information to help with faster support routing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save/Clear Actions */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="flex-1 h-12 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md"
              >
                <Save className="w-5 h-5 mr-2" />
                {isSaved ? "Saved!" : "Save"}
              </Button>

              <Button
                onClick={handleClear}
                variant="outline"
                className="h-12 px-4 text-lg border-2 border-slate-300 rounded-xl bg-transparent"
                disabled={!profile.name && !profile.address && !profile.networkProvider && !profile.phoneNumber}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            {isSaved && (
              <div className="text-center text-green-700 font-medium mt-3">✓ Your information has been saved</div>
            )}
          </CardContent>
        </Card>

        {/* Privacy Information */}
        <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy & Data</h3>
            <div className="space-y-2 text-blue-800">
              <p className="text-sm">• Your information is stored only on this device</p>
              <p className="text-sm">• Nothing is sent to the internet or shared automatically</p>
              <p className="text-sm">• You control when and how to share your data</p>
              <p className="text-sm">• Provider info helps route reports to the right support team</p>
              <p className="text-sm">• You can clear all data at any time</p>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-2 border-red-200 bg-red-50 shadow-lg">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Data Management</h3>
            <p className="text-sm text-red-800 mb-4">
              This will permanently delete all your information and signal logs. This cannot be undone.
            </p>
            <Button
              onClick={clearAllData}
              className="w-full h-12 text-lg bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-md"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Clear All Data
            </Button>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/history">
            <Button className="w-full h-12 text-lg bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
              View History
            </Button>
          </Link>
          <Link href="/export">
            <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
              Export Log
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
