"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calculator, BookOpen, TestTube, Globe, Music, Languages as LanguagesIcon, History as HistoryIcon, PenTool as PenToolIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

const jhsCategories = [
  {
    id: "jhs-mathematics",
    name: "Mathematics",
    description: "Test your knowledge of basic mathematics concepts and problem-solving skills",
    icon: Calculator,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-500",
    questionCount: 350,
  },
  {
    id: "jhs-science",
    name: "Science",
    description: "Challenge yourself with questions about basic scientific principles and discoveries",
    icon: TestTube,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-500",
    questionCount: 320,
  },
  {
    id: "jhs-english",
    name: "English",
    description: "Practice your English grammar, vocabulary, and reading comprehension skills",
    icon: BookOpen,
    color: "bg-purple-100 dark:bg-purple-900", 
    iconColor: "text-purple-500",
    questionCount: 280,
  },
  {
    id: "jhs-social-studies",
    name: "Social Studies",
    description: "Learn about history, geography, and social concepts appropriate for JHS level",
    icon: Globe,
    color: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-500",
    questionCount: 250,
  },
]

const shsCategories = [
  {
    id: "shs-mathematics",
    name: "Advanced Mathematics",
    description: "Test your skills in advanced mathematical concepts including algebra and calculus",
    icon: Calculator,
    color: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-500",
    questionCount: 400,
  },
  {
    id: "shs-science",
    name: "Science",
    description: "Advanced physics, chemistry, and biology questions for senior high school students",
    icon: TestTube,
    color: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-500",
    questionCount: 450,
  },
  {
    id: "shs-english",
    name: "English Literature",
    description: "Explore literary analysis, advanced grammar, and composition skills",
    icon: BookOpen,
    color: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-500",
    questionCount: 350,
  },
  {
    id: "shs-history",
    name: "History",
    description: "Comprehensive questions about world history and significant historical events",
    icon: HistoryIcon,
    color: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-500",
    questionCount: 380,
  },
  {
    id: "shs-languages",
    name: "Languages",
    description: "Test your knowledge of foreign languages and linguistic concepts",
    icon: LanguagesIcon,
    color: "bg-pink-100 dark:bg-pink-900",
    iconColor: "text-pink-500",
    questionCount: 300,
  },
  {
    id: "shs-arts",
    name: "Arts & Literature",
    description: "Explore questions about art history, techniques, and literary masterpieces",
    icon: PenToolIcon,
    color: "bg-orange-100 dark:bg-orange-900",
    iconColor: "text-orange-500",
    questionCount: 320,
  },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Academic Subjects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from a variety of subjects based on your education level to test your knowledge with professionally curated questions
            </p>
          </div>

          <Tabs defaultValue="jhs" className="mb-8">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="jhs">Junior High School (JHS)</TabsTrigger>
                <TabsTrigger value="shs">Senior High School (SHS)</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="jhs">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {jhsCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className={`${category.color}`}>
                      <div className="flex justify-between items-start">
                        <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                        <div className={cn(badgeVariants({ variant: "secondary" }))}>
                          {category.questionCount}+ Questions
                        </div>
                      </div>
                      <CardTitle className="mt-4">{category.name}</CardTitle>
                      <CardDescription className="text-foreground/70">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2">
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Easy</div>
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Medium</div>
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Hard</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz/new?category=${category.id}&level=jhs`} className="w-full">
                        <Button className="w-full">Start Quiz</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shs">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {shsCategories.map((category) => (
                  <Card key={category.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className={`${category.color}`}>
                      <div className="flex justify-between items-start">
                        <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                        <div className={cn(badgeVariants({ variant: "secondary" }))}>
                          {category.questionCount}+ Questions
                        </div>
                      </div>
                      <CardTitle className="mt-4">{category.name}</CardTitle>
                      <CardDescription className="text-foreground/70">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap gap-2">
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Easy</div>
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Medium</div>
                        <div className={cn(badgeVariants({ variant: "outline" }))}>Hard</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/quiz/new?category=${category.id}&level=shs`} className="w-full">
                        <Button className="w-full">Start Quiz</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
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

