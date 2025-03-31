"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X, LogOut } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NavbarProps {
  hideAuthButtons?: boolean
}

export function Navbar({ hideAuthButtons = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isQuizPlay = pathname?.startsWith("/quiz/play")

  // TODO: Replace with actual auth state from your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    setIsAuthenticated(false)
  }

  // Format quiz information
  const level = searchParams.get('level')?.toUpperCase() || 'SHS'
  const rawCategory = searchParams.get('category') || 'mathematics'
  const rawDifficulty = searchParams.get('difficulty') || 'medium'
  
  // Format category with proper capitalization
  const formattedCategory = rawCategory.split('-').map(word => {
    if (word.toLowerCase() === 'mathematics') return 'Mathematics'
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
  
  const subjectBadge = `${level}-${level.toLowerCase()} ${formattedCategory}`
  const difficulty = rawDifficulty.charAt(0).toUpperCase() + rawDifficulty.slice(1)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">SMARTME TEST</span>
          </Link>

          {/* Desktop Navigation */}
          {!isQuizPlay ? (
            <div className="hidden md:flex items-center gap-6">
              <Link href="/categories" className="text-sm font-medium hover:text-primary">
                Categories
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary">
                Leaderboard
              </Link>
              <Link href="/profile" className="text-sm font-medium hover:text-primary">
                Profile
              </Link>
              {!hideAuthButtons && (
                isAuthenticated ? (
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </>
                )
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Badge variant="outline" className="font-medium px-3 py-1">
                {subjectBadge}
              </Badge>
              <Badge variant="secondary" className="font-medium px-3 py-1">
                {difficulty}
              </Badge>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {isQuizPlay ? (
              <div className="flex flex-col space-y-3 px-4">
                <Badge variant="outline" className="font-medium px-3 py-1 justify-center">
                  {subjectBadge}
                </Badge>
                <Badge variant="secondary" className="font-medium px-3 py-1 justify-center">
                  {difficulty}
                </Badge>
              </div>
            ) : (
              <>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/categories"
                    className="text-sm font-medium hover:text-primary px-4 py-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="text-sm font-medium hover:text-primary px-4 py-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Leaderboard
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-medium hover:text-primary px-4 py-2 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </div>
                {!hideAuthButtons && (
                  <div className="flex flex-col space-y-2 px-4">
                    {isAuthenticated ? (
                      <Button 
                        variant="ghost" 
                        className="w-full gap-2" 
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
} 