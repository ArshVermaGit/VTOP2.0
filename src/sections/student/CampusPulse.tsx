"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { SmoothView } from "@/components/animations/SmoothView"

export function CampusPulse({ delay = 0 }: { delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-white border-slate-200 overflow-hidden shadow-lg min-h-[300px]">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <CardTitle className="text-slate-900 text-md uppercase font-black italic flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" /> Campus Pulse
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6 text-center space-y-4">
          <MapPin className="w-12 h-12 mx-auto text-slate-300" />
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none italic">Tracking real-time events...</p>
        </div>
      </CardContent>
      </Card>
    </SmoothView>
  )
}

