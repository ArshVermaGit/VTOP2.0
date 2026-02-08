"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck } from "lucide-react"

interface ComplianceRowProps {
  label: string;
  status: string;
  color: 'emerald' | 'indigo';
}

function ComplianceRow({ label, status, color }: ComplianceRowProps) {
  const colorMap = {
    emerald: "bg-emerald-500 border-emerald-500/50",
    indigo: "bg-indigo-500 border-indigo-500/50",
  }
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
      <p className="text-[10px] text-gray-400 uppercase font-black tracking-tight">{label}</p>
      <div className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colorMap[color].split(' ')[0]}`} />
        <p className={`text-[9px] font-black uppercase tracking-widest ${color === 'emerald' ? 'text-emerald-400' : 'text-indigo-400'}`}>{status}</p>
      </div>
    </div>
  )
}

export function ParentCompliance() {
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl min-h-[300px] flex flex-col">
      <CardHeader className="bg-black/40 border-b border-white/5">
        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" /> Student Safety & Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <ComplianceRow label="Hostel Curfew" status="RECORDED" color="emerald" />
          <ComplianceRow label="Disciplinary Record" status="NO ENTRIES" color="emerald" />
          <ComplianceRow label="Leave Authorization" status="SYNCED" color="indigo" />
          <ComplianceRow label="Biometric Status" status="ACTIVE" color="indigo" />
        </div>
      </CardContent>
    </Card>
  )
}
