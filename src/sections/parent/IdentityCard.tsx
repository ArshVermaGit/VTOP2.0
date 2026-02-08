"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, School, CalendarDays } from "lucide-react"
import { ParentWithDetails } from "@/types"

interface IdentityDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function IdentityDetail({ icon, label, value }: IdentityDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-700">{icon}</div>
      <div className="space-y-0.5 overflow-hidden">
        <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">{label}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase leading-tight truncate">{value}</p>
      </div>
    </div>
  )
}

export function IdentityCard({ student }: { student: NonNullable<ParentWithDetails['student']> }) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 p-6 space-y-4">
        <h4 className="text-white font-black text-[10px] uppercase tracking-widest border-b border-white/5 pb-3 mb-1 italic">Identity Matrix</h4>
        <div className="space-y-3">
          <IdentityDetail icon={<User className="w-3 h-3" />} label="Program" value={student.program} />
          <IdentityDetail icon={<School className="w-3 h-3" />} label="School" value={student.school} />
          <IdentityDetail icon={<CalendarDays className="w-3 h-3" />} label="Batch" value={student.batch} />
        </div>
      </Card>

      <Card className="bg-white/5 border-white/10 p-6 space-y-6 text-center">
        <div className="space-y-1">
          <p className="text-[10px] text-gray-600 uppercase font-black">Performance Tier</p>
          <p className="text-4xl font-black text-white italic tracking-tighter">ELITE</p>
        </div>
        <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 uppercase font-black text-[9px] w-full justify-center tracking-widest">Rank: Upper Decile</Badge>
      </Card>
    </div>
  )
}
