import { Badge } from "@/components/ui/badge"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { StudentProfileWithUser } from "@/types/student"

interface DashboardHeaderProps {
  profile: StudentProfileWithUser | null
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1">
        <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Digital ID Verified</Badge>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic flex items-center gap-4">
          Student <span className="text-blue-600">NexGen</span> Portal
        </h1>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">
          Welcome back, {profile?.user?.name} | {profile?.program}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Registration No</p>
          <p className="text-[11px] text-slate-900 font-black uppercase tracking-tight">{profile?.regNo}</p>
        </div>
        <Link href="/student/timetable">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-blue-500/20">
            <Zap className="w-4 h-4 mr-2" /> Daily Schedule
          </Button>
        </Link>
      </div>
    </div>
  )
}

