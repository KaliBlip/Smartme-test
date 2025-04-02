import { notFound } from "next/navigation"

// This function is required for static export
export function generateStaticParams() {
  // Return an empty array for static export
  // In a real app, you would fetch all category IDs and return them
  return []
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  // For static export, we'll just show a not found page
  return notFound()
} 