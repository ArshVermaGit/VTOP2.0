import { getCourseDetails } from "@/lib/actions"
import CourseContentClient from "./CourseContentClient"
import { notFound } from "next/navigation"

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = await getCourseDetails(id)
  if (!course) notFound()

  return (
    <div className="space-y-6">
       <CourseContentClient course={course} />
    </div>
  )
}
