"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, Award, Clock, ChevronRight, ListTodo } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ParentWithDetails } from "@/types"

export function WardAnalytics({ student }: { student: NonNullable<ParentWithDetails['student']> }) {
  return (
    <div className="space-y-8">
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
            {student.attendance.map((att) => (
              <div key={att.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="overflow-hidden pr-4">
                    <h4 className="text-white font-black text-xs uppercase italic truncate">{att.course.title}</h4>
                    <p className="text-[8px] text-gray-500 font-bold uppercase">{att.course.code} • Slot: {att.course.slot}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-black italic ${att.percentage < 75 ? 'text-rose-500' : 'text-emerald-400'}`}>{att.percentage}%</p>
                    <p className="text-[8px] text-gray-700 font-black uppercase leading-none">Goal: 75%</p>
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
              {student.marks.slice(0, 4).map((mark) => (
                <div key={mark.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-default">
                  <div className="space-y-0.5">
                    <p className="text-white font-bold text-[11px] uppercase truncate max-w-[140px]">{mark.course.title}</p>
                    <p className="text-[8px] text-gray-600 font-black uppercase">Internal Assessment</p>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className="text-xs font-black text-white italic">{(mark.total || 0).toFixed(1)}/100</p>
                      <p className="text-[8px] text-gray-700 font-black uppercase">Cumulative</p>
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
              <ListTodo className="w-5 h-5 text-indigo-400" /> Intelligence Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Clock className="w-8 h-8 opacity-20" />
            </div>
            <div className="space-y-1">
              <p className="text-white font-black text-xs uppercase italic tracking-tighter">Semester Final Cycle</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Estimated window: June 2026</p>
            </div>
            <Badge className="bg-white/5 text-gray-500 border-white/10 text-[7px] font-black uppercase">Sync Engine Active</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
