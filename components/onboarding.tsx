"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignalZero, PhoneOff, MessageSquareX, MapPin, History, Download, User, X, ArrowRight, CheckCircle, Smartphone, CreditCard } from "lucide-react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Select Your Location",
    description: "Choose where the signal issue happened - like Kitchen, Bedroom, or type your own location.",
    icon: MapPin,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Log the Issue",
    description: "Tap the button that matches what happened: No Signal, Call Failed, or Message Didn't Send.",
    icon: SignalZero,
    color: "text-red-600"
  },
  {
    id: 3,
    title: "Check Your History",
    description: "View all your logged issues to see patterns and when problems occur most often.",
    icon: History,
    color: "text-slate-600"
  },
  {
    id: 4,
    title: "Export for Evidence",
    description: "Generate reports to show your phone company or family members the signal problems.",
    icon: Download,
    color: "text-green-600"
  },
  {
    id: 5,
    title: "Get the Full App",
    description: "Signal Diary is available as a native app that works offline on desktop and mobile devices.",
    icon: CreditCard,
    color: "text-purple-600"
  }
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("signal-diary-onboarding-complete")
    if (!hasSeenOnboarding) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem("signal-diary-onboarding-complete", "true")
      setIsVisible(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("signal-diary-onboarding-complete", "true")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  const currentStepData = ONBOARDING_STEPS[currentStep]
  const IconComponent = currentStepData.icon

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-2 border-slate-200 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 font-semibold text-sm">?</span>
              </div>
              <span className="text-sm text-slate-600 font-medium">Welcome to Signal Diary</span>
            </div>
            <Button
              onClick={handleSkip}
              className="text-slate-400 hover:text-slate-600 h-8 w-8 p-0 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 bg-${currentStepData.color.replace('text-', '')} bg-opacity-10 rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 ${currentStepData.color}`} />
            </div>
          </div>
          
          <CardTitle className="text-xl text-slate-800 mb-2">
            {currentStepData.title}
          </CardTitle>
          
          <p className="text-slate-600 leading-relaxed">
            {currentStepData.description}
          </p>
          
          {/* Purchase Information */}
          {currentStepData.id === 5 && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Native App - $4.99</h4>
              <div className="text-sm text-purple-700 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="font-medium">💻 Features:</span>
                  <span>Works offline, native app for desktop & mobile, one-time payment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">📱 Devices:</span>
                  <span>Windows, Mac, iPhone, Android - all supported</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">🔒 Payment:</span>
                  <span>Secure payment through Lemon Squeezy</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium">📦 Delivery:</span>
                  <span>Download links sent after payment</span>
                </div>
                <div className="mt-3">
                  <a
                    href="https://snobbbies.lemonsqueezy.com/buy/39dde2d7-20f1-4976-b196-b180c5b464e2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Purchase Signal Diary
                  </a>
                </div>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            {ONBOARDING_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-amber-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            {currentStep < ONBOARDING_STEPS.length - 1 ? (
              <>
                <Button
                  onClick={handleSkip}
                  className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50 border"
                >
                  Skip Tutorial
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            )}
          </div>
          
          <p className="text-xs text-slate-400 text-center">
            {currentStep + 1} of {ONBOARDING_STEPS.length} steps
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
