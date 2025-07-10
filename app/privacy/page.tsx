import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, Eye, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">How we protect your privacy</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Privacy Promise */}
        <Card className="border-green-200 bg-green-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-green-800">
              <Shield className="w-6 h-6" />
              Our Privacy Promise
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-700">
            <p className="text-lg font-semibold mb-2">Signal Diary collects ZERO personal data.</p>
            <p>
              Everything you enter stays on your device. We don't have servers, databases, or any way to access your
              information. Your privacy is completely protected.
            </p>
          </CardContent>
        </Card>

        {/* What We Don't Collect */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-red-500" />
              What We DON'T Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li>• No personal information</li>
                <li>• No email addresses</li>
                <li>• No phone numbers</li>
                <li>• No location tracking</li>
                <li>• No usage analytics</li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li>• No cookies for tracking</li>
                <li>• No advertising data</li>
                <li>• No device fingerprinting</li>
                <li>• No third-party trackers</li>
                <li>• No data sharing</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How Your Data Works */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-6 h-6 text-blue-500" />
              How Your Data Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Local Storage Only</h3>
              <p className="text-gray-700">
                All your signal logs, settings, and personal information are stored locally in your browser or device.
                This data never leaves your device unless you explicitly export it.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">You Control Everything</h3>
              <p className="text-gray-700">
                You can view, edit, or delete all your data at any time. You can also export your data to share with
                caregivers or network providers - but only when you choose to.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">No Internet Required</h3>
              <p className="text-gray-700">
                The app works completely offline. Your data is stored locally and doesn't require an internet connection
                to function.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-500" />
              Technical Implementation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Browser Local Storage</h3>
              <p className="text-gray-700">
                We use your browser's built-in localStorage feature to save your signal logs and settings. This data is
                encrypted by your browser and only accessible to the Signal Diary app.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">No Server Communication</h3>
              <p className="text-gray-700">
                The app doesn't communicate with any servers or external services. All functionality happens entirely
                within your browser or device.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Open Source Code</h3>
              <p className="text-gray-700">
                Our code is publicly available on GitHub, so you can verify exactly what the app does and doesn't do
                with your data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle>Your Rights and Control</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Complete Control</h3>
                <p className="text-gray-600">
                  You have complete control over your data. Add, edit, or delete any information at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Export Anytime</h3>
                <p className="text-gray-600">
                  Export your data as CSV or printable reports whenever you want to share it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Delete Everything</h3>
                <p className="text-gray-600">
                  Clear all your data with one button in the settings. It's permanently deleted from your device.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No Account Needed</h3>
                <p className="text-gray-600">
                  No registration, passwords, or personal information required to use the app.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle>Questions About Privacy?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about how Signal Diary handles your privacy, please don't hesitate to reach out.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@signaldiary.app" className="text-blue-600 hover:underline">
                  privacy@signaldiary.app
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href="https://github.com/skari85/Signal-Diary" className="text-blue-600 hover:underline">
                  View our open source code
                </a>
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
