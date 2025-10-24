import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ConditionalLayout } from "@/components/conditional-layout"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "VTech - Empowering Digital Innovation",
  description:
    "Leading IT solutions provider offering software development, cloud solutions, IT consulting, and cybersecurity services.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
