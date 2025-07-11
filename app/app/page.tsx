import ClientOnly from "@/components/client-only"
import HomeContent from "@/components/home-content"

export default function AppPage() {
  return (
    <ClientOnly>
      <HomeContent />
    </ClientOnly>
  )
}
