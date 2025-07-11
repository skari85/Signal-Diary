"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-medium text-gray-900">Signal Diary</div>
          <div className="flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Privacy
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-12 max-w-3xl">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-extralight text-gray-900 tracking-tight leading-tight">
              Signal Diary
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Help seniors understand when missed calls are due to poor signal, not their phone
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/app">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 text-lg font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              >
                Start Tracking
              </Button>
            </Link>
            <p className="text-sm text-gray-400 font-light">No signup required • All data stays on your device</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-400">© 2024 Signal Diary</p>
        </div>
      </footer>
    </div>
  )
}
