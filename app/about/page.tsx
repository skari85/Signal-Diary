import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageSquare, Signal, FileText, Shield, MapPin, History, Download, Users, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="px-6 py-6 border-b border-amber-200">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Signal className="w-5 h-5 text-white" />
            </div>
            Signal Diary
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-amber-900 font-medium">
              About
            </Link>
            <Link
              href="/privacy"
              className="text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium"
            >
              Privacy
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-amber-900 leading-tight">
              It's Not Your Phone,
              <br />
              <span className="text-orange-600">It's The Signal</span>
            </h1>
            <p className="text-xl text-amber-800 font-light max-w-3xl mx-auto leading-relaxed">
              Signal Diary helps seniors and their families understand when missed calls and messages are due to poor signal coverage, not user error. 
              Simple logging that provides concrete evidence for phone companies and peace of mind for families.
            </p>
          </div>

          {/* Problem Statement */}
          <div className="bg-amber-100/50 rounded-2xl p-8 border border-amber-200">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-amber-900">The Problem</h2>
              <p className="text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed">
                Many seniors experience missed calls and messages but don't know if it's their phone, their actions, or poor signal coverage. 
                This creates frustration, anxiety, and can strain relationships with family members who think they're not checking their phone.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-amber-900">Missed Calls</h3>
                  <p className="text-amber-700 text-sm">
                    Someone calls but your phone never rings
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                    <MessageSquare className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-amber-900">Late Messages</h3>
                  <p className="text-amber-700 text-sm">
                    Text messages arrive hours or days late
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                    <Signal className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-amber-900">No Signal</h3>
                  <p className="text-amber-700 text-sm">
                    Can't make calls or send messages at all
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* For Seniors Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">For Seniors</h2>
              <p className="text-lg text-amber-800 font-light max-w-2xl mx-auto">
                Have you ever wondered why your phone didn't ring when someone called? Or why you didn't receive an
                important text message? Signal Diary helps you understand what's really happening.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-amber-200 bg-white/80 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-amber-600" />
                    <CardTitle className="text-xl text-amber-900">Track Missed Calls</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 leading-relaxed">
                    When someone tells you they called but your phone didn't ring, log it in Signal Diary. Record the
                    time, who called, and your location. This creates proof that it wasn't your fault.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-6 h-6 text-amber-600" />
                    <CardTitle className="text-xl text-amber-900">Log Missing Messages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 leading-relaxed">
                    Record when text messages arrive late or not at all. Note the time and your location to identify
                    patterns in poor signal coverage. Show family members it's not you ignoring messages.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Signal className="w-6 h-6 text-amber-600" />
                    <CardTitle className="text-xl text-amber-900">Simple Signal Tracking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 leading-relaxed">
                    Easily record when you experience signal issues throughout the day. See when your connectivity is poor and when
                    communication problems occur. Identify the best spots in your home for making calls.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-amber-600" />
                    <CardTitle className="text-xl text-amber-900">Proof for Your Carrier</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 leading-relaxed">
                    Generate reports showing when signal problems occurred. Use this evidence when calling your phone
                    company to report coverage issues. Concrete data is more convincing than complaints. 
                    You can also add your custom service provider if it's not in our list.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* For Families Section */}
          <div className="bg-white/80 rounded-2xl p-8 border-2 border-amber-200 shadow-lg space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">For Family Members</h2>
              <p className="text-lg text-amber-800 font-light max-w-2xl mx-auto">
                Help your loved ones understand their phone connectivity issues and provide peace of mind.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Show It's Not User Error</h3>
                    <p className="text-amber-700 leading-relaxed">
                      When your parent or grandparent says "I don't know why my phone didn't ring," Signal Diary provides
                      concrete evidence that it's a signal issue, not something they did wrong.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Document Patterns</h3>
                    <p className="text-amber-700 leading-relaxed">
                      Help identify when and where signal problems occur most frequently. This information is valuable when
                      contacting the phone company or considering solutions like signal boosters.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Reduce Anxiety</h3>
                    <p className="text-amber-700 leading-relaxed">
                      Many seniors worry they're "doing something wrong" with their phone. Signal Diary shows clear evidence
                      that missed communications are due to network issues, not user mistakes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-2">Better Communication</h3>
                    <p className="text-amber-700 leading-relaxed">
                      Instead of frustration about missed calls, families can work together to solve signal problems. 
                      The data helps everyone understand what's really happening.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">How It Works</h2>
              <p className="text-lg text-amber-800 font-light max-w-2xl mx-auto">
                Simple manual logging that anyone can use - no technical knowledge required
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Log the Issue</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  When you miss a call or message, quickly record it with the time and your location
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Track Patterns</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Over time, see when and where signal problems happen most frequently
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Share Evidence</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Generate reports to show family members or your phone company the signal issues
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-amber-600">4</span>
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Get Solutions</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Use the data to work with your carrier or find better spots for making calls
                </p>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Questions We Help Answer</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-amber-200 bg-white/80">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-2">"Why didn't my phone ring?"</h3>
                  <p className="text-amber-700 text-sm">
                    Track when calls don't come through and correlate with your location to prove it's a network issue.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-2">"Is my phone broken?"</h3>
                  <p className="text-amber-700 text-sm">
                    Show evidence that it's signal issues, not device problems, before spending money on a new phone.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-2">"Why do messages arrive late?"</h3>
                  <p className="text-amber-700 text-sm">
                    Document delayed messages and their correlation to poor signal to identify patterns.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-white/80">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-amber-900 mb-2">"Should I get a new phone?"</h3>
                  <p className="text-amber-700 text-sm">
                    Provide data to show if it's a network issue rather than device issue before making expensive purchases.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-8 py-8">
            <h2 className="text-3xl font-bold text-amber-900">Start Understanding Your Signal Issues</h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Join thousands of seniors and families who are using Signal Diary to understand their connectivity issues and get better service from their phone companies.
            </p>
            <Link href="/app">
              <Button
                className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Tracking Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
