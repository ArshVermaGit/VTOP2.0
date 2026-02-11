import { getFacultyProfile, getCourses } from "@/lib/actions"
import AttendanceMarkingClient from "./AttendanceMarkingClient"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from "lucide-react"

export default async function FacultyAttendancePage() {
  const faculty = await getFacultyProfile()
  if (!faculty) return <div className="p-12 text-center text-gray-500">Not authorized.</div>

  // In a real app we'd fetch only faculty's courses. 
  // Let's assume courses has a facultyId relation we can filter on.
  const allCourses = await getCourses()
  const facultyCourses = allCourses.filter(c => c.facultyId === faculty.id)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <ShieldCheck className="w-8 h-8 text-emerald-400" /> Mark Class Attendance
          </h1>
          <p className="text-gray-400 mt-1">Official attendance logging for Fall Semester 2024-25</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Assigned Courses</p>
                <p className="text-xl font-bold text-emerald-400">{facultyCourses.length}</p>
             </div>
             <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-4 py-1">FACULTY PORTAL</Badge>
        </div>
      </div>

      <AttendanceMarkingClient courses={facultyCourses} />
    </div>
  )
}
