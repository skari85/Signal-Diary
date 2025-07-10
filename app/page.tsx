"use client"
import ClientOnly from "@/components/client-only"
import HomeContent from "@/components/home-content"

interface LogEntry {
  id: string
  type: "no-signal" | "call-failed" | "message-failed"
  location: string
  timestamp: string // Changed to string to avoid hydration issues
}

export default function HomePage() {
  return (
    <ClientOnly>
      <HomeContent />
    </ClientOnly>
  )
}

// HomeContent component should be defined in "@/components/home-content"
// For the sake of completeness, here is a possible implementation of HomeContent

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { SignalZero, PhoneOff, MessageSquareX, History, Download } from 'lucide-react'
// import Image from "next/image"
// import Link from "next/link"

// interface LogEntry {
//   id: string
//   type: "no-signal" | "call-failed" | "message-failed"
//   location: string
//   timestamp: string // Changed to string to avoid hydration issues
// }

// const HomeContent = () => {
//   const [location, setLocation] = useState("")
//   const [mounted, setMounted] = useState(false)

//   // Ensure component is mounted before accessing localStorage
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   const addLogEntry = (type: LogEntry["type"]) => {
//     if (!mounted) return

//     const newEntry: LogEntry = {
//       id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//       type,
//       location: location || "Not specified",
//       timestamp: new Date().toISOString(),
//     }

//     const existingLogs = localStorage.getItem("signal-diary-logs")
//     const logs = existingLogs ? JSON.parse(existingLogs) : []
//     const updatedLogs = [newEntry, ...logs]

//     localStorage.setItem("signal-diary-logs", JSON.stringify(updatedLogs))
//     setLocation("")

//     // Show confirmation
//     alert("Issue logged successfully!")
//   }

//   // Don't render localStorage-dependent content until mounted
//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-amber-50 p-4">
//         <div className="max-w-md mx-auto space-y-6">
//           {/* Header */}
//           <div className="text-center py-4">
//             <div className="flex justify-center mb-4">
//               <Image
//                 src="/signal-diary-logo.png"
//                 alt="Signal Diary Logo"
//                 width={80}
//                 height={80}
//                 className="rounded-2xl"
//               />
//             </div>
//             <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
//             <p className="text-lg text-slate-600">Track your phone signal issues</p>
//           </div>

//           {/* Loading state */}
//           <Card className="border-2 border-slate-200 shadow-lg">
//             <CardContent className="pt-6 text-center">
//               <p className="text-lg text-slate-600">Loading...</p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-amber-50 p-4">
//       <div className="max-w-md mx-auto space-y-6">
//         {/* Header */}
//         <div className="text-center py-4">
//           <div className="flex justify-center mb-4">
//             <Image
//               src="/signal-diary-logo.png"
//               alt="Signal Diary Logo"
//               width={80}
//               height={80}
//               className="rounded-2xl"
//             />
//           </div>
//           <h1 className="text-3xl font-bold text-slate-800 mb-2">Signal Diary</h1>
//           <p className="text-lg text-slate-600">Track your phone signal issues</p>
//         </div>

//         {/* Main Action Buttons */}
//         <Card className="border-2 border-slate-200 shadow-lg">
//           <CardHeader>
//             <CardTitle className="text-xl text-center text-slate-700">What happened?</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Button
//               onClick={() => addLogEntry("no-signal")}
//               className="w-full h-16 text-xl bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md"
//             >
//               <SignalZero className="w-8 h-8 mr-3" />
//               No Signal
//             </Button>

//             <Button
//               onClick={() => addLogEntry("call-failed")}
//               className="w-full h-16 text-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md"
//             >
//               <PhoneOff className="w-8 h-8 mr-3" />
//               Call Failed
//             </Button>

//             <Button
//               onClick={() => addLogEntry("message-failed")}
//               className="w-full h-16 text-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md"
//             >
//               <MessageSquareX className="w-8 h-8 mr-3" />
//               Message Didn't Send
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Location Input */}
//         <Card className="border-2 border-slate-200 shadow-lg">
//           <CardContent className="pt-6">
//             <label htmlFor="location" className="block text-lg font-medium text-slate-700 mb-3">
//               Where did it happen?
//             </label>
//             <Input
//               id="location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="e.g. Kitchen, Living room, Outside"
//               className="h-12 text-lg border-2 border-slate-300 rounded-lg"
//             />
//             <p className="text-sm text-slate-500 mt-2 text-center">Your log is saved automatically</p>
//           </CardContent>
//         </Card>

//         {/* Navigation Buttons */}
//         <div className="grid grid-cols-2 gap-4">
//           <Link href="/history">
//             <Button className="w-full h-14 text-lg bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-xl shadow-md">
//               <History className="w-6 h-6 mr-2" />
//               View History
//             </Button>
//           </Link>

//           <Link href="/export">
//             <Button className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md">
//               <Download className="w-6 h-6 mr-2" />
//               Export Log
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
