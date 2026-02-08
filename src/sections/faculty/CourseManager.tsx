"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { FacultyWithDetails } from "@/types"

export function CourseManager({ courses }: { courses: FacultyWithDetails['courses'] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="bg-[#0A0A0B]/80 border-white/10 group hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden flex flex-col">
          <CardHeader className="bg-black/40 border-b border-white/5 py-5">
            <div className="flex items-center justify-between">
              <Badge className="bg-indigo-600/10 text-indigo-400 border-none text-[8px] font-black uppercase tracking-widest">{course.code}</Badge>
              <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" /> {course.slot || "N/A"}
              </div>
            </div>
            <CardTitle className="text-white text-md uppercase font-black italic tracking-tight mt-3 group-hover:text-indigo-400 transition-colors">
              {course.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">Registered Students</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-emerald-400" />
                    <p className="text-lg font-black text-white italic">{course.registrations.length}</p>
                  </div>
                </div>
                <div className="space-y-0.5 text-right">
                  <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">Course Credits</p>
                  <p className="text-lg font-black text-white italic">{course.credits}</p>
                </div>
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">Status</p>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest">Ongoing Phase</p>
                 </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex gap-3">
              <Link href={`/faculty/courses/${course.id}`} className="flex-1">
                <Button className="w-full h-10 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all">
                  Manage Course
                </Button>
              </Link>
              <Link href={`/faculty/attendance?courseId=${course.id}`}>
                <Button variant="ghost" className="w-10 h-10 p-0 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 border border-white/5">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
