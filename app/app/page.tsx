import { Suspense } from "react"
import HomeContent from "@/components/home-content"
import { Card, CardContent } from "@/components/ui/card"

function LoadingSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default function AppPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
