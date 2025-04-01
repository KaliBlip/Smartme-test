import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "No user data returned" }, { status: 400 })
    }

    // Create user profile
    const { error: profileError } = await supabase.from("user_profiles").insert({
      user_id: authData.user.id,
      name,
      email,
      role: "student",
      status: "pending",
      level: "n/a",
    })

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // Create user settings
    const { error: settingsError } = await supabase.from("user_settings").insert({
      user_id: authData.user.id,
      email_notifications: true,
      push_notifications: true,
      weekly_report: true,
      theme: "system",
    })

    if (settingsError) {
      return NextResponse.json({ error: settingsError.message }, { status: 400 })
    }

    // Create user stats
    const { error: statsError } = await supabase.from("user_stats").insert({
      user_id: authData.user.id,
      quizzes_taken: 0,
      total_score: 0,
      average_score: 0,
      last_quiz_date: new Date().toISOString(),
    })

    if (statsError) {
      return NextResponse.json({ error: statsError.message }, { status: 400 })
    }

    return NextResponse.json({ user: authData.user })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 