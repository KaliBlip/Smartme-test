"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  Settings,
  BarChart3,
  School,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: FileQuestion,
    children: [
      {
        title: "All Questions",
        href: "/admin/questions",
      },
      {
        title: "Add Question",
        href: "/admin/questions/new",
      },
      {
        title: "Categories",
        href: "/admin/questions/categories",
      },
    ],
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    children: [
      {
        title: "All Users",
        href: "/admin/users",
      },
      {
        title: "Add User",
        href: "/admin/users/new",
      },
      {
        title: "Roles",
        href: "/admin/users/roles",
      },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    children: [
      {
        title: "Overview",
        href: "/admin/analytics",
      },
      {
        title: "Performance",
        href: "/admin/analytics/performance",
      },
      {
        title: "Reports",
        href: "/admin/analytics/reports",
      },
    ],
  },
  {
    title: "Education Levels",
    href: "/admin/education",
    icon: School,
    children: [
      {
        title: "JHS",
        href: "/admin/education/jhs",
      },
      {
        title: "SHS",
        href: "/admin/education/shs",
      },
    ],
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-muted/30 transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 border-b flex items-center px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
            Admin Panel
          </Link>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
              const Icon = item.icon

              return (
                <div key={item.href} className="space-y-1">
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                  {item.children && isActive && (
                    <div className="ml-4 border-l pl-2 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button
                              variant={isChildActive ? "secondary" : "ghost"}
                              size="sm"
                              className="w-full justify-start"
                            >
                              {child.title}
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="font-semibold">
            {sidebarItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + "/"))?.title}
          </h1>
          <Button variant="ghost" size="sm" className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
} 