"use client"

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    if (imageSrc !== '/placeholder.jpg') {
      setImageSrc('/placeholder.jpg')
      setHasError(true)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'grayscale' : ''}`}
        style={{
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}
