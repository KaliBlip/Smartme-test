import EditQuestionForm from "./edit-question-form"

// This function is required for static export
export async function generateStaticParams() {
  // For static export, we'll return an empty array
  // In a real app, you would fetch all question IDs and return them
  return []
}

export default function EditQuestionPage({ params }: { params: { id: string } }) {
  return <EditQuestionForm questionId={params.id} />
} 