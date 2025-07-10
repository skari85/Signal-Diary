import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://signaldiary.vercel.app"),
  title: "Signal Diary - Track Phone Signal Issues",
  description:
    "Help elderly users and caregivers document phone signal problems with an easy-to-use diary. Generate professional reports for network providers.",
  keywords: ["phone signal", "elderly", "caregivers", "network issues", "signal tracking"],
  authors: [{ name: "Signal Diary Team" }],
  creator: "Signal Diary",
  publisher: "Signal Diary",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Signal Diary - Track Phone Signal Issues",
    description: "Help elderly users and caregivers document phone signal problems with an easy-to-use diary.",
    url: "https://signaldiary.vercel.app",
    siteName: "Signal Diary",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Signal Diary - Track Phone Signal Issues",
    description: "Help elderly users and caregivers document phone signal problems with an easy-to-use diary.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Signal Diary" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
