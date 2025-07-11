"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Signal, Phone, BarChart3, Download, Settings, Heart, Shield, FileText, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SponsorButtons from "@/components/sponsor-buttons"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/icons/icon-192x192.png" alt="Signal Diary Logo" width={60} height={60} className="rounded-lg" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Signal Diary</h1>
                <p className="text-gray-600">Track your phone signal issues</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Signal Tracking for Everyone</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Keep track of your phone signal problems with an easy-to-use app designed for clarity and simplicity.
            Perfect for sharing with caregivers and network providers.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-6 h-auto rounded-lg"
          >
            Start Using Signal Diary
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <Signal className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Logging</h3>
              <p className="text-gray-600">
                Three simple buttons to log signal issues: No Signal, Call Failed, or Message Didn't Send
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Pattern Analysis</h3>
              <p className="text-gray-600">
                See where and when problems happen most. Identify patterns by location and time.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
              <p className="text-gray-600">
                Export your data as CSV or print-friendly reports to share with family or providers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Room Tracking</h3>
              <p className="text-gray-600">
                Track exactly where issues happen - kitchen, bedroom, porch, or anywhere else.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <Settings className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Information</h3>
              <p className="text-gray-600">
                Optionally add your name, address, and network provider for complete reports.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600">
                All data stays on your device. Nothing is shared unless you choose to export it.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg border border-amber-200 p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Log Issues</h4>
              <p className="text-gray-600">
                Tap a button when you have signal problems. Add the room where it happened.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">View Patterns</h4>
              <p className="text-gray-600">
                See your history and patterns. Understand when and where problems happen most.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Share Results</h4>
              <p className="text-gray-600">
                Export your data to share with family, caregivers, or your network provider.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mb-8">
          <SponsorButtons />
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Learn more about Signal Diary and how it can help you track phone signal issues.
              </p>
              <Link href="/about">
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Your privacy is important. See how we protect your data and what information we collect.
              </p>
              <Link href="/privacy">
                <Button variant="outline" className="w-full bg-transparent">
                  Privacy Policy
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Read our terms of service to understand your rights and responsibilities.
              </p>
              <Link href="/terms">
                <Button variant="outline" className="w-full bg-transparent">
                  Terms of Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl px-8 py-6 h-auto rounded-lg"
          >
            Get Started Now
          </Button>
          <p className="text-gray-600 mt-4">Free to use • No account required • Works offline</p>
        </div>
      </div>
    </div>
  )
}
