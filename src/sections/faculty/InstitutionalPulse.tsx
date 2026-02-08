"use client"

import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { AcademicEvent } from "@/types/common"
import { SmoothView } from "@/components/animations/SmoothView"

interface PulseItemProps {
  label: string;
  time: string;
  floor: string;
}

function PulseItem({ label, time, floor }: PulseItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all cursor-default">
      <div className="space-y-0.5">
        <p className="text-[10px] text-white font-black uppercase italic tracking-tight">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-[8px] text-gray-600 font-bold uppercase">{time}</p>
          <span className="text-gray-800">•</span>
          <p className="text-[8px] text-gray-600 font-bold uppercase">{floor}</p>
        </div>
      </div>
      <ArrowRight className="w-3 h-3 text-gray-800 group-hover:text-white transition-colors" />
    </div>
  )
}

export function InstitutionalPulse({ events, delay = 0 }: { events: AcademicEvent[], delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-white/5 border-white/10 p-6">
      <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 mb-4 italic">Campus Events</h4>
      <div className="space-y-4">
        {events.length > 0 ? events.slice(0, 3).map((event, i) => (
          <PulseItem 
            key={i} 
            label={event.title} 
            time={`${new Date(event.date).toLocaleDateString()} • ${new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`} 
            floor={event.location || "TBD"} 
          />
        )) : (
          <p className="text-gray-500 text-[10px] uppercase font-bold text-center py-4">No upcoming events</p>
        )}
      </div>
      </Card>
    </SmoothView>
  )
}
