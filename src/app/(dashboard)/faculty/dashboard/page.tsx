import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare,
  ShieldCheck
} from "lucide-react"
import { getFacultyDashboardData, getAcademicEvents } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FacultyMetrics } from "@/sections/faculty/FacultyMetrics"
import { FacultyEngagements } from "@/sections/faculty/FacultyEngagements"
import { ProctorAudit } from "@/sections/faculty/ProctorAudit"
import { ResearchStats } from "@/sections/faculty/ResearchStats"
import { ExecutiveActions } from "@/sections/faculty/ExecutiveActions"
import { InstitutionalPulse } from "@/sections/faculty/InstitutionalPulse"
import { FacultyWithDetails, FacultyTimeTableWithCourse } from "@/types"
import { SmoothView } from "@/components/animations/SmoothView"

export default async function FacultyDashboard() {
  const faculty = await getFacultyDashboardData() as FacultyWithDetails | null
  const events = await getAcademicEvents()

  if (!faculty) return <div className="p-10 text-white font-black uppercase text-xs">Unauthorized or Faculty Profile not found.</div>

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  
  const todayClasses = (faculty.courses as any[]).flatMap((c) =>
    (c.timeTable as any[])
      .filter((t) => t.day === today)
      .map((t) => ({ ...t, course: c }))
  ).sort((a: FacultyTimeTableWithCourse, b: FacultyTimeTableWithCourse) => a.startTime.localeCompare(b.startTime)) as FacultyTimeTableWithCourse[]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Faculty Session Active</Badge>
           <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-4">
              Faculty <span className="text-indigo-600">Workspace</span> Hub
           </h1>
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">
             {faculty.designation} • {faculty.school} • Cabin: {faculty.cabin}
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none">Employee ID</p>
              <p className="text-[11px] text-slate-900 font-black uppercase tracking-tight">{faculty.empId}</p>
           </div>
           <Link href="/faculty/messages">
               <Button className="bg-[#0A0A0B] hover:bg-white text-white hover:text-black border border-white/10 rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl">
                  <MessageSquare className="w-4 h-4 mr-2" /> Send Announcement
               </Button>
           </Link>
        </div>
      </div>

      {/* KPIS / ANALYTICS */}
      <FacultyMetrics faculty={faculty} delay={0.1} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* TODAY'S ENGAGEMENTS */}
          <div className="lg:col-span-2 space-y-8">
             <FacultyEngagements todayClasses={todayClasses} delay={0.2} />
 
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <ProctorAudit proctees={faculty.proctees} delay={0.3} />
                 <ResearchStats faculty={faculty} delay={0.3} />
             </div>
          </div>

         {/* FACULTY SIDEBAR - ADMIN & QUICK ACTIONS */}
         <div className="space-y-8">
             <ExecutiveActions />
             <InstitutionalPulse events={events} />
             
             <SmoothView delay={0.5}>
              <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 text-center space-y-2">
                  <ShieldCheck className="w-10 h-10 mx-auto text-indigo-500/40" />
                  <p className="text-[10px] text-gray-600 uppercase font-black leading-tight">Last Security Audit</p>
                  <p className="text-[11px] text-indigo-400 font-black italic">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
             </SmoothView>
         </div>
      </div>
    </div>
  )
}
