import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Users, Shield, Zap, GraduationCap, Briefcase, Activity, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAdminDashboardData } from "@/lib/admin-actions"
import Link from "next/link"

interface AdminMetricProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
  change: string;
}

export default async function AdminDashboard() {
  const data = await getAdminDashboardData()
  const { stats, logs } = data

  const systemMetrics: AdminMetricProps[] = [
    { label: "Total Identities", value: stats.users.toLocaleString(), icon: <Users />, color: "blue", change: "Synced" },
    { label: "Enrolled Students", value: stats.students.toLocaleString(), icon: <GraduationCap />, color: "emerald", change: "Active" },
    { label: "Faculty Nodes", value: stats.faculty.toLocaleString(), icon: <Briefcase />, color: "amber", change: "On-Duty" },
    { label: "DB Latency Index", value: "0.14ms", icon: <Database />, color: "purple", change: "Stable" },
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-2xl shadow-indigo-500/10">
              <Shield className="w-8 h-8 text-indigo-500" />
           </div>
           <div className="space-y-1">
              <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Master Oracle Active</Badge>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
                 System <span className="text-indigo-500">NexGen</span> Admin
              </h1>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none mt-1">
                Centralized System Orchestration & Neural Audit Panel
              </p>
           </div>
        </div>
        <div className="flex gap-3">
            <Link href="/admin/database">
               <Button className="bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all">
                  <Activity className="w-4 h-4 mr-2" /> System Health
               </Button>
            </Link>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white border-none rounded-2xl h-12 px-6 font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-rose-600/20">
               Master Override
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((stat, i) => (
          <AdminMetric key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl lg:col-span-2">
           <CardHeader className="bg-black/40 border-b border-white/5 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <Zap className="w-5 h-5 text-indigo-500" />
                   <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Data Distribution Nodes</CardTitle>
                </div>
                <Badge className="bg-emerald-600/20 text-emerald-400 border-none px-3 uppercase font-black text-[9px]">All Systems Nominal</Badge>
              </div>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {[{ node: 1, region: "ap-south-1", latency: 12 }, { node: 2, region: "ap-southeast-1", latency: 18 }, { node: 3, region: "us-east-1", latency: 15 }].map(({ node, region, latency }) => (
                    <div key={node} className="p-6 hover:bg-white/[0.02] group transition-all flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                          <div>
                             <p className="text-white font-black text-sm uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">Server Node-0{node}</p>
                             <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Region: {region} • Status: Synced</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[12px] text-white font-black italic tracking-tighter">{latency}ms</p>
                          <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest leading-none">Response Delay</p>
                       </div>
                    </div>
                  ))}
                  <Link href="/admin/database">
                     <Button variant="ghost" className="w-full h-12 text-[9px] text-indigo-400 font-black uppercase hover:bg-indigo-600/10 tracking-widest">
                         Enter Engine Forge
                     </Button>
                  </Link>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
           <CardHeader className="bg-black/40 border-b border-white/5 py-6">
              <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight flex items-center gap-3">
                 <Clock className="w-5 h-5 text-amber-400" /> Neural Logs
              </CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-6">
              {logs.length > 0 ? logs.map((log: { event: string; user?: { name: string }; userId: string; timestamp: string | number | Date }, i: number) => (
                <div key={i} className="flex gap-4 group">
                   <div className="w-1 h-10 bg-indigo-500/20 rounded-full group-hover:bg-indigo-500/50 transition-all shrink-0" />
                   <div className="overflow-hidden space-y-0.5">
                      <p className="text-[11px] font-black text-white uppercase italic tracking-tight truncate group-hover:text-indigo-400 transition-colors">{log.event}</p>
                      <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest truncate">{log.user?.name || log.userId}</p>
                      <p className="text-[8px] text-gray-800 font-bold uppercase tracking-widest">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                   </div>
                </div>
              )) : <div className="text-gray-600 text-[10px] uppercase font-bold text-center py-8 italic">Zero system activity recorded.</div>}
              <Link href="/admin/explorer">
                 <Button variant="ghost" className="w-full h-10 text-[9px] text-gray-500 hover:text-white font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-all rounded-xl mt-4">
                     Access Master Registry
                 </Button>
              </Link>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AdminMetric({ label, value, icon, color, change }: AdminMetricProps) {
    const colorMap = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    }
    return (
        <Card className="bg-[#0A0A0B]/80 border-white/10 group hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden relative">
            <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform ${colorMap[color].split(' ')[0]}`}>
               {icon}
            </div>
            <CardContent className="p-6 relative z-10 space-y-1">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{label}</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">{value}</p>
                <div className="pt-4 flex items-center justify-between">
                    <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full border ${colorMap[color]}`}>{change}</span>
                    <ArrowRight className="w-3 h-3 text-gray-800 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </div>
            </CardContent>
        </Card>
    )
}
