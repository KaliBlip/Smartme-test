"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Zap, Trophy, BarChart3, BookOpen, GraduationCap, School } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10" />
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Master Academics with <span className="text-primary">Interactive</span> Quizzes
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                SMARTME TEST provides challenging questions across various subjects, tailored for both JHS and SHS students for a personalized learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Link href="/quiz/new" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    <Zap className="h-5 w-5" />
                    Start Academic Quiz
                  </Button>
                </Link>
                <Link href="/categories" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Subjects
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="relative w-full h-[300px] md:h-[400px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
                <div className="absolute top-10 left-10 w-32 md:w-40 h-32 md:h-40 bg-white rounded-lg shadow-lg p-4 rotate-6 animate-float">
                  <div className="h-4 w-24 md:w-32 bg-primary/20 rounded mb-2"></div>
                  <div className="h-3 w-20 md:w-28 bg-primary/20 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                    <div className="h-3 w-full bg-accent/30 rounded"></div>
                  </div>
                </div>
                <div className="absolute bottom-10 right-10 w-36 md:w-48 h-36 md:h-48 bg-white rounded-lg shadow-lg p-4 -rotate-3 animate-bounce-slow">
                  <div className="h-4 w-24 md:w-32 bg-primary/20 rounded mb-2"></div>
                  <div className="h-3 w-20 md:w-28 bg-primary/20 rounded mb-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-6 md:h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-6 md:h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-6 md:h-8 w-full bg-accent/30 rounded"></div>
                    <div className="h-6 md:h-8 w-full bg-accent/30 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <GraduationCap className="h-12 md:h-16 w-12 md:w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Academic Excellence Features</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                SMARTME TEST combines high-quality academic content with engaging quiz formats to enhance learning
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow quiz-card">
                <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <School className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">JHS & SHS Categories</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Quizzes tailored specifically for Junior High School and Senior High School curriculum standards
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow quiz-card">
                <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Performance Tracking</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Track your academic progress and receive personalized recommendations based on your performance
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow quiz-card">
                <div className="h-10 md:h-12 w-10 md:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-5 md:h-6 w-5 md:w-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Competitive Leaderboards</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Compete with fellow students and climb the school and subject-specific leaderboards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Improve Your Academic Performance?</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto opacity-90">
              Start your first academic quiz now and discover the power of interactive learning
            </p>
            <Link href="/quiz/new">
              <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                <Zap className="h-5 w-5" />
                Start Quiz Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 border-t py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <GraduationCap className="h-5 md:h-6 w-5 md:w-6 text-primary" />
              <span className="text-lg md:text-xl font-bold">SMARTME TEST</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link href="/about" className="text-sm md:text-base text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/privacy" className="text-sm md:text-base text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm md:text-base text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/contact" className="text-sm md:text-base text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-8 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SMARTME TEST. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

