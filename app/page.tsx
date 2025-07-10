import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  TrendingUp,
  Download,
  Shield,
  Users,
  FileText,
  Monitor,
  Smartphone,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import SponsorButtons from "@/components/sponsor-buttons"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Signal Diary</h1>
                <p className="text-sm text-slate-600">Track phone signal issues</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-slate-600 hover:text-slate-800 transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-slate-600 hover:text-slate-800 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-600 hover:text-slate-800 transition-colors">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-amber-100 text-amber-800 border-amber-300 text-sm px-4 py-2">
            Free & Privacy-First
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Track Phone Signal Issues
            <span className="block text-amber-600">Made Simple</span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Help elderly users and caregivers document phone signal problems with an easy-to-use diary. Generate
            professional reports for network providers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/app">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg"
              >
                <Smartphone className="w-6 h-6 mr-2" />
                Start Using Web App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <a
              href="https://snobbbies.lemonsqueezy.com/buy/39dde2d7-20f1-4976-b196-b180c5b464e2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl shadow-lg bg-transparent"
              >
                <Monitor className="w-6 h-6 mr-2" />
                Download Desktop App
              </Button>
            </a>
          </div>

          {/* Features Overview */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Elderly Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Easy Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Document Signal Issues
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple tools designed specifically for elderly users and their caregivers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-amber-200 hover:border-amber-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Quick Issue Logging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Log signal problems with just a few taps. Choose from common issues like "No Signal", "Call Failed",
                  or "Message Didn't Send".
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Location Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Automatically remember locations where problems occur. Build a history of problem areas to share with
                  providers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Pattern Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  See patterns in your signal issues. Identify problem times, locations, and issue types to help
                  providers fix problems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Professional Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Generate detailed reports with customer information and provider contacts. Perfect for sharing with
                  support teams.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All data stays on your device. Nothing is shared unless you choose to export it. Complete control over
                  your information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200 hover:border-red-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Caregiver Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Designed for elderly users with large buttons, clear text, and simple navigation. Easy for caregivers
                  to help with.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Three simple steps to start tracking signal issues</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Log Issues</h3>
              <p className="text-slate-600">
                When you experience a signal problem, quickly log it with the type of issue and your location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Track Patterns</h3>
              <p className="text-slate-600">
                View your history and patterns to understand when and where problems happen most often.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Share Reports</h3>
              <p className="text-slate-600">
                Export professional reports to share with your network provider or caregiver for faster resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Tracking Signal Issues Today</h2>
          <p className="text-xl mb-8 text-amber-100">
            Simple, privacy-first tools to help document and resolve phone signal problems
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/app">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-white text-amber-600 hover:bg-amber-50 rounded-xl shadow-lg"
              >
                <Smartphone className="w-6 h-6 mr-2" />
                Try Web App Free
              </Button>
            </Link>

            <a
              href="https://snobbbies.lemonsqueezy.com/buy/39dde2d7-20f1-4976-b196-b180c5b464e2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white hover:text-amber-600 rounded-xl shadow-lg bg-transparent"
              >
                <Monitor className="w-6 h-6 mr-2" />
                Get Desktop App
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-amber-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Privacy protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Signal Diary</h3>
                  <p className="text-slate-400 text-sm">Track phone signal issues</p>
                </div>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Helping elderly users and caregivers document phone signal problems with privacy-first, easy-to-use
                tools.
              </p>
              <div className="mb-6">
                <SponsorButtons />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/app" className="block text-slate-300 hover:text-white transition-colors">
                  Web App
                </Link>
                <a
                  href="https://snobbbies.lemonsqueezy.com/buy/39dde2d7-20f1-4976-b196-b180c5b464e2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-300 hover:text-white transition-colors"
                >
                  Desktop App
                </a>
                <Link href="/about" className="block text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 Signal Diary. All rights reserved. Made with <Heart className="w-4 h-4 inline text-red-400" />{" "}
              for elderly users and their families.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
