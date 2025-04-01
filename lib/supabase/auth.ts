import { createServerSupabaseClient } from "./server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getSession() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }
  return session
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const supabase = createServerSupabaseClient()
  const { data: user } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("user_id", session.user.id)
    .single()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return session
}

export async function signOut() {
  const supabase = createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect("/login")
} 