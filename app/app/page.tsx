import { Suspense } from "react"
import ClientOnly from "@/components/client-only"
import HomeContent from "@/components/home-content"

export default function AppPage() {
  return (
    <ClientOnly>
      <Suspense
        fallback={
          <div className="min-h-screen bg-amber-50 p-4">
            <div className="max-w-md mx-auto space-y-6">
              <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </ClientOnly>
  )
}
