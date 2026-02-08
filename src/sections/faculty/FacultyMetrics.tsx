"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, AlertTriangle, BookOpen, TrendingUp } from "lucide-react"
import { SmoothView } from "@/components/animations/SmoothView"

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  status: string;
  color: 'indigo' | 'rose' | 'emerald' | 'purple';
}

function MetricCard({ label, value, subtitle, icon, status, color }: MetricCardProps) {
  const colorMap = {
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    rose: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  }
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 group hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden relative">
      <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform ${colorMap[color].split(' ')[0]}`}>
        {icon}
      </div>
      <CardContent className="p-6 relative z-10 space-y-1">
        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none mb-1">{label}</p>
        <p className="text-3xl font-black text-white italic tracking-tighter">{value}</p>
        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{subtitle}</p>
        <div className="pt-4">
           <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full border ${colorMap[color]}`}>{status}</span>
        </div>
      </CardContent>
    </Card>
  )
}

import { FacultyWithDetails } from "@/types"

export function FacultyMetrics({ faculty, delay = 0 }: { faculty: FacultyWithDetails, delay?: number }) {
  const totalProctees = faculty.proctees.length
  const criticalProctees = faculty.proctees.filter((p) =>
    (p.attendance?.[0]?.percentage || 100) < 75 || (p.cgpa || 0) < 7.5
  ).length

  return (
    <SmoothView delay={delay} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <MetricCard 
          label="Proctees Assigned" 
          value={totalProctees} 
          subtitle="Under Mentorship" 
          icon={<Users className="w-5 h-5" />}
          status="ACTIVE"
          color="indigo"
       />
       <MetricCard 
          label="Critical Alerts" 
          value={criticalProctees} 
          subtitle="Low Attendance/GPA" 
          icon={<AlertTriangle className="w-5 h-5" />}
          status="REQUIRES ACTION"
          color="rose"
       />
       <MetricCard 
          label="Courses Taught" 
          value={faculty.courses.length} 
          subtitle="Current Semester" 
          icon={<BookOpen className="w-5 h-5" />}
          status="SEAMLESS"
          color="emerald"
       />
       <MetricCard 
          label="Research Index" 
          value={faculty.supervisedScholars.length > 0 ? (faculty.supervisedScholars.reduce((sum: number, s) => sum + (s.hIndex || 0), 0) / faculty.supervisedScholars.length).toFixed(1) : "1.0"} 
          subtitle="Avg. H-Index of Scholars" 
          icon={<TrendingUp className="w-5 h-5" />}
          status="EXCELLENT"
          color="purple"
       />
    </SmoothView>
  )
}
