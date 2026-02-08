import { getAllAttendance } from "@/lib/admin-actions"
import { AttendanceManagementClient } from "@/sections/admin/AttendanceManagementClient"

export default async function AdminAttendancePage() {
  const logs = await getAllAttendance()

  return <AttendanceManagementClient initialLogs={logs as unknown as Parameters<typeof AttendanceManagementClient>[0]['initialLogs']} />
}
