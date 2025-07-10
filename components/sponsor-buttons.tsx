"use client"
import { sponsors } from "@/lib/sponsors"
import { Heart, Coffee, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const icons = {
  github: Heart,
  patreon: Heart,
  buy_me_a_coffee: Coffee,
  custom: DollarSign,
}

export default function SponsorButtons() {
  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-800">Support Signal Diary</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          This app is free to use. If it helps you, consider supporting its development.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(sponsors).map(([platform, handleOrList]) => {
            if (!handleOrList) return null

            const Icon = icons[platform as keyof typeof icons] || Heart
            const handles = Array.isArray(handleOrList) ? handleOrList : [handleOrList]

            return handles.map((handle) => {
              let href: string
              let label: string

              switch (platform) {
                case "github":
                  href = `https://github.com/sponsors/${handle}`
                  label = "GitHub Sponsors"
                  break
                case "patreon":
                  href = `https://patreon.com/${handle}`
                  label = "Patreon"
                  break
                case "buy_me_a_coffee":
                  href = `https://www.buymeacoffee.com/${handle}`
                  label = "Buy Me a Coffee"
                  break
                default:
                  href = handle
                  label = "Support"
              }

              return (
                <Button
                  key={`${platform}-${handle}`}
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-amber-300 hover:bg-amber-100 text-gray-700 bg-transparent"
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Icon size={16} />
                    {label}
                  </a>
                </Button>
              )
            })
          })}
        </div>
        <p className="text-xs text-gray-500 mt-3">Your support helps keep this app free and accessible for everyone.</p>
      </CardContent>
    </Card>
  )
}
