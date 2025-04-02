"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "sonner"
import { Database } from "@/lib/supabase/types"

type DashboardStats = {
  totalUsers: number
  activeUsers: number
  totalQuizzes: number
  totalQuestions: number
  totalSubjects: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const { profile, loading: authLoading } = useSupabaseAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    totalSubjects: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (authLoading) return

    if (!profile) {
      router.push("/login")
      return
    }

    if (profile.role !== "admin") {
      router.push("/")
      return
    }

    const fetchStats = async () => {
      try {
        const [
          { count: totalUsers },
          { count: activeUsers },
          { count: totalQuizzes },
          { count: totalQuestions },
          { count: totalSubjects },
        ] = await Promise.all([
          supabase.from("user_profiles").select("*", { count: "exact", head: true }),
          supabase.from("user_profiles").select("*", { count: "exact", head: true }).eq("status", "active"),
          supabase.from("quizzes").select("*", { count: "exact", head: true }),
          supabase.from("questions").select("*", { count: "exact", head: true }),
          supabase.from("subjects").select("*", { count: "exact", head: true }),
        ])

        setStats({
          totalUsers: totalUsers || 0,
          activeUsers: activeUsers || 0,
          totalQuizzes: totalQuizzes || 0,
          totalQuestions: totalQuestions || 0,
          totalSubjects: totalSubjects || 0,
        })
      } catch (error) {
        toast.error("Failed to fetch dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [profile, router, supabase, authLoading])

  if (authLoading || loading) {
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
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your quiz application
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">
                Completed by users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground">
                Available questions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubjects}</div>
              <p className="text-xs text-muted-foreground">
                Active subjects
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/admin/users")}
              >
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/admin/subjects")}
              >
                Manage Subjects
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/admin/questions")}
              >
                Manage Questions
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push("/admin/analytics")}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 