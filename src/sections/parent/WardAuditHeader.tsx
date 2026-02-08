"use client"

import { ParentWithDetails } from "@/types"

export function WardAuditHeader({ student }: { student: NonNullable<ParentWithDetails['student']> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic leading-none">Comprehensive Ward Audit</h1>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Deep-dive into academic, financial and behavioral metrics</p>
      </div>

      <div className="flex items-center gap-6 justify-start md:justify-end">
        <div className="flex items-center gap-4 border-r border-white/10 pr-6">
           <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-black italic">
              {student.user.name[0]}
           </div>
           <div>
              <p className="text-white font-black text-[11px] uppercase italic leading-none mb-1">{student.user.name}</p>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{student.regNo}</p>
           </div>
        </div>
        <div className="text-right">
           <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest leading-none">Academic Index</p>
           <p className="text-2xl font-black text-white italic tracking-tighter">{student.cgpa.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
