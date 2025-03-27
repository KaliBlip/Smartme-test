"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, Users, BookOpen, Plus, Search, Trash, Edit, Check, X, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardPage() {
  const [selectedTab, setSelectedTab] = useState("questions")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for users
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "student", status: "active", level: "JHS" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "student", status: "pending", level: "SHS" },
    { id: "3", name: "Mark Wilson", email: "mark@example.com", role: "admin", status: "active", level: "N/A" },
    { id: "4", name: "Sarah Johnson", email: "sarah@example.com", role: "student", status: "active", level: "JHS" },
    { id: "5", name: "Mike Brown", email: "mike@example.com", role: "student", status: "inactive", level: "SHS" },
  ]

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

  // Filter questions based on search query
  const filteredQuestions = questions.filter(
    (question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.level.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.level.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Format time in seconds to a readable format
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`
    } else {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-muted/50 border-r hidden md:block">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">SMARTME TEST</h1>
          </div>
          <nav className="space-y-2">
            <Link href="/admin">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
                <span>Questions</span>
              </div>
            </Link>
            <Link href="/admin/users">
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted">
                <Users className="h-5 w-5" />
                <span>Users</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b">
          <div className="container py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Tabs defaultValue="questions" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="questions" onClick={() => setSelectedTab("questions")}>
                  Questions
                </TabsTrigger>
                <TabsTrigger value="users" onClick={() => setSelectedTab("users")}>
                  Users
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${selectedTab}...`}
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Link href="/admin/questions/new">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </Link>
              </div>
            </div>

            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Questions</CardTitle>
                  <CardDescription>
                    Manage the academic quiz questions for both JHS and SHS levels.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Time Limit</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium max-w-md truncate">
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    View and manage students and administrative users.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.level}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {user.status === "active" ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : user.status === "pending" ? (
                                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                              <span
                                className={
                                  user.status === "active"
                                    ? "text-green-500"
                                    : user.status === "pending"
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }
                              >
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </div>
                          </TableCell>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t p-4">
          <div className="container text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SMARTME TEST Admin Panel
          </div>
        </footer>
      </div>
    </div>
  )
} 