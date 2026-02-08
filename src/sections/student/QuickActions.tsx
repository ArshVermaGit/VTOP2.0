"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { SmoothView } from "@/components/animations/SmoothView"
import { BookOpen, GraduationCap, Calendar, CreditCard, ChevronRight } from "lucide-react"
import Link from "next/link"

export function QuickActions({ delay = 0 }: { delay?: number }) {
  const actions = [
    { label: "View Timetable", icon: <Calendar className="w-4 h-4" />, href: "/student/academics/timetable", color: "blue" },
    { label: "Check Results", icon: <GraduationCap className="w-4 h-4" />, href: "/student/academics/results", color: "indigo" },
    { label: "My Publications", icon: <BookOpen className="w-4 h-4" />, href: "/student/research/publications", color: "emerald" },
    { label: "Payment Portal", icon: <CreditCard className="w-4 h-4" />, href: "/student/payments", color: "amber" },
  ]

  const colorClasses = {
    blue: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white",
    indigo: "text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white",
    emerald: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white",
    amber: "text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white",
  }

  return (
    <SmoothView delay={delay} className="h-full">
      <Card className="h-full bg-white border-slate-200 p-8 flex flex-col shadow-lg rounded-[2.5rem]">
        <div className="mb-6">
           <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Tools</p>
           <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Quick Actions</h3>
        </div>

        <div className="space-y-3 flex-1">
          {actions.map((action, i) => (
            <Link key={i} href={action.href}>
              <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50 transition-all group mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${colorClasses[action.color as keyof typeof colorClasses]}`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase italic tracking-tight">{action.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </SmoothView>
  )
}
