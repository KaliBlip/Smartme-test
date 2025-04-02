import EditSubjectForm from "./edit-subject-form"

// This function is required for static export
export async function generateStaticParams() {
  // For static export, we'll return an empty array
  // In a real app, you would fetch all subject IDs and return them
  return []
}

export default function EditSubjectPage({ params }: { params: { id: string } }) {
  return <EditSubjectForm subjectId={params.id} />
} 