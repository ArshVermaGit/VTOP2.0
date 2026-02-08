import { getStudentsList } from "@/lib/admin-actions"
import { StudentManagementClient } from "@/sections/admin/StudentManagementClient"

export default async function AdminStudentsPage() {
  const students = await getStudentsList()

  return <StudentManagementClient initialStudents={students as unknown as Parameters<typeof StudentManagementClient>[0]['initialStudents']} />
}
