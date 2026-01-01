import { getCourseDetails } from "@/lib/actions"
import CourseContentClient from "./CourseContentClient"
import { notFound } from "next/navigation"

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourseDetails(params.id)
  if (!course) notFound()

  return (
    <div className="space-y-6">
       <CourseContentClient course={course} />
    </div>
  )
}
