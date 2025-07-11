"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignalZero, PhoneOff, MessageSquareX, Shield, Download, History, MapPin } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center">
              <SignalZero className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-amber-900">Signal Diary</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-amber-800 hover:text-amber-900 font-medium transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-amber-700 hover:text-amber-800 font-medium transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-amber-900 tracking-tight leading-tight">
                It's Not Your Phone,
                <br />
                <span className="text-orange-600">It's The Signal</span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-800 font-light max-w-3xl mx-auto leading-relaxed">
                Help seniors understand when missed calls and messages are due to poor signal coverage, not user error. 
                Simple logging that provides proof for phone companies and peace of mind for families.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/app">
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-14"
                >
                  Start Tracking Signal Issues
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-6 text-lg font-medium rounded-xl transition-all duration-200 h-14 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SignalZero className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl text-amber-900">Track Signal Issues</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-amber-700 leading-relaxed">
                  Log when calls don't come through, messages arrive late, or you have no signal. 
                  Simple one-tap logging with location tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <History className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-amber-900">See Patterns</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-amber-700 leading-relaxed">
                  View your history to identify when and where signal problems occur most often. 
                  Perfect for showing patterns to your phone company.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-amber-900">Export Evidence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-amber-700 leading-relaxed">
                  Generate reports to show family members or your mobile carrier the signal issues. 
                  Concrete proof that it's not user error. Includes support for custom service providers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <div className="space-y-8 mt-16">
            <h2 className="text-3xl font-bold text-amber-900">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Select Location</h3>
                <p className="text-amber-700 text-sm">
                  Choose where the signal issue happened - Kitchen, Bedroom, etc.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Log the Issue</h3>
                <p className="text-amber-700 text-sm">
                  Tap the button that matches: No Signal, Call Failed, or Message Failed.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Check History</h3>
                <p className="text-amber-700 text-sm">
                  View patterns and see when problems occur most often.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Share Evidence</h3>
                <p className="text-amber-700 text-sm">
                  Export reports to show your phone company or family.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-6 mt-16">
            <h2 className="text-2xl font-bold text-amber-900">Why Trust Signal Diary?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">100% Private</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    All your data stays on your device. We never collect, store, or transmit any personal information.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Location Tracking</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Track where signal issues occur to identify problem areas in your home or neighborhood.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <PhoneOff className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Prove It's Not You</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Show concrete evidence that missed communications are due to network issues, not user mistakes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquareX className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">Family Peace of Mind</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Help family members understand that missed calls aren't due to not checking the phone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900/10 border-t border-amber-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-amber-800">
            {/* About */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">About Signal Diary</h3>
              <p className="leading-relaxed">
                Signal Diary helps seniors and their families understand when missed calls and messages are due to poor signal coverage, not user error. 
                Simple logging that provides concrete evidence for phone companies and peace of mind for families.
              </p>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Privacy First</h3>
              <p className="leading-relaxed">
                All your signal data stays completely private on your device. We don't collect, store, or transmit any personal information. 
                Your signal logs are yours alone.
              </p>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">How It Helps</h3>
              <p className="leading-relaxed">
                Use Signal Diary to document connectivity issues when contacting your carrier, identify patterns in signal quality over time, 
                and provide evidence that missed communications aren't user error.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-200 text-center text-amber-700">
            <p>&copy; 2024 Signal Diary. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
