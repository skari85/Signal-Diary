"use client"
import ClientOnly from "@/components/client-only"
import ExportContent from "@/components/export-content"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

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

export default function ExportPage() {
  return (
    <ClientOnly>
      <ExportContent />
    </ClientOnly>
  )
}
