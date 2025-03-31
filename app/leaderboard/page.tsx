"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Trophy, Medal, Award, School } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for JHS leaderboard
const jhsLeaderboardData = [
  { id: "1", name: "Alex Johnson", score: 9850, quizzesTaken: 42, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Jamie Smith", score: 8720, quizzesTaken: 38, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Taylor Brown", score: 8450, quizzesTaken: 35, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Jordan Wilson", score: 7980, quizzesTaken: 31, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Casey Miller", score: 7650, quizzesTaken: 29, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Riley Davis", score: 7320, quizzesTaken: 27, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "7", name: "Morgan Lee", score: 6890, quizzesTaken: 25, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "8", name: "Quinn Taylor", score: 6540, quizzesTaken: 23, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "9", name: "Avery Martin", score: 6210, quizzesTaken: 21, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "10", name: "Reese Clark", score: 5980, quizzesTaken: 19, level: "JHS", avatar: "/placeholder.svg?height=40&width=40" },
]

// Mock data for SHS leaderboard
const shsLeaderboardData = [
  { id: "1", name: "Sam Thompson", score: 10250, quizzesTaken: 45, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Charlie Wilson", score: 9870, quizzesTaken: 43, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Drew Anderson", score: 9320, quizzesTaken: 40, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Parker Lewis", score: 8750, quizzesTaken: 38, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Jordan Green", score: 8420, quizzesTaken: 36, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Avery White", score: 8100, quizzesTaken: 34, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "7", name: "Riley Johnson", score: 7860, quizzesTaken: 32, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "8", name: "Casey Davis", score: 7540, quizzesTaken: 30, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "9", name: "Taylor Smith", score: 7210, quizzesTaken: 28, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "10", name: "Quinn Brown", score: 6950, quizzesTaken: 26, level: "SHS", avatar: "/placeholder.svg?height=40&width=40" },
]

// Mock data for JHS subject leaders
const jhsSubjectLeaders = [
  { subject: "Mathematics", name: "Alex Johnson", score: 2450 },
  { subject: "Science", name: "Jamie Smith", score: 2180 },
  { subject: "English", name: "Taylor Brown", score: 1950 },
  { subject: "Social Studies", name: "Jordan Wilson", score: 1820 },
]

// Mock data for SHS subject leaders
const shsSubjectLeaders = [
  { subject: "Advanced Mathematics", name: "Sam Thompson", score: 2650 },
  { subject: "Science", name: "Charlie Wilson", score: 2380 },
  { subject: "English Literature", name: "Drew Anderson", score: 2150 },
  { subject: "History", name: "Parker Lewis", score: 1980 },
]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("jhs")
  
  // Determine which data to show based on active tab
  const leaderboardData = activeTab === "jhs" ? jhsLeaderboardData : shsLeaderboardData
  const subjectLeaders = activeTab === "jhs" ? jhsSubjectLeaders : shsSubjectLeaders

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-4">Academic Leaderboard</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how you stack up against other students in your educational level
            </p>
          </div>

          <Tabs defaultValue="jhs" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="jhs" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  Junior High School
                </TabsTrigger>
                <TabsTrigger value="shs" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  Senior High School
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="jhs">
              <LeaderboardContent leaderboardData={jhsLeaderboardData} subjectLeaders={jhsSubjectLeaders} />
            </TabsContent>

            <TabsContent value="shs">
              <LeaderboardContent leaderboardData={shsLeaderboardData} subjectLeaders={shsSubjectLeaders} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SMARTME TEST</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SMARTME TEST. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

// Separate component for leaderboard content to avoid code duplication
function LeaderboardContent({ leaderboardData, subjectLeaders }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {/* Top 3 Players */}
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((player, index) => (
          <Card
            key={player.id}
            className={`overflow-hidden ${index === 0 ? "border-yellow-400 border-2" : index === 1 ? "border-gray-400 border-2" : "border-amber-700 border-2"}`}
          >
            <div
              className={`h-2 ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-amber-700"}`}
            ></div>
            <CardHeader className="flex flex-row items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-600"
                    : index === 1
                      ? "bg-gray-100 text-gray-600"
                      : "bg-amber-100 text-amber-600"
                }`}
              >
                {index === 0 ? (
                  <Trophy className="h-6 w-6" />
                ) : index === 1 ? (
                  <Medal className="h-6 w-6" />
                ) : (
                  <Award className="h-6 w-6" />
                )}
              </div>
              <div>
                <CardTitle className="text-xl">{player.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Rank #{index + 1}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold">{player.score.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                  <p className="text-2xl font-bold">{player.quizzesTaken}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Leaderboard */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>{leaderboardData[0]?.level || "Student"} Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-4 p-3 rounded-lg ${index < 3 ? "bg-muted/50" : ""}`}
                >
                  <div className="w-8 text-center font-bold text-muted-foreground">#{index + 1}</div>
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.quizzesTaken} quizzes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{player.score.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Leaders */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Subject Champions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectLeaders.map((leader) => (
                <div key={leader.subject} className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">{leader.subject}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-medium">{leader.name}</p>
                    <p className="font-bold">{leader.score.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">Sign in to see your ranking</p>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

