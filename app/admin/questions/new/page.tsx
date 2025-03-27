"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, ArrowLeft, Plus, Minus, Save, Check, Clock } from "lucide-react"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export default function NewQuestionPage() {
  const router = useRouter()
  const [level, setLevel] = useState("JHS")
  const [subject, setSubject] = useState("")
  const [difficulty, setDifficulty] = useState("Medium")
  const [timeLimit, setTimeLimit] = useState(60) // Default time limit in seconds
  
  // Current question being edited
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0)
  
  // List of saved questions
  const [savedQuestions, setSavedQuestions] = useState<QuestionItem[]>([])

  // Subject options based on selected education level
  const jhsSubjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "social-studies", label: "Social Studies" },
  ]

  const shsSubjects = [
    { value: "mathematics", label: "Advanced Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English Literature" },
    { value: "history", label: "History" },
    { value: "languages", label: "Languages" },
    { value: "arts", label: "Arts & Literature" },
  ]

  const subjectOptions = level === "JHS" ? jhsSubjects : shsSubjects

  // Handle option changes for current question
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // Add a new option (maximum 6)
  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""])
    }
  }

  // Remove an option (minimum 2)
  const removeOption = (index: number) => {
    if (options.length > 2) {
      // Update the correct answer index if needed
      if (correctAnswerIndex === index) {
        setCorrectAnswerIndex(0)
      } else if (correctAnswerIndex > index) {
        setCorrectAnswerIndex(correctAnswerIndex - 1)
      }

      const newOptions = options.filter((_, i) => i !== index)
      setOptions(newOptions)
    }
  }

  // Save current question to the list
  const saveQuestion = () => {
    // Validate the current question
    if (!currentQuestion.trim()) {
      alert("Please enter a question")
      return false
    }

    if (options.some(option => !option.trim())) {
      alert("Please fill in all options")
      return false
    }

    // Add the current question to the saved questions list
    const newQuestion: QuestionItem = {
      id: Date.now().toString(),
      question: currentQuestion,
      options: [...options],
      correctAnswerIndex,
    }
    
    setSavedQuestions([...savedQuestions, newQuestion])
    
    // Reset current question form
    setCurrentQuestion("")
    setOptions(["", "", "", ""])
    setCorrectAnswerIndex(0)
    
    return true
  }

  // Remove a question from the list
  const removeQuestion = (id: string) => {
    setSavedQuestions(savedQuestions.filter(q => q.id !== id))
  }

  // Format time in minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!subject) {
      alert("Please select a subject")
      return
    }

    // If there's a current question being edited, try to save it first
    if (currentQuestion.trim()) {
      const saved = saveQuestion()
      if (!saved) return // Stop if validation failed
    }

    // Make sure we have at least one question
    if (savedQuestions.length === 0) {
      alert("Please add at least one question")
      return
    }

    // In a real application, we would send this data to an API
    console.log({
      level,
      subject,
      difficulty,
      timeLimit,
      questions: savedQuestions,
    })

    // Navigate back to admin questions page after successfully adding questions
    router.push("/admin")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">SMARTME TEST</h1>
              </div>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add Questions</h1>

            <form onSubmit={handleSubmit}>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Question Category</CardTitle>
                  <CardDescription>Set the education level, subject and difficulty for all questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="level">Education Level</Label>
                    <RadioGroup
                      id="level"
                      value={level}
                      onValueChange={setLevel}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="JHS" id="jhs" />
                        <Label htmlFor="jhs">Junior High School (JHS)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SHS" id="shs" />
                        <Label htmlFor="shs">Senior High School (SHS)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeLimit">Time Limit Per Question</Label>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{formatTime(timeLimit)}</span>
                      </div>
                    </div>
                    <Slider
                      id="timeLimit"
                      min={15}
                      max={180}
                      step={5}
                      value={[timeLimit]}
                      onValueChange={(values) => setTimeLimit(values[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>15 seconds</span>
                      <span>1 minute</span>
                      <span>3 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* List of saved questions */}
              {savedQuestions.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Saved Questions ({savedQuestions.length})</CardTitle>
                    <CardDescription>
                      Questions that will be added to the database when you submit the form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="max-h-[300px]">
                      <Accordion type="multiple" className="w-full">
                        {savedQuestions.map((q, index) => (
                          <AccordionItem key={q.id} value={q.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-2 text-left">
                                <span>Question {index + 1}</span>
                                <div className={cn(badgeVariants({ variant: "outline" }), "ml-2")}>
                                  {q.options.length} options
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 p-2">
                                <p className="font-medium">{q.question}</p>
                                <div className="space-y-2">
                                  {q.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex items-center gap-2">
                                      {optIndex === q.correctAnswerIndex && (
                                        <Check className="h-4 w-4 text-green-500" />
                                      )}
                                      <div className={optIndex === q.correctAnswerIndex ? "font-medium" : ""}>
                                        {option}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => removeQuestion(q.id)}
                                  className="mt-2"
                                >
                                  Remove Question
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {/* Add a new question */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Add Question #{savedQuestions.length + 1}</CardTitle>
                  <CardDescription>
                    Create a new question with multiple choice options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Textarea
                      id="question"
                      placeholder="Enter your question here..."
                      value={currentQuestion}
                      onChange={(e) => setCurrentQuestion(e.target.value)}
                      className="min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Answer Options</Label>
                      <div className={cn(badgeVariants({ variant: "outline" }))}>
                        {options.length} options
                      </div>
                    </div>
                    
                    <RadioGroup
                      value={String(correctAnswerIndex)}
                      onValueChange={(value) => setCorrectAnswerIndex(Number(value))}
                    >
                      <div className="space-y-4">
                        {options.map((option, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <RadioGroupItem
                                  id={`option-${index}`}
                                  value={String(index)}
                                />
                                <Label htmlFor={`option-${index}`} className="font-medium">
                                  {index === correctAnswerIndex && "Correct Answer"}
                                </Label>
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  placeholder={`Option ${index + 1}`}
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                {options.length > 2 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeOption(index)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    {options.length < 6 && (
                      <Button type="button" variant="outline" onClick={addOption} className="w-full mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Option
                      </Button>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={saveQuestion}
                    disabled={!currentQuestion.trim()}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Question and Add Another
                  </Button>
                  <Button type="submit">
                    Submit All Questions
                  </Button>
                </CardFooter>
              </Card>
            </form>
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
            &copy; {new Date().getFullYear()} SMARTME TEST Admin Panel
          </p>
        </div>
      </footer>
    </div>
  )
} 