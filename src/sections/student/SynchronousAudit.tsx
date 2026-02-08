"use client"

import { History } from "lucide-react"
import { SmoothView } from "@/components/animations/SmoothView"

export function SynchronousAudit({ delay = 0 }: { delay?: number }) {
  return (
    <SmoothView delay={delay}>
      <div className="p-8 rounded-[2rem] bg-blue-50 border border-blue-200 text-center space-y-2">
      <History className="w-10 h-10 mx-auto text-blue-400" />
      <p className="text-[10px] text-slate-500 uppercase font-black leading-none italic">NexGen Synchronous Audit</p>
      <p className="text-[11px] text-blue-600 font-black italic">
        {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
      </div>
    </SmoothView>
  )
}

