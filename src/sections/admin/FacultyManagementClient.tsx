"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Search, MoreVertical, Edit3, Trash2, UserPlus, BookOpen, Clock, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SmoothView } from "@/components/animations/SmoothView"

type Faculty = {
  id: string
  empId: string
  designation: string
  school: string
  cabin: string
  user: {
    name: string
    email: string
    username: string
  }
  _count: {
    courses: number
    attendanceLogs: number
  }
}

export function FacultyManagementClient({ initialFaculty }: { initialFaculty: Faculty[] }) {
  const [search, setSearch] = useState("")

  const filteredFaculty = initialFaculty.filter((f: Faculty) => 
    f.empId.toLowerCase().includes(search.toLowerCase()) ||
    f.user.name.toLowerCase().includes(search.toLowerCase()) ||
    f.user.username.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <SmoothView className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <User className="w-8 h-8 text-emerald-500" /> Faculty Matrix
          </h1>
          <p className="text-gray-400 mt-1">Teaching staff administration and workload balancing</p>
        </div>
        <div className="flex items-center gap-3">
             <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-600/20">
                <UserPlus className="w-4 h-4 mr-2" /> Appoint Faculty
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Faculty" value={initialFaculty.length} icon={User} color="text-emerald-500" />
          <StatCard title="Avg Load" value="4.2 Courses" icon={BookOpen} color="text-blue-500" />
          <StatCard title="Logs Submitted" value="1,204" icon={Clock} color="text-purple-500" />
          <StatCard title="On Leave" value="2" icon={Clock} color="text-rose-500" />
      </div>

      <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
         <CardHeader className="bg-black/40 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
               <CardTitle className="text-white text-lg">Staff Directory</CardTitle>
               <CardDescription>Monitor teaching schedules, cabin availability, and school affiliations</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="ID, Name, or Cabin..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 bg-black/20 border-white/5 text-white" 
                />
            </div>
         </CardHeader>
         <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
               <thead className="bg-black/20">
                  <tr>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Faculty Member</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Affiliation</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Workload</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Duty Status</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredFaculty.map((faculty: Faculty) => (
                    <tr key={faculty.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-400 font-bold border border-white/10">
                                    {faculty.user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{faculty.user.name}</p>
                                    <p className="text-[10px] text-emerald-500 uppercase font-black">{faculty.empId}</p>
                                </div>
                            </div>
                       </td>
                       <td className="p-4">
                            <p className="text-white text-xs font-semibold">{faculty.school}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">{faculty.designation} • Cabin {faculty.cabin}</p>
                       </td>
                       <td className="p-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-gray-500 text-[9px] uppercase font-black">Active Courses</p>
                                    <p className="text-blue-400 text-xs font-bold">{faculty._count.courses}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[9px] uppercase font-black">Attendace Cycles</p>
                                    <p className="text-purple-400 text-xs font-bold">{faculty._count.attendanceLogs}</p>
                                </div>
                            </div>
                       </td>
                       <td className="p-4">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 uppercase text-[9px] font-black">On Duty</Badge>
                       </td>
                       <td className="p-4 text-right whitespace-nowrap">
                           <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                                        <MoreVertical className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#0a0a0a] border-white/10 text-white w-48">
                                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                                        <Edit3 className="w-4 h-4 mr-2" /> Adjust Workload
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                                        <Clock className="w-4 h-4 mr-2" /> View Schedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-rose-500 hover:bg-rose-500/10 cursor-pointer">
                                        <Trash2 className="w-4 h-4 mr-2" /> Revoke Access
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                           </DropdownMenu>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </CardContent>
      </Card>
    </SmoothView>
  )
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: LucideIcon, color: string }) {
    return (
        <Card className="bg-white/5 border-white/10 p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">{title}</p>
                    <p className={`text-2xl font-black ${color} mt-1`}>{value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-white/5 ${color.replace('text', 'bg')}/10`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
            </div>
        </Card>
    )
}
