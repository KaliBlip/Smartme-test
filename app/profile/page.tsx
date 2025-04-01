"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useSupabaseAuth } from "@/components/providers/supabase-auth-provider"
import { toast } from "sonner"
import { UserProfile, UserSettings } from "@/lib/supabase/types"

export default function ProfilePage() {
  const { profile, settings, updateProfile, updateSettings } = useSupabaseAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: profile?.name || "",
    level: profile?.level || "n/a",
  })
  const [settingsData, setSettingsData] = useState<Partial<UserSettings>>({
    email_notifications: settings?.email_notifications || false,
    push_notifications: settings?.push_notifications || false,
    weekly_report: settings?.weekly_report || false,
    theme: settings?.theme || "system",
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateProfile(formData)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateSettings(settingsData)
      toast.success("Settings updated successfully")
    } catch (error) {
      toast.error("Failed to update settings")
    } finally {
      setLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Education Level</Label>
                    <select
                      id="level"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={formData.level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level: e.target.value as "jhs" | "shs" | "n/a",
                        })
                      }
                    >
                      <option value="n/a">Not Applicable</option>
                      <option value="jhs">Junior High School</option>
                      <option value="shs">Senior High School</option>
                    </select>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSettingsUpdate} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications about your account
                      </p>
                    </div>
                    <Switch
                      checked={settingsData.email_notifications}
                      onCheckedChange={(checked) =>
                        setSettingsData({
                          ...settingsData,
                          email_notifications: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications about your account
                      </p>
                    </div>
                    <Switch
                      checked={settingsData.push_notifications}
                      onCheckedChange={(checked) =>
                        setSettingsData({
                          ...settingsData,
                          push_notifications: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your progress
                      </p>
                    </div>
                    <Switch
                      checked={settingsData.weekly_report}
                      onCheckedChange={(checked) =>
                        setSettingsData({
                          ...settingsData,
                          weekly_report: checked,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={settingsData.theme}
                      onChange={(e) =>
                        setSettingsData({
                          ...settingsData,
                          theme: e.target.value as "light" | "dark" | "system",
                        })
                      }
                    >
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Settings"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Statistics</CardTitle>
                <CardDescription>
                  View your quiz performance statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Quizzes Taken</h3>
                    <p className="text-2xl font-bold">{profile.quizzes_taken || 0}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Average Score</h3>
                    <p className="text-2xl font-bold">
                      {profile.average_score?.toFixed(1) || "0"}%
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Total Score</h3>
                    <p className="text-2xl font-bold">{profile.total_score || 0}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Last Quiz</h3>
                    <p className="text-2xl font-bold">
                      {profile.last_quiz_date
                        ? new Date(profile.last_quiz_date).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

