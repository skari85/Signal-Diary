import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Signal, FileText } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-gray-900">
            Signal Diary
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-gray-900 font-medium">
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

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-extralight text-gray-900 leading-tight">
              It's Not Your Phone,
              <br />
              It's The Signal
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Signal Diary helps seniors and their families understand why calls and messages sometimes don't come
              through by tracking signal-related issues.
            </p>
          </div>

          {/* For Seniors Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-4">For Seniors</h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Have you ever wondered why your phone didn't ring when someone called? Or why you didn't receive an
                important text message?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900">Track Missed Calls</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  When someone tells you they called but your phone didn't ring, log it in Signal Diary. Record the
                  time, who called, and whether you had signal bars.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900">Log Missing Messages</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Record when text messages arrive late or not at all. Note the time and your location to identify
                  patterns in poor signal coverage.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Signal className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900">Simple Signal Tracking</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Easily record how many signal bars you have throughout the day. See when your signal is weak and when
                  communication problems occur.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-900">Proof for Your Carrier</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Generate reports showing when signal problems occurred. Use this evidence when calling your phone
                  company to report coverage issues.
                </p>
              </div>
            </div>
          </div>

          {/* For Families Section */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-4">For Family Members</h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Help your loved ones understand their phone connectivity issues and provide peace of mind.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">Show It's Not User Error</h3>
                <p className="text-gray-600 leading-relaxed">
                  When your parent or grandparent says "I don't know why my phone didn't ring," Signal Diary provides
                  concrete evidence that it's a signal issue, not something they did wrong.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">Document Patterns</h3>
                <p className="text-gray-600 leading-relaxed">
                  Help identify when and where signal problems occur most frequently. This information is valuable when
                  contacting the phone company or considering solutions like signal boosters.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">Reduce Anxiety</h3>
                <p className="text-gray-600 leading-relaxed">
                  Many seniors worry they're "doing something wrong" with their phone. Signal Diary shows clear evidence
                  that missed communications are due to network issues, not user mistakes.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Simple manual logging that anyone can use
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-medium text-gray-900">1</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Log the Issue</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  When you miss a call or message, quickly record it with the time and your signal strength
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-medium text-gray-900">2</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Track Patterns</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Over time, see when and where signal problems happen most frequently
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl font-medium text-gray-900">3</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Share Evidence</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Generate reports to show family members or your phone company the signal issues
                </p>
              </div>
            </div>
          </div>

          {/* Common Questions */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Questions We Help Answer</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">"Why didn't my phone ring?"</h3>
                <p className="text-gray-600 text-sm">
                  Track when calls don't come through and correlate with signal strength
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">"Is my phone broken?"</h3>
                <p className="text-gray-600 text-sm">Show evidence that it's signal issues, not device problems</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">"Why do messages arrive late?"</h3>
                <p className="text-gray-600 text-sm">Document delayed messages and their correlation to poor signal</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">"Should I get a new phone?"</h3>
                <p className="text-gray-600 text-sm">
                  Provide data to show if it's a network issue rather than device issue
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-light text-gray-900">Start Understanding Your Signal Issues</h2>
            <Link href="/app">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 text-lg font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
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
