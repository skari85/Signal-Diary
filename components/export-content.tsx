"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Printer, FileText, User, Phone, Wifi } from "lucide-react"
import Link from "next/link"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

interface UserProfile {
  name: string
  address: string
  networkProvider: string
  customProvider: string
  phoneNumber: string
}

const NETWORK_PROVIDERS = [
  { value: "verizon", label: "Verizon", supportEmail: "support@verizon.com", supportPhone: "1-800-922-0204" },
  { value: "att", label: "AT&T", supportEmail: "support@att.com", supportPhone: "1-800-331-0500" },
  { value: "tmobile", label: "T-Mobile", supportEmail: "support@t-mobile.com", supportPhone: "1-877-746-0909" },
  { value: "sprint", label: "Sprint", supportEmail: "support@sprint.com", supportPhone: "1-888-211-4727" },
  {
    value: "uscellular",
    label: "U.S. Cellular",
    supportEmail: "support@uscellular.com",
    supportPhone: "1-888-944-9400",
  },
  {
    value: "cricket",
    label: "Cricket Wireless",
    supportEmail: "support@cricketwireless.com",
    supportPhone: "1-800-274-2538",
  },
  { value: "boost", label: "Boost Mobile", supportEmail: "support@boostmobile.com", supportPhone: "1-833-502-6678" },
  { value: "metro", label: "Metro by T-Mobile", supportEmail: "support@metropcs.com", supportPhone: "1-888-863-8768" },
  {
    value: "straight-talk",
    label: "Straight Talk",
    supportEmail: "support@straighttalk.com",
    supportPhone: "1-877-430-2355",
  },
  { value: "tracfone", label: "TracFone", supportEmail: "support@tracfone.com", supportPhone: "1-800-867-7183" },
  {
    value: "consumer-cellular",
    label: "Consumer Cellular",
    supportEmail: "support@consumercellular.com",
    supportPhone: "1-800-686-4460",
  },
  { value: "xfinity", label: "Xfinity Mobile", supportEmail: "support@xfinity.com", supportPhone: "1-888-936-4968" },
  { value: "visible", label: "Visible", supportEmail: "support@visible.com", supportPhone: "1-888-294-6804" },
  { value: "mint", label: "Mint Mobile", supportEmail: "support@mintmobile.com", supportPhone: "1-800-683-7392" },
  { value: "other", label: "Other", supportEmail: "", supportPhone: "" },
]

const getTypeLabel = (type: string) => {
  switch (type) {
    case "no-signal":
      return "No Signal"
    case "call-failed":
      return "Call Failed"
    case "message-failed":
      return "Message Didn't Send"
    default:
      return type
  }
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }
}

