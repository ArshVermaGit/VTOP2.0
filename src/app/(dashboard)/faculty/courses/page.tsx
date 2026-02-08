import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { getFacultyDashboardData } from "@/lib/actions"
import { CourseManager } from "@/sections/faculty/CourseManager"
import { FacultyWithDetails } from "@/types"

export default async function FacultyCoursesPage() {
  const faculty = await getFacultyDashboardData() as FacultyWithDetails | null

  if (!faculty) return <div className="p-10 text-white font-black uppercase text-xs">Unauthorized or Faculty Profile not found.</div>

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-end justify-between">
        <div>
           <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Instruction Modules</Badge>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
              My <span className="text-indigo-500">Registry</span>
           </h1>
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Direct oversight of your assigned academic portfolio</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[10px] text-gray-600 uppercase font-black">Active Cohorts</p>
                <p className="text-xl font-black text-white italic">{faculty.courses.length}</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-500">
                <BookOpen className="w-6 h-6" />
             </div>
        </div>
      </div>

      <CourseManager courses={faculty.courses} />
    </div>
  )
}
