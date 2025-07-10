"use client"

import { Suspense, lazy, ComponentType } from 'react'

interface LazyWrapperProps {
  component: ComponentType<any>
  fallback?: React.ReactNode
  [key: string]: any
}

const defaultFallback = (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
  </div>
)

export default function LazyWrapper({ 
  component: Component, 
  fallback = defaultFallback,
  ...props 
}: LazyWrapperProps) {
  const LazyComponent = lazy(() => 
    Promise.resolve({ default: Component })
  )

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Predefined lazy components for common use cases
export const LazyHistoryContent = lazy(() => import('./history-content'))
export const LazyPatternsContent = lazy(() => import('./patterns-content'))
export const LazyExportContent = lazy(() => import('./export-content'))
export const LazySettingsContent = lazy(() => import('./settings-content'))
