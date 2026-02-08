"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  FileText, 
  Users, 
  Briefcase, 
  ArrowRight, 
  Calendar,
  GraduationCap
} from "lucide-react"
import Link from "next/link"
import { SmoothView } from "@/components/animations/SmoothView"

interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  color: 'indigo' | 'amber' | 'emerald' | 'purple';
}

function ToolButton({ icon, label, color }: ToolButtonProps) {
  const colorMap = {
    indigo: "hover:bg-indigo-600/20 hover:text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40",
    amber: "hover:bg-amber-600/20 hover:text-amber-400 border-amber-500/20 hover:border-amber-500/40",
    emerald: "hover:bg-emerald-600/20 hover:text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40",
    purple: "hover:bg-purple-600/20 hover:text-purple-400 border-purple-500/20 hover:border-purple-500/40",
  }
  return (
    <Button variant="outline" className={`h-16 w-full flex-col gap-1.5 bg-white/5 border text-gray-500 transition-all rounded-xl ${colorMap[color]}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-tight">{label}</span>
    </Button>
  )
}

export function ExecutiveActions({ delay = 0 }: { delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-gradient-to-br from-[#121214] to-[#0A0A0B] border-white/10 overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 right-0 p-8 opacity-5 text-white/10 rotate-12">
        <GraduationCap className="w-40 h-40" />
      </div>
      <div className="p-6 space-y-6 relative z-10">
        <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 italic">Administrative Tasks</h4>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/faculty/marks">
            <ToolButton icon={<Award className="w-4 h-4" />} label="Marks Upload" color="indigo" />
          </Link>
          <Link href="/faculty/proctees">
            <ToolButton icon={<FileText className="w-4 h-4" />} label="Counselling" color="amber" />
          </Link>
          <Link href="/faculty/proctees">
            <ToolButton icon={<Users className="w-4 h-4" />} label="Student List" color="emerald" />
          </Link>
          <Link href="/faculty/courses">
            <ToolButton icon={<Briefcase className="w-4 h-4" />} label="Course CMS" color="purple" />
          </Link>
        </div>
        
        <div className="pt-4 border-t border-white/5 space-y-3">
        {/* Payroll & Leaves are protected by specific routes */}
          <Link href="/faculty/admin/payroll">
            <Button variant="ghost" className="w-full justify-between h-12 bg-white/5 hover:bg-white text-gray-500 hover:text-black border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl px-4">
              Payroll & Pay-slips <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/faculty/admin/leaves">
            <Button variant="ghost" className="w-full justify-between h-12 bg-white/5 hover:bg-white text-gray-500 hover:text-black border border-white/5 transition-all text-[10px] font-black uppercase tracking-widest rounded-xl px-4">
              Leave Management <Calendar className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      </Card>
    </SmoothView>
  )
}
