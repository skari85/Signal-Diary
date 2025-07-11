import Link from "next/link"
import { Shield, Lock, Eye, Download } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-gray-900">
            Signal Diary
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link href="/privacy" className="text-gray-900 font-medium">
              Privacy
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-extralight text-gray-900 leading-tight">Your Privacy is Protected</h1>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Signal Diary keeps all your data completely private and secure on your device.
            </p>
          </div>

          {/* Privacy Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900">No Data Collection</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We don't collect, store, or transmit any of your personal information. Your signal logs, notes, and
                patterns stay entirely on your device.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900">Local Storage Only</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                All your signal diary entries are stored locally on your phone or computer. No cloud storage, no
                external servers, no remote access.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900">No Tracking</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We don't use analytics, cookies, or any tracking technologies. Your usage patterns and behavior within
                the app remain completely private.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-gray-400" />
                <h3 className="text-xl font-medium text-gray-900">You Control Exports</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                When you export your signal data to share with family or your phone company, you decide exactly what to
                share and with whom.
              </p>
            </div>
          </div>

          {/* What We Don't Access */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <h2 className="text-3xl font-light text-gray-900 text-center mb-6">What We Don't Access</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Personal Information</h3>
                <p className="text-gray-600 text-sm">No names, emails, phone numbers, or contact details</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Call History</h3>
                <p className="text-gray-600 text-sm">We don't access who you call or who calls you</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Messages</h3>
                <p className="text-gray-600 text-sm">We can't see your text messages or their content</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Location Tracking</h3>
                <p className="text-gray-600 text-sm">We don't track or store your precise location</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Contacts</h3>
                <p className="text-gray-600 text-sm">We don't access your contact list or address book</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Other Apps</h3>
                <p className="text-gray-600 text-sm">We don't monitor or access other applications</p>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-gray-900 text-center">Technical Details</h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">Manual Logging Only</h3>
                <p className="text-gray-600 leading-relaxed">
                  Signal Diary is a completely manual logging app. We don't access any signal strength information from your device. 
                  You manually log when you experience signal issues, missed calls, or delayed messages.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">Data Storage</h3>
                <p className="text-gray-600 leading-relaxed">
                  All entries you make (missed calls, delayed messages, signal observations) are stored in your device's
                  local storage. This data never leaves your device unless you explicitly export it.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-medium text-gray-900">No Account Required</h3>
                <p className="text-gray-600 leading-relaxed">
                  Signal Diary works completely offline and doesn't require any account creation, login, or personal
                  information to function.
                </p>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="space-y-8">
            <h2 className="text-3xl font-light text-gray-900 text-center">Your Rights</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <h3 className="font-medium text-gray-900">Delete Anytime</h3>
                <p className="text-gray-600 text-sm">Clear all your data from the app settings whenever you want</p>
              </div>

              <div className="text-center space-y-3">
                <h3 className="font-medium text-gray-900">Export Control</h3>
                <p className="text-gray-600 text-sm">Choose exactly what data to export and share</p>
              </div>

              <div className="text-center space-y-3">
                <h3 className="font-medium text-gray-900">Complete Ownership</h3>
                <p className="text-gray-600 text-sm">Your data belongs to you, not to us</p>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <p className="text-sm text-gray-500">Last updated: January 2025</p>
          </div>
        </div>
      </div>
    </div>
  )
}
