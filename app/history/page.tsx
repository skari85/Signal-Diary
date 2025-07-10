"use client"
import { SignalZero, PhoneOff, MessageSquareX } from "lucide-react"
import ClientOnly from "@/components/client-only"
import HistoryContent from "@/components/history-content"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string
}

const getIcon = (type: string) => {
  switch (type) {
    case "no-signal":
      return <SignalZero className="w-6 h-6 text-red-500" />
    case "call-failed":
      return <PhoneOff className="w-6 h-6 text-orange-500" />
    case "message-failed":
      return <MessageSquareX className="w-6 h-6 text-blue-500" />
    default:
      return null
  }
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

export default function HistoryPage() {
  return (
    <ClientOnly>
      <HistoryContent />
    </ClientOnly>
  )
}
