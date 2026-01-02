import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  ArrowRight,
  Info,
  CalendarDays,
  Briefcase
} from "lucide-react"
import { getFacultyAdminData } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default async function FacultyLeaves() {
  const faculty = await getFacultyAdminData()
  if (!faculty) return <div className="p-10 text-white">Unauthorized.</div>

  const leaves = faculty.leaves || []

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Faculty Residency Ledger</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Leave Balances, Permissions & Outing History</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 uppercase font-black text-[9px]">Sabbatical Track Active</Badge>
           <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest px-6 h-12 rounded-2xl shadow-xl shadow-indigo-600/20">
              <Plus className="w-4 h-4 mr-2" /> Submit Absence Request
           </Button>
        </div>
      </div>

      {/* LEAVE QUOTAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <QuotaCard label="Casual Leave" used={4} total={12} color="indigo" />
         <QuotaCard label="Medical Leave" used={2} total={15} color="emerald" />
         <QuotaCard label="Duty Leave" used={8} total={20} color="amber" />
         <QuotaCard label="Sabbatical (Yrs)" used={0} total={1} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* ACTIVE REQUESTS & HISTORY */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardHeader className="bg-black/40 border-b border-white/5 py-4">
                    <CardTitle className="text-white text-sm uppercase font-black italic tracking-widest flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" /> Active Absence Pipeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {leaves.length > 0 ? leaves.map((leave, i) => (
                           <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-all group">
                                <div className="flex gap-6 items-center">
                                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${leave.status === 'APPROVED' ? 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                                        <CalendarDays className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-white font-black text-sm uppercase italic tracking-tight">{leave.type} Absence</h4>
                                            <Badge className={`text-[7px] font-black uppercase border-none ${leave.status === 'APPROVED' ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black animate-pulse'}`}>
                                                {leave.status}
                                            </Badge>
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">
                                            {new Date(leave.fromDate).toLocaleDateString()} — {new Date(leave.toDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-[9px] text-gray-600 font-bold uppercase pt-1 italic">Reason: {leave.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   {leave.status === 'PENDING' && (
                                       <Button variant="ghost" className="h-8 text-[8px] font-black uppercase text-rose-500 hover:bg-rose-600/10">Withdraw</Button>
                                   )}
                                   <Button variant="ghost" className="w-9 h-9 p-0 rounded-lg text-gray-700 hover:text-white hover:bg-white/5 transition-all">
                                      <Info className="w-4 h-4" />
                                   </Button>
                                </div>
                           </div>
                        )) : (
                           <div className="p-20 text-center opacity-10">
                               <Calendar className="w-16 h-16 mx-auto mb-4" />
                               <p className="text-[10px] uppercase font-black tracking-widest">No absence records found</p>
                           </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            
            <div className="p-8 rounded-[2.5rem] bg-indigo-600/5 border border-indigo-500/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-white font-black text-lg uppercase italic tracking-tighter leading-none">Duty Leave Protocol</h4>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Automatic exemption for institutional work</p>
                    </div>
                </div>
                <Button variant="ghost" className="text-[10px] text-indigo-400 font-black uppercase hover:bg-indigo-600/10 px-6 h-12 rounded-xl">View Protocol <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
         </div>

         {/* SIDEBAR: POLICIES & GUIDES */}
         <div className="space-y-8">
             <Card className="bg-[#0A0A0B] border-white/10 p-6 space-y-6">
                 <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 italic">Leave Guidelines</h4>
                 <div className="space-y-4">
                     <PolicyItem label="Emergency Accrual" value="Immediate" />
                     <PolicyItem label="Prior Notice Reqd." value="48 Hours" />
                     <PolicyItem label="Approval Workflow" value="HOD → Dean" />
                     <PolicyItem label="Carry Forward Limit" value="05 Days" />
                 </div>
                 <div className="pt-4 border-t border-white/5">
                     <Button className="w-full bg-white/5 text-gray-500 border border-white/5 hover:bg-white hover:text-black font-black uppercase text-[9px] tracking-widest h-10 transition-all rounded-xl">
                        Download Policy Handbook
                     </Button>
                 </div>
             </Card>

             <Card className="bg-gradient-to-br from-indigo-900/40 to-black border-white/10 p-8 text-center space-y-4">
                 <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                     <FileText className="w-8 h-8" />
                 </div>
                 <h5 className="text-white font-black text-xs uppercase tracking-tight italic">Work-From-Home (WFH)</h5>
                 <p className="text-[9px] text-gray-600 font-bold uppercase leading-relaxed">Eligibility: Senior Professors (Step-11) & Research Leads only.</p>
                 <Button variant="outline" className="w-full border-white/5 text-gray-700 bg-white/5 font-black uppercase text-[8px] h-8 rounded-lg">Check Eligibility</Button>
             </Card>
         </div>
      </div>
    </div>
  )
}

function QuotaCard({ label, used, total, color }: any) {
    const colorMap: any = {
        indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    }
    const percent = (used / total) * 100
    return (
        <Card className="bg-[#0A0A0B]/80 border-white/10 hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden relative group">
             <CardContent className="p-6 space-y-4 relative z-10">
                 <div className="flex items-center justify-between">
                     <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{label}</p>
                     <p className="text-[9px] text-gray-700 font-black uppercase">{used}/{total}</p>
                 </div>
                 <div className="space-y-1">
                     <p className="text-3xl font-black text-white italic tracking-tighter tabular-nums">{total - used}</p>
                     <p className="text-[8px] text-gray-600 font-black uppercase">Remaining Credits</p>
                 </div>
                 <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${colorMap[color].split(' ')[0].replace('text', 'bg')} transition-all`} style={{ width: `${percent}%` }} />
                 </div>
             </CardContent>
        </Card>
    )
}

function PolicyItem({ label, value }: any) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-tight">{label}</p>
            <p className="text-[11px] text-white font-black italic uppercase tracking-tighter">{value}</p>
        </div>
    )
}
