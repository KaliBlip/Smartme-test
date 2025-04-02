"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "sonner"
import { Database } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Question = Database["public"]["Tables"]["questions"]["Row"]
type Subject = Database["public"]["Tables"]["subjects"]["Row"]

// This function is required for static export
export async function generateStaticParams() {
  // For static export, we'll return an empty array
  // In a real app, you would fetch all question IDs and return them
  return []
}

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { profile } = useSupabaseAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [question, setQuestion] = useState<Question | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (profile?.role !== "admin") {
      router.push("/")
      return
    }

    fetchQuestion()
    fetchSubjects()
  }, [profile, router, params.id])

  const fetchQuestion = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) throw error
      setQuestion(data)
    } catch (error) {
      toast.error("Failed to fetch question")
      router.push("/admin/questions")
    } finally {
      setLoading(false)
    }
  }

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("status", "active")
        .order("name")

      if (error) throw error
      setSubjects(data || [])
    } catch (error) {
      toast.error("Failed to fetch subjects")
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    if (!question) return
    const newOptions = [...question.options]
    newOptions[index] = value
    setQuestion({ ...question, options: newOptions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question) return

    setSaving(true)

    try {
      const { error } = await supabase
        .from("questions")
        .update({
          question_text: question.question_text,
          subject_id: question.subject_id,
          question_type: question.question_type,
          difficulty_level: question.difficulty_level,
          correct_answer: question.correct_answer,
          options: question.options.filter(Boolean),
          explanation: question.explanation,
          status: question.status,
        })
        .eq("id", question.id)

      if (error) throw error
      toast.success("Question updated successfully")
      router.push("/admin/questions")
    } catch (error) {
      toast.error("Failed to update question")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Question not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Question</h1>
          <p className="text-muted-foreground">
            Update question details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
            <CardDescription>
              Update the question information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={question.subject_id}
                  onValueChange={(value) =>
                    setQuestion({ ...question, subject_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="question">Question Text</Label>
                <Textarea
                  id="question"
                  value={question.question_text}
                  onChange={(e) =>
                    setQuestion({ ...question, question_text: e.target.value })
                  }
                  placeholder="Enter your question"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Question Type</Label>
                  <Select
                    value={question.question_type}
                    onValueChange={(value: "multiple_choice" | "true_false" | "short_answer") =>
                      setQuestion({ ...question, question_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      <SelectItem value="true_false">True/False</SelectItem>
                      <SelectItem value="short_answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={question.difficulty_level}
                    onValueChange={(value: "easy" | "medium" | "hard") =>
                      setQuestion({ ...question, difficulty_level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {question.question_type === "multiple_choice" && (
                <div className="space-y-4">
                  <Label>Options</Label>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = question.options.filter((_, i) => i !== index)
                          setQuestion({ ...question, options: newOptions })
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setQuestion({
                        ...question,
                        options: [...question.options, ""],
                      })
                    }}
                  >
                    Add Option
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="correct_answer">Correct Answer</Label>
                {question.question_type === "true_false" ? (
                  <Select
                    value={question.correct_answer}
                    onValueChange={(value) =>
                      setQuestion({ ...question, correct_answer: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="correct_answer"
                    value={question.correct_answer}
                    onChange={(e) =>
                      setQuestion({ ...question, correct_answer: e.target.value })
                    }
                    placeholder="Enter correct answer"
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation</Label>
                <Textarea
                  id="explanation"
                  value={question.explanation || ""}
                  onChange={(e) =>
                    setQuestion({ ...question, explanation: e.target.value })
                  }
                  placeholder="Explain why this is the correct answer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={question.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setQuestion({ ...question, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/questions")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 