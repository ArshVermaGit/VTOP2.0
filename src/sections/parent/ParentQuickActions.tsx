"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, CheckCircle, GraduationCap } from "lucide-react"
import Link from "next/link"

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  color: 'indigo' | 'amber' | 'emerald' | 'purple';
}

function ActionButton({ icon, label, color }: ActionButtonProps) {
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

export function ParentQuickActions() {
  return (
    <Card className="bg-white/5 border-white/10 p-6">
      <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 mb-4 italic">Quick Actions</h4>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/parent/payments" className="contents">
          <ActionButton icon={<CreditCard className="w-4 h-4" />} label="Pay Fees" color="indigo" />
        </Link>
        <Link href="/parent/schedule" className="contents">
          <ActionButton icon={<Calendar className="w-4 h-4" />} label="Exam View" color="amber" />
        </Link>
        <Link href="/parent/attendance" className="contents">
          <ActionButton icon={<CheckCircle className="w-4 h-4" />} label="Attendance" color="emerald" />
        </Link>
        <Link href="/parent/performance" className="contents">
          <ActionButton icon={<GraduationCap className="w-4 h-4" />} label="Grades" color="purple" />
        </Link>
      </div>
    </Card>
  )
}
