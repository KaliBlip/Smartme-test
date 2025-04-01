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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Subject = Database["public"]["Tables"]["subjects"]["Row"]

export default function EditSubjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { profile } = useSupabaseAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [subject, setSubject] = useState<Subject | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (profile?.role !== "admin") {
      router.push("/")
      return
    }

    fetchSubject()
  }, [profile, router, params.id])

  const fetchSubject = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", params.id)
        .single()

      if (error) throw error
      setSubject(data)
    } catch (error) {
      toast.error("Failed to fetch subject")
      router.push("/admin/subjects")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject) return

    setSaving(true)

    try {
      const { error } = await supabase
        .from("subjects")
        .update({
          name: subject.name,
          description: subject.description,
          level: subject.level,
          status: subject.status,
        })
        .eq("id", subject.id)

      if (error) throw error
      toast.success("Subject updated successfully")
      router.push("/admin/subjects")
    } catch (error) {
      toast.error("Failed to update subject")
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

  if (!subject) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Subject not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Subject</h1>
          <p className="text-muted-foreground">
            Update subject details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Details</CardTitle>
            <CardDescription>
              Update the subject information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={subject.name}
                  onChange={(e) =>
                    setSubject({ ...subject, name: e.target.value })
                  }
                  placeholder="Enter subject name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={subject.description || ""}
                  onChange={(e) =>
                    setSubject({ ...subject, description: e.target.value })
                  }
                  placeholder="Enter subject description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Education Level</Label>
                <Select
                  value={subject.level}
                  onValueChange={(value: "JHS" | "SHS") =>
                    setSubject({ ...subject, level: value })
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
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={subject.status}
                  onValueChange={(value: "active" | "inactive") =>
                    setSubject({ ...subject, status: value })
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
                  onClick={() => router.push("/admin/subjects")}
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