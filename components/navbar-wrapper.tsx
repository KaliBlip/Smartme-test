"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function NavbarWrapper() {
  const pathname = usePathname()
  const hideAuthButtons = pathname?.startsWith("/quiz/play")

  return <Navbar hideAuthButtons={hideAuthButtons} />
} 