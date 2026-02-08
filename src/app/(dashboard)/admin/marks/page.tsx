import { getAllMarks } from "@/lib/admin-actions"
import { MarksManagementClient } from "@/sections/admin/MarksManagementClient"

export default async function AdminMarksPage() {
  const marks = await getAllMarks()
  
  // Need to cast the type because Prisma returns decimal or other types that might not match exactly or need transformation
  // But for now let's assume the component type matches what we fetch
  return <MarksManagementClient initialMarks={marks as unknown as Parameters<typeof MarksManagementClient>[0]['initialMarks']} />
}
