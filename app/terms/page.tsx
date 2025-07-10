import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Shield, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Simple terms in plain language</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="border-blue-200 bg-blue-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-blue-800">
              <Heart className="w-6 h-6" />
              Welcome to Signal Diary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <p className="text-lg">
              These terms are written in simple language because we believe legal documents should be easy to
              understand. By using Signal Diary, you agree to these terms.
            </p>
          </CardContent>
        </Card>

        {/* What You Can Do */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-500" />
              What You Can Do
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-700">✓ Free to Use</h3>
                <p className="text-gray-700">
                  Use Signal Diary completely free for personal use. No hidden fees or premium features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-700">✓ Share Your Data</h3>
                <p className="text-gray-700">
                  Export and share your signal logs with family, caregivers, or network providers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-700">✓ Use Offline</h3>
                <p className="text-gray-700">Use the app without an internet connection. All features work offline.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-700">✓ Install Anywhere</h3>
                <p className="text-gray-700">
                  Install the app on your phone, tablet, or computer. Use it on multiple devices.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Provide */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-500" />
              What We Provide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Free Software</h3>
              <p className="text-gray-700">
                Signal Diary is provided free of charge. We don't charge for features, storage, or support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Best Effort Support</h3>
              <p className="text-gray-700">
                We'll do our best to help with questions and fix bugs, but we can't guarantee immediate responses or
                solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Open Source Code</h3>
              <p className="text-gray-700">
                The app's source code is publicly available on GitHub for transparency and community contributions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Important Limitations */}
        <Card className="border-red-200 bg-red-50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-6 h-6" />
              Important Limitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-red-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">Not for Emergencies</h3>
              <p>
                Signal Diary is for tracking signal issues, not for emergency communication. Always call emergency
                services (911, etc.) directly for urgent situations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">No Guarantees</h3>
              <p>
                We provide the app "as is" without warranties. We can't guarantee it will always work perfectly or meet
                all your needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Your Responsibility</h3>
              <p>
                You're responsible for backing up your data and using the app appropriately. We can't recover lost data
                or fix problems caused by misuse.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Your Responsibilities */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle>Your Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Use Appropriately</h3>
                <p className="text-gray-700">
                  Use Signal Diary for its intended purpose: tracking phone signal issues.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Respect Others</h3>
                <p className="text-gray-700">Don't use the app to harass, spam, or harm others or their networks.</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Keep Data Safe</h3>
                <p className="text-gray-700">
                  Back up important data and protect your device from unauthorized access.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Follow Laws</h3>
                <p className="text-gray-700">Use the app in compliance with all applicable laws and regulations.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes and Updates */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle>Changes and Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">App Updates</h3>
              <p className="text-gray-700">
                We may update Signal Diary to add features, fix bugs, or improve security. Updates are always free.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Terms Changes</h3>
              <p className="text-gray-700">
                We may update these terms occasionally. We'll notify users of significant changes through the app or our
                website.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle>Questions or Concerns?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms or need help with Signal Diary, please reach out to us.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@signaldiary.app" className="text-blue-600 hover:underline">
                  support@signaldiary.app
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href="https://github.com/skari85/Signal-Diary/issues" className="text-blue-600 hover:underline">
                  Report issues or ask questions
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
