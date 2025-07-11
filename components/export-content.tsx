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
  { value: "google-fi", label: "Google Fi", supportEmail: "support@google.com", supportPhone: "1-844-825-3554" },
  { value: "republic-wireless", label: "Republic Wireless", supportEmail: "support@republicwireless.com", supportPhone: "1-855-754-1206" },
  { value: "ting", label: "Ting", supportEmail: "support@ting.com", supportPhone: "1-855-846-4389" },
  { value: "project-fi", label: "Project Fi", supportEmail: "support@google.com", supportPhone: "1-844-825-3554" },
  { value: "other", label: "Other", supportEmail: "", supportPhone: "" },
]

// Add translation map with types
interface Translation {
  reportTitle: string;
  generatedOn: string;
  customerInfo: string;
  name: string;
  phoneNumber: string;
  address: string;
  networkProvider: string;
  providerSupport: string;
  provider: string;
  supportPhone: string;
  supportEmail: string;
  issueSummary: string;
  totalIssues: string;
  noSignal: string;
  callFailed: string;
  messageFailed: string;
  urgentTitle: string;
  urgentMsg: (count: number) => string;
  tableHeaders: string[];
  typeLabels: Record<string, string>;
}

const TRANSLATIONS: Record<string, Translation> = {
  en: {
    reportTitle: "Signal Diary Report",
    generatedOn: "Generated on:",
    customerInfo: "Customer Information",
    name: "Name",
    phoneNumber: "Phone Number",
    address: "Address",
    networkProvider: "Network Provider",
    providerSupport: "Network Provider Support Information",
    provider: "Provider",
    supportPhone: "Support Phone",
    supportEmail: "Support Email",
    issueSummary: "Issue Summary",
    totalIssues: "Total Issues Logged:",
    noSignal: "No Signal Issues:",
    callFailed: "Call Failed Issues:",
    messageFailed: "Message Failed Issues:",
    urgentTitle: "⚠️ Frequent Signal Issues Detected",
    urgentMsg: (count: number) => `This customer has logged ${count} signal issues. This may indicate a network coverage problem that requires immediate attention.`,
    tableHeaders: ["Date", "Time", "Issue Type", "Location"],
    typeLabels: {
      "no-signal": "No Signal",
      "call-failed": "Call Failed",
      "message-failed": "Message Didn't Send"
    }
  },
  es: {
    reportTitle: "Informe de Signal Diary",
    generatedOn: "Generado el:",
    customerInfo: "Información del Cliente",
    name: "Nombre",
    phoneNumber: "Número de Teléfono",
    address: "Dirección",
    networkProvider: "Proveedor de Red",
    providerSupport: "Información de Soporte del Proveedor",
    provider: "Proveedor",
    supportPhone: "Teléfono de Soporte",
    supportEmail: "Correo de Soporte",
    issueSummary: "Resumen de Incidencias",
    totalIssues: "Total de Incidencias Registradas:",
    noSignal: "Incidencias de Sin Señal:",
    callFailed: "Incidencias de Llamada Fallida:",
    messageFailed: "Incidencias de Mensaje Fallido:",
    urgentTitle: "⚠️ Se Detectaron Incidencias Frecuentes de Señal",
    urgentMsg: (count: number) => `Este cliente ha registrado ${count} incidencias de señal. Esto puede indicar un problema de cobertura que requiere atención inmediata.`,
    tableHeaders: ["Fecha", "Hora", "Tipo de Incidencia", "Ubicación"],
    typeLabels: {
      "no-signal": "Sin Señal",
      "call-failed": "Llamada Fallida",
      "message-failed": "Mensaje No Enviado"
    }
  },
  de: {
    reportTitle: "Signal Diary Bericht",
    generatedOn: "Erstellt am:",
    customerInfo: "Kundeninformation",
    name: "Name",
    phoneNumber: "Telefonnummer",
    address: "Adresse",
    networkProvider: "Netzbetreiber",
    providerSupport: "Netzbetreiber Support-Informationen",
    provider: "Anbieter",
    supportPhone: "Support-Telefon",
    supportEmail: "Support-E-Mail",
    issueSummary: "Problemübersicht",
    totalIssues: "Gesamtzahl der protokollierten Probleme:",
    noSignal: "Kein Signal Probleme:",
    callFailed: "Anruf fehlgeschlagen Probleme:",
    messageFailed: "Nachricht fehlgeschlagen Probleme:",
    urgentTitle: "⚠️ Häufige Signalprobleme erkannt",
    urgentMsg: (count: number) => `Dieser Kunde hat ${count} Signalprobleme protokolliert. Dies kann auf ein Netzabdeckungsproblem hinweisen, das sofortige Aufmerksamkeit erfordert.`,
    tableHeaders: ["Datum", "Uhrzeit", "Problemtyp", "Ort"],
    typeLabels: {
      "no-signal": "Kein Signal",
      "call-failed": "Anruf fehlgeschlagen",
      "message-failed": "Nachricht fehlgeschlagen"
    }
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

  // Use language from profile, fallback to 'en'
  const lang = (profile as any).language || 'en'
  const t: Translation = TRANSLATIONS[lang] || TRANSLATIONS['en']

  const getTypeLabel = (type: string) => t.typeLabels[type] || type

  const downloadCSV = () => {
    if (logs.length === 0) {
      alert("No data to export")
      return
    }

    let csvContent = ""

    // Add user information if available
    if (profile.name || profile.address || profile.phoneNumber || profile.networkProvider) {
      csvContent += `${t.customerInfo}\n`
      if (profile.name) csvContent += `${t.name},"${profile.name}"\n`
      if (profile.phoneNumber) csvContent += `${t.phoneNumber},"${profile.phoneNumber}"\n`
      if (profile.address) csvContent += `${t.address},"${profile.address.replace(/\n/g, " ")}"\n`

      const providerInfo = getProviderInfo()
      if (providerInfo) {
        csvContent += `${t.networkProvider},"${providerInfo.name}"\n`
        if (providerInfo.supportEmail) csvContent += `${t.supportEmail},"${providerInfo.supportEmail}"\n`
        if (providerInfo.supportPhone) csvContent += `${t.supportPhone},"${providerInfo.supportPhone}"\n`
      }
      csvContent += "\n"
    }

    // Add headers and data
    const headers = t.tableHeaders
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
        <h2>${t.customerInfo}</h2>
        ${profile.name ? `<p><strong>${t.name}:</strong> ${profile.name}</p>` : ""}
        ${profile.phoneNumber ? `<p><strong>${t.phoneNumber}:</strong> ${profile.phoneNumber}</p>` : ""}
        ${profile.address ? `<p><strong>${t.address}:</strong> ${profile.address.replace(/\n/g, "<br>")}</p>` : ""}
        ${providerInfo ? `<p><strong>${t.networkProvider}:</strong> ${providerInfo.name}</p>` : ""}
        ${providerInfo?.supportEmail ? `<p><strong>${t.supportEmail}:</strong> ${providerInfo.supportEmail}</p>` : ""}
        ${providerInfo?.supportPhone ? `<p><strong>${t.supportPhone}:</strong> ${providerInfo.supportPhone}</p>` : ""}
      </div>
    `
        : ""

    const reportHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t.reportTitle}</title>
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
          <h1>${t.reportTitle}</h1>
          <p><strong>${t.generatedOn}</strong> ${new Date().toLocaleDateString()} ${lang === 'de' ? 'um' : lang === 'es' ? 'a las' : 'at'} ${new Date().toLocaleTimeString()}</p>
          
          ${userInfoSection}

          ${
            providerInfo
              ? `
          <div class="provider-info">
            <h3>${t.providerSupport}</h3>
            <p><strong>${t.provider}:</strong> ${providerInfo.name}</p>
            ${providerInfo.supportPhone ? `<p><strong>${t.supportPhone}:</strong> ${providerInfo.supportPhone}</p>` : ""}
            ${providerInfo.supportEmail ? `<p><strong>${t.supportEmail}:</strong> ${providerInfo.supportEmail}</p>` : ""}
          </div>
          `
              : ""
          }

          <div class="summary">
            <h2>${t.issueSummary}</h2>
            <p><strong>${t.totalIssues}</strong> ${logs.length}</p>
            <p><strong>${t.noSignal}</strong> ${logs.filter((l) => l.type === "no-signal").length}</p>
            <p><strong>${t.callFailed}</strong> ${logs.filter((l) => l.type === "call-failed").length}</p>
            <p><strong>${t.messageFailed}</strong> ${logs.filter((l) => l.type === "message-failed").length}</p>
          </div>

          ${
            logs.length >= 5
              ? `
          <div class="urgent">
            <h3>${t.urgentTitle}</h3>
            <p>${t.urgentMsg(logs.length)}</p>
          </div>
          `
              : ""
          }

          <table>
            <thead>
              <tr>
                ${t.tableHeaders.map((h: string) => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${logs
                .map((log) => {
                  const { date, time } = formatDate(log.timestamp)
                  return `<tr><td>${date}</td><td>${time}</td><td>${getTypeLabel(log.type)}</td><td>${log.location}</td></tr>`
                })
                .join("")}
            </tbody>
          </table>

          <div class="footer">
            Signal Diary &copy; ${new Date().getFullYear()}
          </div>
        </body>
      </html>
    `

    printWindow.document.write(reportHTML)
    printWindow.document.close()
    printWindow.focus()
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
