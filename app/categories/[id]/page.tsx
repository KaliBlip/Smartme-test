import { notFound } from "next/navigation"

// This function is required for static export
export async function generateStaticParams() {
  // For static export, we'll return an empty array
  // In a real app, you would fetch all category IDs and return them
  return []
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  // For now, we'll return a 404 page
  // In a real app, you would fetch the category data and render it
  return notFound()
} 