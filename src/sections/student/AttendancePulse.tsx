"use client"

import { SmoothView } from "@/components/animations/SmoothView"
import { motion } from "framer-motion"

interface AttendancePulseProps {
  percentage: string
  delay?: number
}

export function AttendancePulse({ percentage, delay = 0 }: AttendancePulseProps) {
  const numericPercentage = parseFloat(percentage.replace("%", ""))
  const strokeDasharray = 283 // 2 * PI * 45
  const offset = strokeDasharray - (numericPercentage / 100) * strokeDasharray

  return (
    <SmoothView delay={delay} className="h-full">
      <div className="h-full bg-white border border-slate-200/60 rounded-[2.5rem] p-8 flex flex-col items-center justify-between shadow-xl shadow-slate-200/50 group hover:border-blue-300 transition-all duration-300">
        <div className="w-full text-left">
           <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Academic Pulse</p>
           <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Attendance</h3>
        </div>

        <div className="relative w-40 h-40 flex items-center justify-center py-6">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-100"
                />
                <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={strokeDasharray}
                    initial={{ strokeDashoffset: strokeDasharray }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeOut" }}
                    className="text-blue-600"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black italic tracking-tighter text-slate-900">{percentage}</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Global Avg</span>
            </div>
        </div>

        <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-4 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
            <div className="text-left">
                <p className="text-[8px] text-slate-400 font-black uppercase tracking-tight">Status</p>
                <p className="text-[10px] text-emerald-600 font-black uppercase italic">Healthy Range</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </SmoothView>
  )
}
