"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Award, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { CourseWithDetails } from "@/types"

export function CourseDetails({ course }: { course: CourseWithDetails }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* STUDENT REGISTRY */}
      <Card className="lg:col-span-2 bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl">
        <CardHeader className="bg-black/40 border-b border-white/5 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-500" />
              <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Active Student Registry</CardTitle>
            </div>
            <Badge className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px]">{course.registrations.length} Students</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {course.registrations.map((reg) => (
              <div key={reg.id} className="p-4 hover:bg-white/[0.02] transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xs uppercase italic">
                    {reg.student.user.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">{reg.student.user.name}</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{reg.student.regNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[8px] text-gray-600 uppercase font-black">Status</p>
                      <p className="text-[10px] text-emerald-400 font-black uppercase">Active</p>
                   </div>
                   <ArrowRight className="w-3 h-3 text-gray-800 opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RECENT PERFORMANCE & ACTIONS */}
      <div className="space-y-8">
        <Card className="bg-white/5 border-white/10 p-6 space-y-6">
           <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 italic">Performance Distribution</h4>
           <div className="space-y-4 text-center">
              <div className="space-y-1">
                 <p className="text-[10px] text-gray-600 uppercase font-black">Class Average</p>
                 <p className="text-3xl font-black text-white italic tracking-tighter">78.4%</p>
              </div>
              <p className="text-[8px] text-indigo-400 font-black uppercase tracking-widest leading-none">Healthy Intelligence Curve</p>
           </div>
        </Card>

        <Card className="bg-white/5 border-white/10 p-6 space-y-4">
          <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 italic">Quick Tools</h4>
          <Link href={`/faculty/attendance?courseId=${course.id}`} className="block">
             <Button className="w-full justify-between h-12 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/20 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl px-4">
               Audit Attendance <CheckCircle className="w-4 h-4" />
             </Button>
          </Link>
          <Link href={`/faculty/marks`} className="block">
             <Button className="w-full justify-between h-12 bg-white/5 hover:bg-white text-gray-500 hover:text-black border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl px-4">
               Upload Assessment <Award className="w-4 h-4" />
             </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
