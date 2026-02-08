import { Badge } from "@/components/ui/badge"
import { getFacultyDashboardData } from "@/lib/actions"
import { CourseDetails } from "@/sections/faculty/CourseDetails"
import { FacultyWithDetails, CourseWithDetails} from "@/types"

export default async function FacultyCourseDetailPage({ params }: { params: { id: string } }) {
  const faculty = await getFacultyDashboardData() as FacultyWithDetails | null

  if (!faculty) return <div className="p-10 text-white font-black uppercase text-xs">Unauthorized or Faculty Profile not found.</div>

  const course = faculty.courses.find(c => c.id === params.id) as CourseWithDetails | undefined

  if (!course) return <div className="p-10 text-white font-black uppercase text-xs">Instruction Module Not Found.</div>

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
           <div className="flex items-center gap-2 mb-2">
             <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] tracking-widest">{course.code}</Badge>
             <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 uppercase font-black text-[9px] tracking-widest">Ongoing</Badge>
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
              Module <span className="text-indigo-500">Intelligence</span>
           </h1>
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">{course.title}</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[10px] text-gray-600 uppercase font-black">Cohort Capacity</p>
                <p className="text-xl font-black text-white italic">{course.registrations.length}</p>
             </div>
        </div>
      </div>

      <CourseDetails course={course} />
    </div>
  )
}
