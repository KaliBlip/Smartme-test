"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"

// Mock data for subjects
const subjects = [
  {
    id: "s1",
    name: "Mathematics",
    description: "Basic mathematics and algebra",
    level: "JHS",
    status: "Active",
    questionsCount: 450,
    quizzesCount: 25,
  },
  {
    id: "s2",
    name: "Science",
    description: "General science and physics",
    level: "JHS",
    status: "Active",
    questionsCount: 380,
    quizzesCount: 20,
  },
  {
    id: "s3",
    name: "English",
    description: "Grammar and literature",
    level: "JHS",
    status: "Active",
    questionsCount: 320,
    quizzesCount: 18,
  },
  {
    id: "s4",
    name: "Advanced Mathematics",
    description: "Calculus and statistics",
    level: "SHS",
    status: "Active",
    questionsCount: 280,
    quizzesCount: 15,
  },
  {
    id: "s5",
    name: "Physics",
    description: "Advanced physics concepts",
    level: "SHS",
    status: "Active",
    questionsCount: 250,
    quizzesCount: 12,
  },
  {
    id: "s6",
    name: "Chemistry",
    description: "Organic and inorganic chemistry",
    level: "SHS",
    status: "Inactive",
    questionsCount: 200,
    quizzesCount: 10,
  },
]

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    level: "JHS",
    status: "Active",
  })

  // Filter subjects based on search query and level filter
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = levelFilter === "all" || subject.level === levelFilter

    return matchesSearch && matchesLevel
  })

  const handleAddSubject = () => {
    // Here you would typically make an API call to add the subject
    console.log("Adding new subject:", newSubject)
    setIsDialogOpen(false)
    setNewSubject({
      name: "",
      description: "",
      level: "JHS",
      status: "Active",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Manage quiz subjects and categories</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>
                Create a new subject for quizzes. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={newSubject.name}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, name: e.target.value })
                  }
                  placeholder="Enter subject name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newSubject.description}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, description: e.target.value })
                  }
                  placeholder="Enter subject description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="level">Education Level</Label>
                <Select
                  value={newSubject.level}
                  onValueChange={(value) =>
                    setNewSubject({ ...newSubject, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JHS">Junior High School</SelectItem>
                    <SelectItem value="SHS">Senior High School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubject}>Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subject Management</CardTitle>
          <CardDescription>Browse and manage all quiz subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subjects..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="JHS">JHS</SelectItem>
                  <SelectItem value="SHS">SHS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Switch
                        defaultChecked={subject.status === "Active"}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Level</span>
                        <span className="font-medium">{subject.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Questions</span>
                        <span className="font-medium">{subject.questionsCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quizzes</span>
                        <span className="font-medium">{subject.quizzesCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 