"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, MapPin, Save, Trash2, Phone, Wifi, HelpCircle, Globe } from "lucide-react"
import Link from "next/link"

interface UserProfile {
  name: string
  address: string
  networkProvider: string
  customProvider: string
  phoneNumber: string
  language: string
  region: string
}

const NETWORK_PROVIDERS = [
  // US Providers
  { value: "verizon", label: "Verizon", region: "US" },
  { value: "att", label: "AT&T", region: "US" },
  { value: "tmobile", label: "T-Mobile", region: "US" },
  { value: "sprint", label: "Sprint", region: "US" },
  { value: "uscellular", label: "U.S. Cellular", region: "US" },
  { value: "cricket", label: "Cricket Wireless", region: "US" },
  { value: "boost", label: "Boost Mobile", region: "US" },
  { value: "metro", label: "Metro by T-Mobile", region: "US" },
  { value: "straight-talk", label: "Straight Talk", region: "US" },
  { value: "tracfone", label: "TracFone", region: "US" },
  { value: "consumer-cellular", label: "Consumer Cellular", region: "US" },
  { value: "xfinity", label: "Xfinity Mobile", region: "US" },
  { value: "visible", label: "Visible", region: "US" },
  { value: "mint", label: "Mint Mobile", region: "US" },
  { value: "google-fi", label: "Google Fi", region: "US" },
  { value: "republic-wireless", label: "Republic Wireless", region: "US" },
  { value: "ting", label: "Ting", region: "US" },
  { value: "project-fi", label: "Project Fi", region: "US" },
  
  // Spanish Providers
  { value: "movistar", label: "Movistar", region: "ES" },
  { value: "vodafone-es", label: "Vodafone España", region: "ES" },
  { value: "orange-es", label: "Orange España", region: "ES" },
  { value: "yoigo", label: "Yoigo", region: "ES" },
  { value: "masmovil", label: "MásMóvil", region: "ES" },
  { value: "jazztel", label: "Jazztel", region: "ES" },
  { value: "pepephone", label: "Pepephone", region: "ES" },
  { value: "simyo", label: "Simyo", region: "ES" },
  { value: "tuenti", label: "Tuenti", region: "ES" },
  
  // German Providers
  { value: "telekom-de", label: "Telekom Deutschland", region: "DE" },
  { value: "vodafone-de", label: "Vodafone Deutschland", region: "DE" },
  { value: "o2-de", label: "O2 Deutschland", region: "DE" },
  { value: "eplus", label: "E-Plus", region: "DE" },
  { value: "blau", label: "Blau", region: "DE" },
  { value: "alditalk", label: "Aldi Talk", region: "DE" },
  { value: "lidl-connect", label: "Lidl Connect", region: "DE" },
  { value: "congstar", label: "Congstar", region: "DE" },
  { value: "freenet", label: "Freenet", region: "DE" },
  { value: "otelo", label: "Otelo", region: "DE" },
  
  // Custom Provider
  { value: "other", label: "Other (Custom Provider)", region: "ALL" },
]

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English (US)", region: "US" },
  { value: "es", label: "Español (España)", region: "ES" },
  { value: "de", label: "Deutsch (Deutschland)", region: "DE" },
]

export default function SettingsContent() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    address: "",
    networkProvider: "",
    customProvider: "",
    phoneNumber: "",
    language: "en",
    region: "US",
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
        language: parsed.language || "en",
        region: parsed.region || "US",
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
        language: "en",
        region: "US",
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
        language: "en",
        region: "US",
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

  // Filter providers by selected region
  const filteredProviders = NETWORK_PROVIDERS.filter(
    (provider) => provider.region === profile.region || provider.region === "ALL"
  )

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

        {/* Language/Region Selector */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Language & Region
            </CardTitle>
            <p className="text-sm text-slate-600">
              Select your preferred language and country to see the most relevant service providers.
            </p>
          </CardHeader>
          <CardContent>
            <Select
              value={profile.language}
              onValueChange={(lang) => {
                const selected = LANGUAGE_OPTIONS.find((l) => l.value === lang)
                setProfile({ ...profile, language: lang, region: selected?.region || "US", networkProvider: "", customProvider: "" })
              }}
            >
              <SelectTrigger className="h-12 text-lg border-2 border-slate-300 rounded-lg">
                <SelectValue placeholder="Select language & region" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Network Provider */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
              <Wifi className="w-6 h-6" />
              Network Provider
              <button
                onClick={() => alert("If your service provider isn't listed, select 'Other (Custom Provider)' and enter your provider's name. This will be included in your exported reports to help identify your carrier.")}
                className="w-5 h-5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </CardTitle>
            <p className="text-sm text-slate-600">
              Select your phone service provider. This helps route your reports to the right support team. 
              If your provider isn't listed, choose "Other (Custom Provider)" to add your own.
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
                  {filteredProviders.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {profile.networkProvider === "other" && (
              <div className="border-2 border-amber-300 bg-amber-50 rounded-lg p-4">
                <label htmlFor="custom-provider" className="block text-lg font-medium text-amber-900 mb-2">
                  Enter Your Network Provider Name
                </label>
                <Input
                  id="custom-provider"
                  value={profile.customProvider}
                  onChange={(e) => setProfile({ ...profile, customProvider: e.target.value })}
                  placeholder="e.g., Regional Mobile, Local Carrier, etc."
                  className="h-12 text-lg border-2 border-amber-300 rounded-lg bg-white"
                />
                <p className="text-sm text-amber-800 mt-2">
                  This will be saved and used in your exported reports to help identify your service provider.
                </p>
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