export default function ExportContent() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    address: "",
    networkProvider: "",
    customProvider: "",
    phoneNumber: "",
  })

  useEffect(() => {
    const savedLogs = localStorage.getItem("signal-diary-logs")
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs)
      setLogs(parsedLogs)
    }

    // Load user profile
    const savedProfile = localStorage.getItem("signal-diary-profile")
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile({
        name: parsed.name || "",
        address: parsed.address || "",
        networkProvider: parsed.networkProvider || "",
        customProvider: parsed.customProvider || "",
        phoneNumber: parsed.phoneNumber || "",
      })
    }
  }, [])

  const getProviderInfo = () => {
    if (profile.networkProvider === "other" && profile.customProvider) {
      return { name: profile.customProvider, supportEmail: "", supportPhone: "" }
    }
    const provider = NETWORK_PROVIDERS.find((p) => p.value === profile.networkProvider)
    return provider
      ? { name: provider.label, supportEmail: provider.supportEmail, supportPhone: provider.supportPhone }
      : null
  }

  const downloadCSV = () => {
    if (logs.length === 0) {
      alert("No data to export")
      return
    }

    let csvContent = ""

    // Add user information if available
    if (profile.name || profile.address || profile.phoneNumber || profile.networkProvider) {
      csvContent += "User Information\n"
      if (profile.name) csvContent += `Name,"${profile.name}"\n`
      if (profile.phoneNumber) csvContent += `Phone Number,"${profile.phoneNumber}"\n`
      if (profile.address) csvContent += `Address,"${profile.address.replace(/\n/g, " ")}"\n`

      const providerInfo = getProviderInfo()
      if (providerInfo) {
        csvContent += `Network Provider,"${providerInfo.name}"\n`
        if (providerInfo.supportEmail) csvContent += `Provider Support Email,"${providerInfo.supportEmail}"\n`
        if (providerInfo.supportPhone) csvContent += `Provider Support Phone,"${providerInfo.supportPhone}"\n`
      }
      csvContent += "\n"
    }

    // Add headers and data
    const headers = ["Date", "Time", "Issue Type", "Location"]
    csvContent += headers.join(",") + "\n"
    csvContent += logs
      .map((log) => {
        const { date, time } = formatDate(log.timestamp)
        return [date, time, getTypeLabel(log.type), `"${log.location}"`].join(",")
      })
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `signal-diary-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const printReport = () => {
    if (logs.length === 0) {
      alert("No data to print")
      return
    }

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const providerInfo = getProviderInfo()
    const userInfoSection =
      profile.name || profile.address || profile.phoneNumber || providerInfo
        ? `
      <div class="user-info">
        <h2>Customer Information</h2>
        ${profile.name ? `<p><strong>Name:</strong> ${profile.name}</p>` : ""}
        ${profile.phoneNumber ? `<p><strong>Phone Number:</strong> ${profile.phoneNumber}</p>` : ""}
        ${profile.address ? `<p><strong>Address:</strong> ${profile.address.replace(/\n/g, "<br>")}</p>` : ""}
        ${providerInfo ? `<p><strong>Network Provider:</strong> ${providerInfo.name}</p>` : ""}
        ${providerInfo?.supportEmail ? `<p><strong>Provider Support Email:</strong> ${providerInfo.supportEmail}</p>` : ""}
        ${providerInfo?.supportPhone ? `<p><strong>Provider Support Phone:</strong> ${providerInfo.supportPhone}</p>` : ""}
      </div>
    `
        : ""

    const reportHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Signal Diary Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            h2 { color: #475569; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .summary { background-color: #fef7ed; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .user-info { background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #0ea5e9; }
            .provider-info { background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #22c55e; }
            .footer { margin-top: 40px; font-size: 12px; color: #64748b; }
            .urgent { background-color: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0; }
          </style>
        </head>
        <body>
          <h1>Signal Diary Report</h1>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          
          ${userInfoSection}

          ${
            providerInfo
              ? `
          <div class="provider-info">
            <h3>Network Provider Support Information</h3>
            <p><strong>Provider:</strong> ${providerInfo.name}</p>
            ${providerInfo.supportPhone ? `<p><strong>Support Phone:</strong> ${providerInfo.supportPhone}</p>` : ""}
            ${providerInfo.supportEmail ? `<p><strong>Support Email:</strong> ${providerInfo.supportEmail}</p>` : ""}
          </div>
          `
              : ""
          }

          <div class="summary">
            <h2>Issue Summary</h2>
            <p><strong>Total Issues Logged:</strong> ${logs.length}</p>
            <p><strong>No Signal Issues:</strong> ${logs.filter((l) => l.type === "no-signal").length}</p>
            <p><strong>Call Failed Issues:</strong> ${logs.filter((l) => l.type === "call-failed").length}</p>
            <p><strong>Message Failed Issues:</strong> ${logs.filter((l) => l.type === "message-failed").length}</p>
          </div>

          ${
            logs.length >= 5
              ? `
          <div class="urgent">
            <h3>⚠️ Frequent Signal Issues Detected</h3>
            <p>This customer has logged ${logs.length} signal issues. This may indicate a network coverage problem that requires immediate attention.</p>
          </div>
          `
              : ""
          }

          <h2>Detailed Issue Log</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Issue Type</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              ${logs
                .map((log) => {
                  const { date, time } = formatDate(log.timestamp)
                  return `
                <tr>
                  <td>${date}</td>
                  <td>${time}</td>
                  <td>${getTypeLabel(log.type)}</td>
                  <td>${log.location}</td>
                </tr>
              `
                })
                .join("")}
            </tbody>
          </table>

          <div class="footer">
            <p>This report was generated by Signal Diary - a tool to help track phone signal issues.</p>
            <p><strong>For Network Provider:</strong> Please use the customer information above to locate the account and investigate the reported signal issues.</p>
            <p><strong>For Caregivers:</strong> Share this report with the network provider's customer service to help resolve connectivity problems.</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(reportHTML)
    printWindow.document.close()
    printWindow.print()
  }

  const providerInfo = getProviderInfo()

  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <Link href="/history">
            <Button variant="outline" size="lg" className="h-12 w-12 rounded-xl border-2 bg-transparent">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Export Your Signal Diary</h1>
        </div>

        {/* Provider Info Display */}
        {providerInfo && (
          <Card className="border-2 border-green-200 bg-green-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Wifi className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <p className="text-lg text-green-800 font-medium mb-1">Network Provider: {providerInfo.name}</p>
                  {providerInfo.supportPhone && (
                    <p className="text-sm text-green-700 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      Support: {providerInfo.supportPhone}
                    </p>
                  )}
                  <p className="text-sm text-green-700 mt-1">
                    Your reports will include provider information for faster support routing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Options */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-700 text-center">Choose Export Option</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={downloadCSV}
              className="w-full h-16 text-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md"
              disabled={logs.length === 0}
            >
              <Download className="w-8 h-8 mr-3" />
              Download CSV
            </Button>

            <Button
              onClick={printReport}
              className="w-full h-16 text-xl bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md"
              disabled={logs.length === 0}
            >
              <Printer className="w-8 h-8 mr-3" />
              Print-Friendly Report
            </Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-2 border-blue-200 bg-blue-50 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <p className="text-lg text-blue-800 font-medium mb-2">Share with others</p>
                <p className="text-blue-700 mb-2">
                  Share your exported log with a caregiver or network provider to help resolve signal issues.
                </p>
                {providerInfo && (
                  <p className="text-sm text-blue-600 font-medium">
                    ✓ Reports include {providerInfo.name} support information for direct routing
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        {logs.length > 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-slate-700">Your Log Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-lg">
                <p>
                  <strong>Total Issues:</strong> {logs.length}
                </p>
                <p>
                  <strong>No Signal:</strong> {logs.filter((l) => l.type === "no-signal").length}
                </p>
                <p>
                  <strong>Call Failed:</strong> {logs.filter((l) => l.type === "call-failed").length}
                </p>
                <p>
                  <strong>Message Failed:</strong> {logs.filter((l) => l.type === "message-failed").length}
                </p>
                {logs.length >= 5 && (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mt-3">
                    <p className="text-orange-800 font-medium text-sm">
                      ⚠️ You have {logs.length} logged issues. Consider sharing this report with your network provider
                      for investigation.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        {logs.length === 0 && (
          <Card className="border-2 border-slate-200 shadow-lg">
            <CardContent className="pt-6 text-center">
              <p className="text-lg text-slate-600">No data to export</p>
              <p className="text-slate-500 mt-2">Start logging issues from the home screen</p>
              <Link href="/" className="inline-block mt-4">
                <Button className="bg-slate-600 hover:bg-slate-700 text-white">Go to Home</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        {logs.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <Link href="/history">
              <Button className="w-full h-12 text-lg bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
                View History
              </Button>
            </Link>
            <Link href="/settings">
              <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md">
                <User className="w-5 h-5 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
