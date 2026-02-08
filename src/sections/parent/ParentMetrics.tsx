"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, GraduationCap, CreditCard, Calendar } from "lucide-react"
import { ParentWithDetails } from "@/types"

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend: string;
  color: 'emerald' | 'indigo' | 'rose' | 'amber';
}

function StatsCard({ title, value, subtitle, icon, trend, color }: StatsCardProps) {
  const colorMap = {
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    rose: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  }
  
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 group hover:border-white/20 transition-all backdrop-blur-3xl overflow-hidden relative">
      <div className={`absolute top-0 right-0 p-6 opacity-10 group-hover:scale-125 transition-transform ${colorMap[color].split(' ')[0]}`}>
        {icon}
      </div>
      <CardContent className="p-6 relative z-10 space-y-1">
        <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{title}</p>
        <p className="text-3xl font-black text-white italic tracking-tighter">{value}</p>
        <p className="text-[9px] text-gray-500 font-bold uppercase">{subtitle}</p>
        <div className="pt-4 flex items-center justify-between">
           <p className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${colorMap[color]}`}>{trend}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function ParentMetrics({ student }: { student: NonNullable<ParentWithDetails['student']> }) {
  const avgAttendance = student.attendance.reduce((acc: number, curr) => acc + (curr.percentage || 0), 0) / (student.attendance.length || 1)
  const pendingFees = student.payments.filter((p) => p.status === 'PENDING').reduce((acc: number, curr) => acc + (curr.amount || 0), 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <StatsCard 
          title="Avg Attendance" 
          value={`${avgAttendance.toFixed(1)}%`} 
          subtitle="Current Semester" 
          icon={<CheckCircle className="w-6 h-6" />}
          trend={avgAttendance >= 75 ? "MEETS CRITERIA" : "ATTENTION REQUIRED"}
          color={avgAttendance >= 75 ? "emerald" : "rose"}
       />
       <StatsCard 
          title="Ward GPA" 
          value={(student.cgpa || 0).toFixed(2)} 
          subtitle="Cumulative Grade" 
          icon={<GraduationCap className="w-6 h-6" />}
          trend={(student.cgpa || 0) >= 8.5 ? "OUTSTANDING" : (student.cgpa || 0) >= 7.5 ? "CONSISTENT" : "IMPROVEMENT NEEDED"}
          color="indigo"
       />
       <StatsCard 
          title="Pending Dues" 
          value={`₹${(pendingFees / 1000).toFixed(1)}k`} 
          subtitle="Academic & Hostel" 
          icon={<CreditCard className="w-6 h-6" />}
          trend={pendingFees === 0 ? "ALL CLEAR" : "DUE SOON"}
          color={pendingFees === 0 ? "emerald" : "rose"}
       />
       <StatsCard 
          title="Exam Status" 
          value="ACTIVE" 
          subtitle="Current Schedule" 
          icon={<Calendar className="w-6 h-6" />}
          trend="READY FOR CAT"
          color="amber"
       />
    </div>
  )
}
