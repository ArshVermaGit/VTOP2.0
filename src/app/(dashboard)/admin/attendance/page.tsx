import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Search, Filter, Edit3, Trash2, AlertCircle } from "lucide-react"
import { getGlobalAttendanceLogs } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function AdminAttendancePage() {
  const logs = await getGlobalAttendanceLogs()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <ShieldCheck className="w-8 h-8 text-rose-500" /> Attendance Control Center
          </h1>
          <p className="text-gray-400 mt-1">Master override and administrative audit logs</p>
        </div>
        <div className="flex items-center gap-3">
             <Button variant="outline" className="border-white/10 text-gray-400">
                <Filter className="w-4 h-4 mr-2" /> Global Filter
             </Button>
             <Badge className="bg-rose-600/20 text-rose-500 border border-rose-500/20 px-4 py-1 uppercase font-black">Admin Access</Badge>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
         <CardHeader className="bg-black/40 border-b border-white/5 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-white text-lg">Master Attendance Log</CardTitle>
               <CardDescription>Filter by Registration No. or Course Code to perform overrides</CardDescription>
            </div>
            <div className="relative w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input placeholder="Enter Reg No. or Course..." className="pl-10 bg-black/20 border-white/5 text-white" />
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <table className="w-full text-left border-collapse">
               <thead className="bg-black/20">
                  <tr>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Student Info</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Course/Slot</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Current Status</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Marked By</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {logs.map((log: any) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-4">
                            <p className="text-white font-bold text-sm">{log.student.user.name}</p>
                            <p className="text-[10px] text-rose-500 font-bold uppercase">{log.student.regNo}</p>
                       </td>
                       <td className="p-4">
                            <p className="text-white text-xs font-medium">{log.course.title}</p>
                            <Badge variant="outline" className="p-0 border-none text-[10px] text-gray-500">{log.slot}</Badge>
                       </td>
                       <td className="p-4">
                            <Badge className={
                                log.status === 'PRESENT' ? 'bg-emerald-600/10 text-emerald-400' : 
                                log.status === 'ABSENT' ? 'bg-rose-600/10 text-rose-400' : 
                                'bg-blue-600/10 text-blue-400'
                            }>
                                {log.status}
                            </Badge>
                       </td>
                       <td className="p-4">
                            <p className="text-gray-400 text-[10px] font-bold">{log.faculty.user.name}</p>
                            <p className="text-[9px] text-gray-600">{new Date(log.date).toLocaleDateString()}</p>
                       </td>
                       <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-400 hover:bg-blue-600/10">
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:bg-rose-600/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                           </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </CardContent>
      </Card>
      
      <div className="p-6 rounded-2xl bg-rose-600/5 border border-rose-500/10 flex items-start gap-4">
           <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
           <div className="space-y-1">
                <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider">Administrative Policy</h4>
                <p className="text-gray-500 text-xs leading-relaxed">Overrides performed here are logged in the master audit trail. Changing an attendance record will trigger an immediate percentage recalculation for the student across all summary dashboards.</p>
           </div>
      </div>
    </div>
  )
}
