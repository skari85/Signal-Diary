"use client"
import ClientOnly from "@/components/client-only"
import PatternsContent from "@/components/patterns-content"

export default function PatternsPage() {
  return (
    <ClientOnly>
      <PatternsContent />
    </ClientOnly>
  )
}
