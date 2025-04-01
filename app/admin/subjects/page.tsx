"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "sonner"
import { Database } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import Link from "next/link"

type Subject = Database["public"]["Tables"]["subjects"]["Row"]

export default function SubjectsPage() {
  const router = useRouter()
  const { profile } = useSupabaseAuth()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (profile?.role !== "admin") {
      router.push("/")
      return
    }

    fetchSubjects()
  }, [profile, router])

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setSubjects(data || [])
    } catch (error) {
      toast.error("Failed to fetch subjects")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (subjectId: string, newStatus: "active" | "inactive") => {
    try {
      const { error } = await supabase
        .from("subjects")
        .update({ status: newStatus })
        .eq("id", subjectId)

      if (error) throw error
      toast.success(`Subject status updated to ${newStatus}`)
      fetchSubjects()
    } catch (error) {
      toast.error("Failed to update subject status")
    }
  }

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Subjects</h1>
            <p className="text-muted-foreground">
              Manage quiz subjects and categories
            </p>
          </div>
          <Link href="/admin/subjects/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Quizzes</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.name}</TableCell>
                  <TableCell>{subject.description || "No description"}</TableCell>
                  <TableCell>{subject.level}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subject.status === "active"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {subject.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{subject.questions_count || 0}</TableCell>
                  <TableCell>{subject.quizzes_count || 0}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/subjects/${subject.id}`)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(
                              subject.id,
                              subject.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          {subject.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
} 