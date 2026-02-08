import { getFacultyList } from "@/lib/admin-actions"
import { FacultyManagementClient } from "@/sections/admin/FacultyManagementClient"

export default async function AdminFacultyPage() {
  const faculty = await getFacultyList()

  return <FacultyManagementClient initialFaculty={faculty as unknown as Parameters<typeof FacultyManagementClient>[0]['initialFaculty']} />
}
