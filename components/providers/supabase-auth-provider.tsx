"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/auth-helpers-nextjs"
import type { UserProfile, UserSettings, UserStats } from "@/lib/supabase/types"

type SupabaseAuthContextType = {
  user: User | null
  profile: UserProfile | null
  settings: UserSettings | null
  stats: UserStats | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
  verifyEmail: (token: string) => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  updateSettings: (data: Partial<UserSettings>) => Promise<void>
  loading: boolean
}

const SupabaseAuthContext = createContext<SupabaseAuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const fetchUserData = async (userId: string) => {
    const [profileResult, settingsResult, statsResult] = await Promise.all([
      supabase.from("user_profiles").select("*").eq("user_id", userId).single(),
      supabase.from("user_settings").select("*").eq("user_id", userId).single(),
      supabase.from("user_stats").select("*").eq("user_id", userId).single(),
    ])

    if (profileResult.data) setProfile(profileResult.data)
    if (settingsResult.data) setSettings(settingsResult.data)
    if (statsResult.data) setStats(statsResult.data)
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await fetchUserData(user.id)
      }
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchUserData(session.user.id)
      } else {
        setProfile(null)
        setSettings(null)
        setStats(null)
      }
      setLoading(false)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })
    if (signUpError) throw signUpError

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase.from("user_profiles").insert({
        user_id: data.user.id,
        name,
        email,
        role: "student",
        status: "pending",
        level: "n/a",
      })
      if (profileError) throw profileError

      // Create user settings
      const { error: settingsError } = await supabase.from("user_settings").insert({
        user_id: data.user.id,
        email_notifications: true,
        push_notifications: true,
        weekly_report: true,
        theme: "system",
      })
      if (settingsError) throw settingsError

      // Create user stats
      const { error: statsError } = await supabase.from("user_stats").insert({
        user_id: data.user.id,
        quizzes_taken: 0,
        total_score: 0,
        average_score: 0,
        last_quiz_date: new Date().toISOString(),
      })
      if (statsError) throw statsError
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push("/login")
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  }

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) throw error
  }

  const verifyEmail = async (token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "email",
    })
    if (error) throw error
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error("No user logged in")
    const { error } = await supabase
      .from("user_profiles")
      .update(data)
      .eq("user_id", user.id)
    if (error) throw error
    await fetchUserData(user.id)
  }

  const updateSettings = async (data: Partial<UserSettings>) => {
    if (!user) throw new Error("No user logged in")
    const { error } = await supabase
      .from("user_settings")
      .update(data)
      .eq("user_id", user.id)
    if (error) throw error
    await fetchUserData(user.id)
  }

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        profile,
        settings,
        stats,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
        verifyEmail,
        updateProfile,
        updateSettings,
        loading,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  )
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext)
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider")
  }
  return context
} 