"use client"

import type React from "react"

import dynamic from "next/dynamic"

function ClientOnly({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-slate-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-slate-200 rounded mx-auto mb-2 animate-pulse" style={{ width: "200px" }}></div>
          <div className="h-6 bg-slate-200 rounded mx-auto animate-pulse" style={{ width: "150px" }}></div>
        </div>
        <div className="border-2 border-slate-200 shadow-lg rounded-lg p-6">
          <div className="h-6 bg-slate-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-16 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="h-16 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="h-16 bg-slate-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ),
})
