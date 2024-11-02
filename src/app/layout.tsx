import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import { Providers } from "@/context/providers"
import { GeistSans } from "geist/font/sans"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { ProtectedRoute } from "@/components/protected-route"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export const runtime = "edge"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Events", "Meetups", "Conferences", "Workshops"],
  authors: [
    {
      name: "Mario Arita",
      url: "https://github.com/jmaritar",
    },
  ],
  creator: "cacao-byte",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "cacao-byte",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-svh antialiased",
          GeistSans.className
        )}
      >
        <Providers>{children}</Providers>
        <TailwindIndicator />
        <NextTopLoader color="#e21d48" showSpinner={false} />
        <Toaster />
      </body>
    </html>
  )
}
