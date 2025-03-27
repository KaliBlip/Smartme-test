"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, ArrowRight, Clock, BarChart3, School } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export default function NewQuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedCategory = searchParams.get("category")
  const preselectedLevel = searchParams.get("level") || "jhs"

  const [selectedLevel, setSelectedLevel] = useState(preselectedLevel)
  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || "")
  const [selectedDifficulty, setSelectedDifficulty] = useState(preselectedCategory ? "medium" : "medium")
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10)
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(60)

  // Update displayed categories based on selected level
  useEffect(() => {
    if (preselectedCategory) return;
    setSelectedCategory("")
  }, [selectedLevel, preselectedCategory])

  const jhsCategories = [
    { id: "jhs-mathematics", name: "Mathematics", icon: "Math" },
    { id: "jhs-science", name: "Science", icon: "Sci" },
    { id: "jhs-english", name: "English", icon: "Eng" },
    { id: "jhs-social-studies", name: "Social Studies", icon: "Soc" },
  ]

  const shsCategories = [
    { id: "shs-mathematics", name: "Advanced Mathematics", icon: "Math" },
    { id: "shs-science", name: "Science", icon: "Sci" },
    { id: "shs-english", name: "English Literature", icon: "Eng" },
    { id: "shs-history", name: "History", icon: "His" },
    { id: "shs-languages", name: "Languages", icon: "Lang" },
    { id: "shs-arts", name: "Arts & Literature", icon: "Art" },
  ]

  const difficulties = [
    { id: "easy", name: "Easy", description: "Basic concepts and fundamentals" },
    { id: "medium", name: "Medium", description: "Intermediate academic challenges" },
    { id: "hard", name: "Hard", description: "Advanced concepts and problem-solving" },
    { id: "mixed", name: "Mixed", description: "A combination of all difficulty levels" },
  ]

  const questionCounts = [5, 10, 15, 20]
  const timeLimits = [30, 60, 90, 120, 0] // 0 means no time limit

  const startQuiz = () => {
    if (!selectedCategory) {
      alert("Please select a subject before starting the quiz")
      return
    }

    console.log("Starting quiz with:", {
      level: selectedLevel,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      count: selectedQuestionCount,
      time: selectedTimeLimit,
    })

    router.push(
      `/quiz/play?level=${selectedLevel}&category=${selectedCategory}&difficulty=${selectedDifficulty}&count=${selectedQuestionCount}&time=${selectedTimeLimit}`,
    )
  }

  // Format time in minutes and seconds
  const formatTime = (seconds: number): string => {
    if (seconds === 0) return "No time limit"
    if (seconds < 60) return `${seconds} seconds`
    
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs > 0 ? `${mins}m ${secs}s` : `${mins} minutes`
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">SMARTME TEST</h1>
              </div>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/categories" className="font-medium hover:text-primary">
              Subjects
            </Link>
            <Link href="/leaderboard" className="font-medium hover:text-primary">
              Leaderboard
            </Link>
            <Link href="/profile" className="font-medium hover:text-primary">
              Profile
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Create Your Quiz</h1>

            {!preselectedLevel && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Education Level
                  </CardTitle>
                  <CardDescription>Select your education level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={selectedLevel === 'jhs' ? "default" : "outline"}
                      className="h-auto py-4 flex flex-col gap-2"
                      onClick={() => setSelectedLevel('jhs')}
                    >
                      <span className="font-bold">Junior High School</span>
                      <span className="text-xs font-normal">JHS Level Content</span>
                    </Button>
                    <Button 
                      variant={selectedLevel === 'shs' ? "default" : "outline"}
                      className="h-auto py-4 flex flex-col gap-2"
                      onClick={() => setSelectedLevel('shs')}
                    >
                      <span className="font-bold">Senior High School</span>
                      <span className="text-xs font-normal">SHS Level Content</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select Subject</CardTitle>
                <CardDescription>Choose a subject for your quiz questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedLevel === 'jhs' ? (
                    jhsCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="h-auto py-4 flex flex-col gap-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </Button>
                    ))
                  ) : (
                    shsCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="h-auto py-4 flex flex-col gap-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </Button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Select Difficulty</CardTitle>
                <CardDescription>Choose how challenging you want your quiz to be</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty.id}
                      variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                      className="h-auto py-4 flex flex-col gap-2 justify-start items-start text-left"
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                    >
                      <span className="font-bold">{difficulty.name}</span>
                      <span className="text-xs font-normal">{difficulty.description}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Number of Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {questionCounts.map((count) => (
                      <Button
                        key={count}
                        variant={selectedQuestionCount === count ? "default" : "outline"}
                        onClick={() => setSelectedQuestionCount(count)}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Time Limit
                  </CardTitle>
                  <CardDescription>Set how much time to allocate per question</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time per question:</span>
                      <span className="font-medium text-primary">{formatTime(selectedTimeLimit)}</span>
                    </div>
                    
                    <Slider
                      min={0}
                      max={180}
                      step={15}
                      value={[selectedTimeLimit]}
                      onValueChange={(values: number[]) => setSelectedTimeLimit(values[0])}
                      className="py-4"
                    />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>No limit</span>
                      <span>1 minute</span>
                      <span>3 minutes</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mt-2">
                      {selectedTimeLimit === 0 ? (
                        <span>Take as much time as you need to answer each question.</span>
                      ) : (
                        <span>You will have {formatTime(selectedTimeLimit)} to answer each question.</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button 
                size="lg"
                onClick={startQuiz}
                disabled={!selectedCategory}
                className="gap-2"
              >
                Start Quiz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SMARTME TEST</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SMARTME TEST. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

