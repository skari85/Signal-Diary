"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle, X } from "lucide-react"

interface HelpTooltipProps {
  title: string
  content: string
  className?: string
}

export default function HelpTooltip({ title, content, className = "" }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="w-6 h-6 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
      >
        <HelpCircle className="w-4 h-4" />
      </Button>
      
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <Card className="w-64 border-2 border-amber-200 bg-white shadow-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
                <Button
                  onClick={() => setIsVisible(false)}
                  className="w-5 h-5 p-0 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">{content}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
