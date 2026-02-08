"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, History } from "lucide-react"
import { SmoothView } from "@/components/animations/SmoothView"

export function AcademicHealth({ delay = 0 }: { delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-white border-slate-200 overflow-hidden shadow-lg min-h-[300px]">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="text-slate-900 text-md uppercase font-black italic flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" /> Academic Health
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8 py-4 text-center">
          <div className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-full mx-auto flex items-center justify-center text-slate-300">
            <History className="w-10 h-10" />
          </div>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Detailed Analytics Coming Soon</p>
        </div>
      </CardContent>
      </Card>
    </SmoothView>
  )
}

