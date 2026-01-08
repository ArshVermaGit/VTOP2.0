import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  Bell, 
  BookOpen, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  Zap,
  History,
  TrendingUp,
  MapPin
} from "lucide-react"
import { getStudentProfile, getAttendance, getTimetable, getCommunications } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StudentMetricProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export default async function DashboardPage() {
  const profile = await getStudentProfile()
  const attendance = await getAttendance()
  const timetable = await getTimetable()
  const { communications } = await getCommunications()

  const avgAttendance = attendance.length > 0 
    ? (attendance.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / attendance.length).toFixed(1) + "%"
    : "0.0%"

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const todayClasses = timetable.filter(t => t.day === today).sort((a,b) => a.startTime.localeCompare(b.startTime))

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Digital ID Verified</Badge>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
              Student <span className="text-indigo-500">NexGen</span> Portal
           </h1>
           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">
             Welcome back, {profile?.user?.name} | {profile?.program}
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none">Registration No</p>
              <p className="text-[11px] text-white font-black uppercase tracking-tight">{profile?.regNo}</p>
           </div>
           <Link href="/student/timetable">
               <Button className="bg-[#0A0A0B] hover:bg-white text-white hover:text-black border border-white/10 rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl">
                  <Zap className="w-4 h-4 mr-2" /> Daily Schedule
               </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StudentMetric 
            label="Avg. Attendance" 
            value={avgAttendance} 
            subtitle="Academic Record" 
            icon={<CheckCircle className="w-5 h-5" />}
            color="emerald"
         />
         <StudentMetric 
            label="Current GPA" 
            value={(profile?.cgpa || 0).toFixed(2)} 
            subtitle="Cumulative Index" 
            icon={<GraduationCap className="w-5 h-5" />}
            color="indigo"
         />
         <StudentMetric 
            label="Active Courses" 
            value={attendance.length} 
            subtitle="Winter 2024-25" 
            icon={<BookOpen className="w-5 h-5" />}
            color="amber"
         />
         <StudentMetric 
            label="NexGen Status" 
            value="ACTIVE" 
            subtitle="System Node 01" 
            icon={ <Zap className="w-5 h-5" />}
            color="rose"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardHeader className="bg-black/40 border-b border-white/5 py-6 font-black italic uppercase tracking-tight">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-indigo-500" />
                            <CardTitle className="text-white text-lg">Instruction Pipeline</CardTitle>
                        </div>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' })}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {todayClasses.length > 0 ? todayClasses.map((cls, i) => (
                           <div key={i} className="p-6 hover:bg-white/[0.02] transition-all group flex items-center justify-between">
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                                        <p className="text-[10px] text-gray-500 font-black uppercase leading-none">{cls.startTime.split(':')[0]}</p>
                                        <p className="text-xl font-black text-white italic tracking-tighter">{cls.startTime.split(':')[1]}</p>
                                        <div className="w-full bg-indigo-600/50 h-0.5 mt-1" />
                                    </div>
                                     <div className="space-y-1">
                                        <h4 className="text-white font-black text-md uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">{cls.course.title}</h4>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none">{cls.course.code} • Slot: {cls.slot} • {cls.venue}</p>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Badge className="bg-white/5 text-gray-500 border-none text-[7px] font-black uppercase">Theory</Badge>
                                            <Badge className="bg-indigo-500/10 text-indigo-400 border-none text-[7px] font-black uppercase">A-Slot High Priority</Badge>
                                        </div>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-800 group-hover:text-white transition-colors" />
                           </div>
                        )) : (
                           <div className="p-20 text-center space-y-3 opacity-20">
                               <Clock className="w-12 h-12 mx-auto text-white" />
                               <p className="text-[10px] text-white uppercase font-black tracking-widest italic leading-none">No classes scheduled for today.</p>
                           </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl min-h-[300px]">
                     <CardHeader className="bg-black/40 border-b border-white/5">
                        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-400" /> Academic Health
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-6">
                         <div className="space-y-8 py-4 opacity-30 text-center">
                             <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-full mx-auto flex items-center justify-center">
                                <GraduationCap className="w-10 h-10" />
                             </div>
                             <p className="text-[10px] text-white uppercase font-black tracking-widest leading-none">Detailed Analytics Coming Soon</p>
                         </div>
                     </CardContent>
                 </Card>

                  <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl min-h-[300px]">
                     <CardHeader className="bg-black/40 border-b border-white/5">
                        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-indigo-400" /> Campus Pulse
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                         <div className="p-6 text-center space-y-4 opacity-20">
                            <MapPin className="w-12 h-12 mx-auto text-white" />
                            <p className="text-[10px] text-white uppercase font-black tracking-widest leading-none italic">Tracking real-time events...</p>
                         </div>
                     </CardContent>
                  </Card>
            </div>
         </div>

         <div className="space-y-8">
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl p-6">
                <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 mb-4 italic flex items-center justify-between">
                   System Alerts <Bell className="w-3 h-3 text-amber-500 animate-pulse" />
                </h4>
                <div className="space-y-5">
                    {communications.length > 0 ? communications.slice(0, 4).map((comm, i) => (
                       <div key={i} className="space-y-1.5 group cursor-pointer">
                           <div className="flex items-center justify-between">
                               <p className="text-[10px] text-indigo-400 font-black uppercase italic tracking-tight group-hover:text-white transition-colors">{comm.type}</p>
                               <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest">{new Date(comm.date).toLocaleDateString()}</p>
                           </div>
                           <h5 className="text-white font-bold text-xs uppercase italic tracking-tight leading-tight line-clamp-1 group-hover:text-indigo-400 transition-colors">{comm.title}</h5>
                           <p className="text-[10px] text-gray-600 font-black leading-tight line-clamp-2">{comm.content}</p>
                       </div>
                    )) : <p className="text-gray-600 text-[10px] uppercase font-bold text-center py-6 italic leading-none">Zero system notifications.</p>}
                </div>
                <Link href="/student/messages">
                   <Button variant="ghost" className="w-full mt-6 h-10 text-[9px] text-gray-500 hover:text-white font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all rounded-xl">
                       Access Message Vault
                   </Button>
                </Link>
            </Card>

            <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 text-center space-y-2">
                 <History className="w-10 h-10 mx-auto text-indigo-500/30" />
                 <p className="text-[10px] text-gray-600 uppercase font-black leading-none italic">NexGen Synchronous Audit</p>
                 <p className="text-[11px] text-indigo-400 font-black italic">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
             </div>
         </div>
      </div>
    </div>
  )
}

function StudentMetric({ label, value, subtitle, icon, color }: StudentMetricProps) {
  const colorMap = {
     indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
     emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
     amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
     rose: "text-rose-400 border-rose-500/20 bg-rose-500/5",
  }
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 group hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden relative">
      <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform ${colorMap[color].split(' ')[0]}`}>
        {icon}
      </div>
      <CardContent className="p-6 relative z-10 space-y-1">
        <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{label}</p>
        <p className="text-3xl font-black text-white italic tracking-tighter">{value}</p>
        <p className="text-[9px] text-gray-500 font-bold uppercase">{subtitle}</p>
        <div className="pt-4">
           <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full border ${colorMap[color]}`}>SYNCED</span>
        </div>
      </CardContent>
    </Card>
  )
}
