import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/register", "/", "/api/auth"]
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // If user is not signed in and trying to access a protected route
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If user is signed in and trying to access auth pages
  if (session && ["/login", "/register"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check if user is an admin
    const { data: user } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("user_id", session.user.id)
      .single()

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 