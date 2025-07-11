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
                Access Web App
              </Button>
            </Link>
            <p className="text-lg text-green-600 font-medium">Web app always free!</p>
            <p className="text-sm text-gray-400 font-light">No signup required • All data stays on your device</p>
          </div>
        </div>
      </div>

      {/* Donation Section */}
      <div className="px-6 py-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg text-gray-700 font-medium">
            💬 If Signal Diary helped you or someone you care for, you can support future updates.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-600">👉 Donate what you want</span>
            <Link
              href="https://snobbbies.lemonsqueezy.com/buy/2f129db9-882a-4a3d-9a21-1e230409a023"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors duration-200"
            >
              here
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p className="text-sm text-gray-400">© 2025 Signal Diary</p>
          <div className="text-sm text-gray-500">
            <p>Get the full offline app for desktop & mobile for $4.99</p>
            <Link
              href="https://snobbbies.lemonsqueezy.com/buy/39dde2d7-20f1-4976-b196-b180c5b464e2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-700 font-medium underline transition-colors duration-200"
            >
              Purchase here
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
