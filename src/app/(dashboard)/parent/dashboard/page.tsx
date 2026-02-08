import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import { getParentDashboardData } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { ParentMetrics } from "@/sections/parent/ParentMetrics"
import { ParentAnnouncements } from "@/sections/parent/ParentAnnouncements"
import { AcademicTrajectory } from "@/sections/parent/AcademicTrajectory"
import { ParentCompliance } from "@/sections/parent/ParentCompliance"
import { WardOverview } from "@/sections/parent/WardOverview"
import { ParentQuickActions } from "@/sections/parent/ParentQuickActions"
import { ParentDashboardData } from "@/types"

export default async function ParentDashboard() {
  const data = await getParentDashboardData() as ParentDashboardData | null
  if (!data) return <div className="p-10 text-white font-black uppercase text-xs" > Unauthorized or Profile not linked. </div>

  const { profile, announcements } = data
  const student = profile.student

  if (!student) return <div className="p-10 text-white font-black uppercase text-xs" > Ward profile not linked. </div>

  return (
    <div className="space-y-8 pb-10" >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" >
        <div className="space-y-1" >
          <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest" > Parent Portal Active </Badge>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-4" >
            Parent <span className="text-indigo-600">Portal</span> Center
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-tight" > Currently Viewing: {student.user.name} ({student.regNo}) </p>
        </div>
        <div className="flex items-center gap-4" >
          <div className="text-right hidden sm:block" >
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none" > Last Synced </p>
            <p className="text-[11px] text-gray-400 font-bold uppercase" > {new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })} </p>
          </div>
          <Button className="bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all" >
            <MessageSquare className="w-4 h-4 mr-2" /> Message Proctor
          </Button>
        </div>
      </div>

      <ParentMetrics student={student} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" >
        <div className="lg:col-span-2 space-y-8" >
          <ParentAnnouncements announcements={announcements} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
            <AcademicTrajectory />
            <ParentCompliance />
          </div>
        </div>

        <div className="space-y-8" >
          <WardOverview student={student} />
          <ParentQuickActions />
        </div>
      </div>
    </div>
  )
}
