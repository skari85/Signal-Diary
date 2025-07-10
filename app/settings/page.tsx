"use client"
import ClientOnly from "@/components/client-only"
import SettingsContent from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <ClientOnly>
      <SettingsContent />
    </ClientOnly>
  )
}
