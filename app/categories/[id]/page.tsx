'import { notFound } from "next/navigation"\n\nexport function generateStaticParams() {\n  return []\n}\n\nexport default function CategoryPage({ params }: { params: { id: string } }) {\n  return notFound()\n}' 
