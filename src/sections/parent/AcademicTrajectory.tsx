"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function AcademicTrajectory() {
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl min-h-[300px] flex flex-col">
      <CardHeader className="bg-black/40 border-b border-white/5">
        <CardTitle className="text-white text-md uppercase font-black italic flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" /> Study Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-6 flex items-center justify-center text-center">
        <div className="space-y-2 opacity-20">
          <div className="w-32 h-32 border-4 border-dashed border-white/20 rounded-full mx-auto flex items-center justify-center">
            <TrendingUp className="w-12 h-12" />
          </div>
          <p className="text-[10px] text-white uppercase font-black">Visual Progress Map Coming Soon</p>
        </div>
      </CardContent>
    </Card>
  )
}
