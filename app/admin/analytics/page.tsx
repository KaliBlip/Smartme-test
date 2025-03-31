"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  School,
  Users,
} from "lucide-react"
import { useState } from "react"

// Mock data for analytics
const performanceData = {
  totalUsers: 1234,
  totalQuizzes: 2543,
  averageScore: 76,
  completionRate: 85,
  subjectPerformance: {
    Mathematics: { jhs: 75, shs: 82 },
    Science: { jhs: 68, shs: 75 },
    English: { jhs: 82, shs: 78 },
    "Social Studies": { jhs: 70, shs: 73 },
  },
  recentTrends: {
    users: "+12%",
    quizzes: "+23%",
    scores: "+2%",
  },
  timeDistribution: {
    "0-15min": 25,
    "15-30min": 45,
    "30-45min": 20,
    "45-60min": 10,
  },
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track student performance and system usage</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.totalUsers}</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              {performanceData.recentTrends.users} from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.totalQuizzes}</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              {performanceData.recentTrends.quizzes} from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.averageScore}%</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              {performanceData.recentTrends.scores} from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceData.completionRate}%</div>
            <p className="text-xs text-muted-foreground pt-1">Of quizzes started</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Subject Performance */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Average scores by subject and level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.entries(performanceData.subjectPerformance).map(([subject, levels]) => (
                <div key={subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{subject}</p>
                      <p className="text-sm text-muted-foreground">JHS vs SHS Performance</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <School className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{levels.jhs}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{levels.shs}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${(levels.jhs + levels.shs) / 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Distribution */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quiz Duration Distribution</CardTitle>
            <CardDescription>Time spent on quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(performanceData.timeDistribution).map(([range, percentage]) => (
                <div key={range} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium">{range}</p>
                    <p className="text-muted-foreground">{percentage}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 