"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, ArrowRight, CheckCircle, XCircle, GraduationCap, Share2, BookOpen, Volume2, RotateCcw } from "lucide-react"
import { generateQuestions } from "@/lib/quiz-generator"
import type { Question } from "@/lib/types"
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"
import { QuizSwipe } from "@/components/quiz-swipe"
import { useMediaQuery } from "@/app/hooks/use-media-query"
import { playSound } from "@/lib/sound"

export default function PlayQuizPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const category = searchParams.get("category") || "general"
  const difficulty = searchParams.get("difficulty") || "medium"
  const count = Number.parseInt(searchParams.get("count") || "10", 10)
  const timeLimit = Number.parseInt(searchParams.get("time") || "60", 10)
  const isStudyMode = searchParams.get("mode") === "study"

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [hapticEnabled, setHapticEnabled] = useState(true)

  // Generate questions on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true)
      try {
        const generatedQuestions = await generateQuestions(category, difficulty, count)
        setQuestions(generatedQuestions)
      } catch (error) {
        console.error("Failed to generate questions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [category, difficulty, count])

  // Timer effect
  useEffect(() => {
    if (loading || quizCompleted || !timeLimit) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!isAnswerSubmitted) {
            handleAnswerSubmit(null)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [loading, quizCompleted, timeLimit, isAnswerSubmitted])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (answer: string) => {
    if (isAnswerSubmitted) return
    setSelectedAnswer(answer)
  }

  // Handle answer submission with new features
  const handleAnswerSubmit = async (answer: string | null) => {
    if (!selectedAnswer || isAnswerSubmitted) return

    setIsAnswerSubmitted(true)
    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer

    if (soundEnabled) {
      playSound(isCorrect ? "correct" : "incorrect")
    }

    if (hapticEnabled && "vibrate" in navigator) {
      navigator.vibrate(isCorrect ? [50] : [100, 50, 100])
    }

    if (isCorrect) {
      setScore((prev) => prev + 1)
      toast({
        title: "Correct!",
        description: "Well done!",
        variant: "default",
      })
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentQuestion?.correctAnswer}`,
        variant: "destructive",
      })
    }

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsAnswerSubmitted(false)
        setTimeRemaining(timeLimit)
      } else {
        setQuizCompleted(true)
        playSound('complete')
      }
    }, 1500)
  }

  // Share results
  const shareResults = async () => {
    const shareText = `I scored ${score}/${questions.length} (${Math.round((score / questions.length) * 100)}%) on the ${category} quiz! Can you beat my score?`
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Quiz Results",
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        toast({
          title: "Results copied!",
          description: "Quiz results have been copied to your clipboard.",
        })
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      toast({
        title: "Results copied!",
        description: "Quiz results have been copied to your clipboard.",
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <GraduationCap className="h-16 w-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4">Generating Your Quiz...</h2>
            <p className="text-muted-foreground mt-2">Our AI is crafting challenging questions just for you</p>
          </div>
        </main>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen flex flex-col">
        

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="overflow-hidden">
                <div className="bg-primary h-2" style={{ width: `${percentage}%` }}></div>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    {percentage >= 70 ? (
                      <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-500" />
                      </div>
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center">
                        <GraduationCap className="h-12 w-12 text-amber-500" />
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold">Your Score</h3>
                    <p className="text-5xl font-bold my-4">
                      {score} / {questions.length}
                      <span className="text-lg text-muted-foreground ml-2">({percentage}%)</span>
                    </p>
                    <p className="text-muted-foreground">
                      {percentage >= 90
                        ? "Outstanding! You're a true expert!"
                        : percentage >= 70
                          ? "Great job! You know your stuff!"
                          : percentage >= 50
                            ? "Good effort! Keep learning!"
                            : "Keep practicing! You'll improve with time!"}
                    </p>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/30">
                    <h4 className="font-semibold mb-2">Quiz Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Category:</div>
                      <div className="font-medium capitalize">{category}</div>
                      <div>Difficulty:</div>
                      <div className="font-medium capitalize">{difficulty}</div>
                      <div>Questions:</div>
                      <div className="font-medium">{questions.length}</div>
                      <div>Time Limit:</div>
                      <div className="font-medium">{timeLimit ? `${timeLimit} seconds` : "No limit"}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto" 
                      onClick={() => router.push("/quiz/new")}
                    >
                      New Quiz
                    </Button>
                    <Button 
                      className="w-full sm:w-auto" 
                      onClick={() => router.push("/")}
                    >
                      Back to Home
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto gap-2" 
                      onClick={() => router.push(`/quiz/new?mode=study&category=${category}`)}
                    >
                      <BookOpen className="h-4 w-4" />
                      Study Mode
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-sm text-muted-foreground">Question</span>
                <h2 className="text-xl font-bold">
                  {currentQuestionIndex + 1} of {questions.length}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Score:</span>
                <Badge>{score}</Badge>
              </div>
              {timeLimit > 0 && !isStudyMode && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className={`font-mono ${timeRemaining < 10 ? "text-destructive animate-pulse" : ""}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              )}
            </div>

            <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-8" />

            {currentQuestion && (
              <QuizSwipe
                onSwipeLeft={() => {
                  if (currentQuestionIndex < questions.length - 1 && isAnswerSubmitted) {
                    setCurrentQuestionIndex((prev) => prev + 1)
                    setSelectedAnswer(null)
                    setIsAnswerSubmitted(false)
                    setTimeRemaining(timeLimit)
                  }
                }}
                onSwipeRight={() => {
                  if (currentQuestionIndex > 0 && isAnswerSubmitted) {
                    setCurrentQuestionIndex((prev) => prev - 1)
                    setSelectedAnswer(null)
                    setIsAnswerSubmitted(false)
                    setTimeRemaining(timeLimit)
                  }
                }}
              >
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option
                        const isCorrect = isAnswerSubmitted && option === currentQuestion.correctAnswer
                        const isWrong = isAnswerSubmitted && isSelected && option !== currentQuestion.correctAnswer

                        return (
                          <Button
                            key={option}
                            variant={isSelected ? "default" : "outline"}
                            className={`h-auto py-4 px-6 justify-start text-left transition-all duration-300 ${
                              isCorrect
                                ? "bg-green-500 hover:bg-green-500 text-white scale-105"
                                : isWrong
                                  ? "bg-red-500 hover:bg-red-500 text-white scale-105"
                                  : ""
                            }`}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswerSubmitted}
                          >
                            {option}
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={soundEnabled ? "text-primary" : "text-muted-foreground"}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setHapticEnabled(!hapticEnabled)}
                        className={hapticEnabled ? "text-primary" : "text-muted-foreground"}
                      >
                        <span className="text-lg">📳</span>
                      </Button>
                    </div>
                    {isMobile ? (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            if (currentQuestionIndex > 0 && isAnswerSubmitted) {
                              setCurrentQuestionIndex((prev) => prev - 1)
                              setSelectedAnswer(null)
                              setIsAnswerSubmitted(false)
                              setTimeRemaining(timeLimit)
                            }
                          }}
                          disabled={currentQuestionIndex === 0 || !isAnswerSubmitted}
                        >
                          ←
                        </Button>
                        <Button
                          onClick={() => handleAnswerSubmit(null)}
                          disabled={!selectedAnswer || isAnswerSubmitted}
                          className="gap-2"
                        >
                          {isAnswerSubmitted ? "Next" : "Submit"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            if (currentQuestionIndex < questions.length - 1 && isAnswerSubmitted) {
                              setCurrentQuestionIndex((prev) => prev + 1)
                              setSelectedAnswer(null)
                              setIsAnswerSubmitted(false)
                              setTimeRemaining(timeLimit)
                            }
                          }}
                          disabled={currentQuestionIndex === questions.length - 1 || !isAnswerSubmitted}
                        >
                          →
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAnswerSubmit(null)}
                        disabled={!selectedAnswer || isAnswerSubmitted}
                        className="gap-2"
                      >
                        {isAnswerSubmitted ? "Next Question" : "Submit Answer"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </QuizSwipe>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

