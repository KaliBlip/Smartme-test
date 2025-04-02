import { notFound } from "next/navigation"

export function generateStaticParams() {
  return []
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  return notFound()
} 
