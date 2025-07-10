"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-100 text-gray-400", className)}
        style={{ width, height }}
      >
        <span className="text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        {...props}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ width, height }} />}
    </div>
  )
}
