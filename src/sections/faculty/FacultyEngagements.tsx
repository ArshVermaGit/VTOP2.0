"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FacultyTimeTableWithCourse } from "@/types"
import { SmoothView } from "@/components/animations/SmoothView"

export function FacultyEngagements({ todayClasses, delay = 0 }: { todayClasses: FacultyTimeTableWithCourse[], delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
      <CardHeader className="bg-black/40 border-b border-white/5 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Daily Instruction Pipeline</CardTitle>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' })}
          </p>
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
                  <h4 className="text-white font-black text-md uppercase italic tracking-tight group-hover:text-indigo-400 transition-colors">
                    {cls.course.title}
                  </h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none">Slot: {cls.slot} • Venue: {cls.venue}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[7px] font-black uppercase">Theory</Badge>
                    <Badge className="bg-white/5 text-gray-600 border-none text-[7px] font-black uppercase">{cls.course.registrations.length} Enrolled</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/faculty/attendance?courseId=${cls.courseId}`}>
                  <Button className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[9px] tracking-widest rounded-lg transition-all shadow-lg shadow-indigo-600/20">
                    Mark Attendance
                  </Button>
                </Link>
                <Link href={`/faculty/courses/${cls.courseId}`}>
                  <Button variant="ghost" className="w-9 h-9 p-0 rounded-lg text-gray-700 hover:text-white hover:bg-white/5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center space-y-3 opacity-20">
              <Clock className="w-12 h-12 mx-auto text-white" />
              <p className="text-[10px] text-white uppercase font-black tracking-widest italic">No classes scheduled for today.</p>
            </div>
          )}
        </div>
      </CardContent>
      </Card>
    </SmoothView>
  )
}
