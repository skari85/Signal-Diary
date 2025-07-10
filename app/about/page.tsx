import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Github, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <h1 className="text-3xl font-bold text-gray-900">About Signal Diary</h1>
              <p className="text-gray-600">Our mission and values</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Mission Statement */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="w-6 h-6 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 space-y-4">
            <p>
              Signal Diary was created to help elderly users and their families track phone signal issues in a simple,
              accessible way. We believe that staying connected shouldn't be complicated.
            </p>
            <p>
              Our app focuses on clarity, simplicity, and compassion - making it easy for anyone to document signal
              problems and share meaningful reports with caregivers and network providers.
            </p>
          </CardContent>
        </Card>

        {/* Who We Help */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Elderly Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Large buttons, high contrast design, and simple language make it easy for elderly users to track their
                signal issues independently.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Caregivers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Family members and caregivers get detailed reports to help advocate for better service and understand
                communication challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Network providers receive structured, detailed reports that help them identify and resolve coverage
                issues more effectively.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What Makes Us Different */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What Makes Signal Diary Different</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  All data stays on your device. We don't collect, store, or share any personal information.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Accessibility Focused</h3>
                <p className="text-gray-600">
                  Designed specifically for elderly users with large buttons, clear text, and simple navigation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No Account Required</h3>
                <p className="text-gray-600">
                  Start using immediately without creating accounts, passwords, or providing personal details.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Works Offline</h3>
                <p className="text-gray-600">
                  Log issues even without internet connection. Perfect for areas with poor signal coverage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Source */}
        <Card className="border-amber-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-6 h-6" />
              Open Source & Community
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Signal Diary is open source software, which means the code is publicly available for review and
              contribution. This ensures transparency and allows the community to help improve the app.
            </p>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <a href="https://github.com/skari85/Signal-Diary" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com/sponsors/skari85" target="_blank" rel="noopener noreferrer">
                  Support Development
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Have questions, suggestions, or need help? We'd love to hear from you.</p>
            <div className="space-y-2">
              <p>
                <strong>GitHub Issues:</strong>{" "}
                <a href="https://github.com/skari85/Signal-Diary/issues" className="text-blue-600 hover:underline">
                  Report bugs or request features
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@signaldiary.app" className="text-blue-600 hover:underline">
                  support@signaldiary.app
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
