"use client"

import { Card } from "@/components/ui/card"
import { SmoothView } from "@/components/animations/SmoothView"

interface BentoStatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  color: 'blue' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple'
  delay?: number
  className?: string
}

export function BentoStatCard({ label, value, icon, color, delay = 0, className }: BentoStatCardProps) {
  const themes = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  }

  return (
    <SmoothView delay={delay} className={className}>
      <Card className="h-full bg-white border-slate-200/60 p-6 flex flex-col justify-between shadow-xl shadow-slate-200/40 group hover:border-blue-300 transition-all duration-300 cursor-pointer relative overflow-hidden ring-1 ring-slate-100">
        <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity scale-150 rotate-12 ${themes[color].split(' ')[1]}`}>
            {icon}
        </div>
        
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${themes[color]}`}>
          {icon}
        </div>

        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">{label}</p>
          <h4 className="text-2xl font-black italic text-slate-900 tracking-tighter uppercase">{value}</h4>
        </div>
      </Card>
    </SmoothView>
  )
}
