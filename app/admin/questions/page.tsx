"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, FileQuestion, Plus, Search, Trash } from "lucide-react"
import Link from "next/link"

// Mock data for questions
const questions = [
  {
    id: "q1",
    question: "What is the chemical symbol for water?",
    level: "JHS",
    subject: "Science",
    difficulty: "Easy",
    dateAdded: "2023-06-15",
    timeLimit: 30,
  },
  {
    id: "q2",
    question: "What is the derivative of f(x) = 3x² + 2x - 5?",
    level: "SHS",
    subject: "Mathematics",
    difficulty: "Hard",
    dateAdded: "2023-06-10",
    timeLimit: 60,
  },
  {
    id: "q3",
    question: "Who wrote 'Romeo and Juliet'?",
    level: "JHS",
    subject: "English",
    difficulty: "Medium",
    dateAdded: "2023-06-08",
    timeLimit: 45,
  },
  {
    id: "q4",
    question: "What is the capital of Ghana?",
    level: "JHS",
    subject: "Social Studies",
    difficulty: "Easy",
    dateAdded: "2023-06-05",
    timeLimit: 30,
  },
  {
    id: "q5",
    question: "What is the main function of the respiratory system?",
    level: "SHS",
    subject: "Science",
    difficulty: "Medium",
    dateAdded: "2023-06-01",
    timeLimit: 45,
  },
]

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  // Filter questions based on search query and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = levelFilter === "all" || question.level === levelFilter
    const matchesSubject = subjectFilter === "all" || question.subject === subjectFilter
    const matchesDifficulty = difficultyFilter === "all" || question.difficulty === difficultyFilter

    return matchesSearch && matchesLevel && matchesSubject && matchesDifficulty
  })

  // Format time in seconds to a readable format
  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`
    } else {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Questions</h1>
          <p className="text-muted-foreground">Manage quiz questions for all subjects and levels</p>
        </div>
        <Link href="/admin/questions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Bank</CardTitle>
          <CardDescription>Browse and manage all quiz questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="JHS">JHS</SelectItem>
                    <SelectItem value="SHS">SHS</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Questions Table */}
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Question</TableHead>
                    <TableHead className="whitespace-nowrap">Level</TableHead>
                    <TableHead className="whitespace-nowrap">Subject</TableHead>
                    <TableHead className="whitespace-nowrap">Difficulty</TableHead>
                    <TableHead className="whitespace-nowrap">Time Limit</TableHead>
                    <TableHead className="whitespace-nowrap">Date Added</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {question.question}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.level}</Badge>
                      </TableCell>
                      <TableCell>{question.subject}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            question.difficulty === "Easy"
                              ? "default"
                              : question.difficulty === "Medium"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {question.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{formatTime(question.timeLimit)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{question.dateAdded}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 