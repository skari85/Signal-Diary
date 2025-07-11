"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold text-amber-900 tracking-tight">Signal Diary</h1>

          <Link href="/">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Enter
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900/10 border-t border-amber-200 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-amber-800">
            {/* About */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">About</h3>
              <p className="leading-relaxed">
                Signal Diary helps you track mobile signal strength and connectivity issues. Perfect for documenting
                network problems when contacting your carrier or identifying patterns in signal quality over time.
              </p>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Privacy</h3>
              <p className="leading-relaxed">
                All your signal data stays completely private on your device. We don't collect, store, or transmit any
                personal information. Your signal logs are yours alone.
              </p>
            </div>

            {/* Terms */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Terms</h3>
              <p className="leading-relaxed">
                Signal Diary is provided for personal use to help track connectivity issues. Use the data to communicate
                with your mobile carrier about service problems. No warranty is provided for signal measurements.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-amber-200 text-center text-amber-700">
            <p>&copy; 2024 Signal Diary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
