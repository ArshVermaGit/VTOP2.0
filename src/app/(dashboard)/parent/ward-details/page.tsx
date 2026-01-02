import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  Activity, 
  ListTodo,
  TrendingDown,
  ChevronRight,
  User,
  School,
  CalendarDays,
  Award
} from "lucide-react"
import { getParentDashboardData } from "@/lib/actions"
import { Progress } from "@/components/ui/progress"

export default async function WardDetails() {
  const data = await getParentDashboardData()
  if (!data) return <div className="p-10 text-white">Unauthorized.</div>

  const { profile } = data
  const student = profile.student

  if (!student) return <div className="p-10 text-white font-black uppercase text-xs tracking-widest text-center border border-dashed border-white/10 rounded-3xl">Ward profile data extraction failed.</div>

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Comprehensive Ward Audit</h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Deep-dive into academic, financial and behavioral metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* LEFT COL: IDENTITY & QUICK STATS */}
         <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white text-3xl font-black italic shadow-2xl shadow-indigo-600/20">
                        {student.user.name[0]}
                    </div>
                    <div>
                        <h2 className="text-white font-black text-lg uppercase italic leading-tight">{student.user.name}</h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{student.regNo}</p>
                    </div>
                </div>
                <div className="pt-4 border-t border-white/5 space-y-3">
                    <IdentityDetail icon={<User className="w-3 h-3" />} label="Program" value={student.program} />
                    <IdentityDetail icon={<School className="w-3 h-3" />} label="School" value={student.school} />
                    <IdentityDetail icon={<CalendarDays className="w-3 h-3" />} label="Batch" value={student.batch} />
                </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 space-y-6 text-center">
                 <div className="space-y-1">
                     <p className="text-[10px] text-gray-600 uppercase font-black">Current CGPA</p>
                     <p className="text-4xl font-black text-white italic tracking-tighter">{student.cgpa.toFixed(2)}</p>
                 </div>
                 <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 uppercase font-black text-[9px] w-full justify-center">Rank: Upper Decile</Badge>
            </Card>
         </div>

         {/* MAIN CONTENT: ACADEMICS & ATTENDANCE */}
         <div className="lg:col-span-3 space-y-8">
            {/* ATTENDANCE TRACKER */}
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl">
                <CardHeader className="bg-black/40 border-b border-white/5 py-6">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Real-time Attendance Velocity</CardTitle>
                         </div>
                         <p className="text-[10px] text-gray-600 uppercase font-black">Updated 10m ago</p>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {student.attendance.map((att: any) => (
                           <div key={att.id} className="space-y-3">
                               <div className="flex items-center justify-between">
                                   <div>
                                       <h4 className="text-white font-black text-xs uppercase italic truncate max-w-[200px]">{att.course.title}</h4>
                                       <p className="text-[9px] text-gray-500 font-bold uppercase">{att.course.code} • Slot: {att.course.slot}</p>
                                   </div>
                                   <div className="text-right">
                                       <p className={`text-sm font-black italic ${att.percentage < 75 ? 'text-rose-500' : 'text-emerald-400'}`}>{att.percentage}%</p>
                                       <p className="text-[8px] text-gray-700 font-black uppercase">Min Required: 75%</p>
                                   </div>
                               </div>
                               <Progress value={att.percentage} className={`h-1.5 bg-white/5 ${att.percentage < 75 ? '[&>div]:bg-rose-500' : '[&>div]:bg-emerald-500'}`} />
                               <div className="flex items-center justify-between">
                                   <p className="text-[8px] text-gray-600 font-black uppercase">{att.attendedClasses} of {att.totalClasses} Classes</p>
                                   {att.percentage < 75 && (
                                       <div className="flex items-center gap-1.5 text-rose-500/50">
                                            <AlertTriangle className="w-2.5 h-2.5" />
                                            <p className="text-[7px] font-black uppercase">Critical Level</p>
                                       </div>
                                   )}
                               </div>
                           </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* MARKS & EXAMS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden">
                    <CardHeader className="bg-black/40 border-b border-white/5">
                        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
                             <Award className="w-5 h-5 text-amber-400" /> Recent Assessment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-white/5">
                            {student.marks.slice(0, 3).map((mark: any) => (
                                <div key={mark.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-default">
                                    <div className="space-y-0.5">
                                        <p className="text-white font-bold text-[11px] uppercase truncate max-w-[140px]">{mark.course.title}</p>
                                        <p className="text-[8px] text-gray-600 font-black uppercase">CAT-1 Assessment</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-right">
                                        <div>
                                            <p className="text-xs font-black text-white italic">{(mark.cat1 || 0).toFixed(1)}/50</p>
                                            <p className="text-[8px] text-gray-700 font-black uppercase">Weighted</p>
                                        </div>
                                        <ChevronRight className="w-3 h-3 text-gray-800 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden">
                    <CardHeader className="bg-black/40 border-b border-white/5">
                        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
                             <ListTodo className="w-5 h-5 text-indigo-400" /> Pending Evaluations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
                         <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                             <Clock className="w-8 h-8 opacity-20" />
                         </div>
                         <div className="space-y-1">
                             <p className="text-white font-black text-xs uppercase italic tracking-tighter">CAT-2 Intelligence</p>
                             <p className="text-[10px] text-gray-500 font-bold uppercase">Predicted window: March 2026</p>
                         </div>
                         <Badge className="bg-white/5 text-gray-500 border-white/10 text-[7px] font-black uppercase">Data Sync Active</Badge>
                    </CardContent>
                </Card>
            </div>
         </div>
      </div>
    </div>
  )
}

function IdentityDetail({ icon, label, value }: any) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-gray-700">{icon}</div>
            <div className="space-y-0.5 overflow-hidden">
                <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">{label}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight truncate">{value}</p>
            </div>
        </div>
    )
}
