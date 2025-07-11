import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 p-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-6">Terms of Service</h1>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>
                Signal Diary is provided as a free tool to help you manually log and track phone signal issues. By using
                this app, you agree to these simple terms.
              </p>

              <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">What Signal Diary Does</h2>
              <ul className="space-y-2">
                <li>• Helps you manually log when you experience signal issues</li>
                <li>• Tracks connectivity patterns over time through your manual entries</li>
                <li>• Provides data you can share with family or your phone company</li>
                <li>• Works as a logging tool for understanding phone connectivity issues</li>
              </ul>

              <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Your Responsibilities</h2>
              <ul className="space-y-2">
                <li>• Use the app for personal, non-commercial purposes</li>
                <li>• Don't try to hack or reverse engineer the app</li>
                <li>• Understand that signal readings are estimates</li>
                <li>• Don't rely solely on this app for emergency communications</li>
              </ul>

              <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Important Disclaimers</h2>
              <p>
                <strong>No Warranty:</strong> Signal Diary is provided "as is" without any guarantees. We can't promise
                it will work perfectly on every device or in every situation.
              </p>
              <p>
                <strong>Not a Medical Device:</strong> This app is not intended for medical or emergency use. Always
                have backup communication methods for emergencies.
              </p>
              <p>
                <strong>Manual Logging:</strong> Signal Diary relies on your manual entries. The accuracy of the data depends on 
                how consistently you log your experiences. This is a logging tool, not a diagnostic device.
              </p>

              <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
              <p>
                We're not responsible for any problems that might arise from using Signal Diary. This includes missed
                calls, dropped connections, or any other phone-related issues. The app is a diagnostic tool to help you
                understand signal patterns.
              </p>

              <h2 className="text-2xl font-medium text-gray-900 mt-8 mb-4">Changes to Terms</h2>
              <p>
                We may update these terms occasionally. If we make significant changes, we'll let you know through the
                app. Continued use means you accept any changes.
              </p>

              <p className="text-sm text-gray-500 mt-8">Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
