"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetPassword, updatePassword, verifyEmail } = useSupabaseAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isResetMode, setIsResetMode] = useState(true)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await resetPassword(email)
      toast.success("Password reset instructions sent to your email")
      setIsResetMode(false)
    } catch (error) {
      toast.error("Failed to send reset instructions")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await updatePassword(newPassword)
      toast.success("Password updated successfully")
      router.push("/login")
    } catch (error) {
      toast.error("Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  // Handle email verification
  const token = searchParams.get("token")
  if (token) {
    verifyEmail(token).catch((error) => {
      toast.error("Failed to verify email")
    })
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {isResetMode
              ? "Enter your email to receive reset instructions"
              : "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={isResetMode ? handleResetPassword : handleUpdatePassword}>
          <CardContent className="space-y-4">
            {isResetMode ? (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? isResetMode
                  ? "Sending instructions..."
                  : "Updating password..."
                : isResetMode
                ? "Send Reset Instructions"
                : "Update Password"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Remember your password?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 