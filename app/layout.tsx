import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavbarWrapper } from "@/components/navbar-wrapper"
import { SupabaseAuthProvider } from "@/components/providers/supabase-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SmartMe Test - Academic Quiz Platform",
  description: "Test your academic knowledge with interactive quizzes for JHS and SHS students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseAuthProvider>
            <div className="min-h-screen flex flex-col">
              <NavbarWrapper />
              {children}
            </div>
          </SupabaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}