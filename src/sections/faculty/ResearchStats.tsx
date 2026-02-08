"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"
import Link from "next/link"
import { SmoothView } from "@/components/animations/SmoothView"

interface ResearchStatProps {
  label: string;
  value: string | number;
  color: 'indigo' | 'emerald' | 'purple' | 'amber';
}

function ResearchStat({ label, value, color }: ResearchStatProps) {
  const colorMap = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${colorMap[color]}`} />
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-tight">{label}</p>
      </div>
      <p className="font-black text-white italic tracking-tighter">{value}</p>
    </div>
  )
}

import { FacultyWithDetails } from "@/types"

export function ResearchStats({ faculty, delay = 0 }: { faculty: FacultyWithDetails, delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden min-h-[350px]">
      <CardHeader className="bg-black/40 border-b border-white/5">
        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Research & Publications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <ResearchStat 
            label="Journals Published" 
            value={faculty.supervisedScholars.reduce((sum, s) => sum + (s.publicationsCount || 0), 0)} 
            color="indigo" 
          />
          <ResearchStat 
            label="Scholars Supervised" 
            value={faculty.supervisedScholars.length} 
            color="emerald" 
          />
          <ResearchStat 
            label="Total Citations" 
            value={faculty.supervisedScholars.reduce((sum, s) => sum + (s.citations || 0), 0)} 
            color="purple" 
          />
          <ResearchStat label="Ongoing Projects" value="02" color="amber" />
          <Link href="/faculty/research">
            <Button className="w-full mt-2 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white font-black uppercase text-[9px] tracking-widest h-10 transition-all rounded-xl">
              Update Research Portfolio
            </Button>
          </Link>
        </div>
      </CardContent>
      </Card>
    </SmoothView>
  )
}
