"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"
import Link from "next/link"
import { FacultyWithDetails } from "@/types"
import { SmoothView } from "@/components/animations/SmoothView"

export function ProctorAudit({ proctees, delay = 0 }: { proctees: FacultyWithDetails['proctees'], delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden min-h-[350px]">
      <CardHeader className="bg-black/40 border-b border-white/5">
        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" /> Proctor Audit Ledger
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {proctees.slice(0, 4).map((proctee) => (
          <div key={proctee.id} className="p-4 flex items-center justify-between border-b border-white/5 hover:bg-white/[0.01] transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black italic">
                {proctee.user.name[0]}
              </div>
              <div className="space-y-0.5">
                <p className="text-white font-bold text-[11px] uppercase truncate max-w-[120px]">
                  {proctee.user.name}
                </p>
                <p className="text-[8px] text-gray-600 font-black uppercase leading-none">
                  {proctee.regNo}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white font-black italic">{(proctee.cgpa || 0).toFixed(2)}</p>
              <p className="text-[7px] text-gray-700 font-black uppercase">CGPA</p>
            </div>
          </div>
        ))}
        <Link href="/faculty/proctees">
          <Button variant="ghost" className="w-full h-12 text-[9px] text-indigo-400 font-black uppercase hover:bg-indigo-600/10 tracking-widest">
            View Complete Mentor List
          </Button>
        </Link>
      </CardContent>
      </Card>
    </SmoothView>
  )
}
