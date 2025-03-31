"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Implement actual login logic
    // For now, just simulate a delay and redirect
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-10 w-10 text-primary" />
                  <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sign in to your SmartMe Test account
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">SMARTME TEST</span>
          </div>
          <p className="text-muted-foreground text-xs text-center">
            &copy; {new Date().getFullYear()} SMARTME TEST. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

