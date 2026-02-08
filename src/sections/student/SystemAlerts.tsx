import { Card } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Communication } from "@/types/student"
import { SmoothView } from "@/components/animations/SmoothView"

interface SystemAlertsProps {
  communications: Communication[]
  delay?: number
}

export function SystemAlerts({ communications, delay = 0 }: SystemAlertsProps) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-white border-slate-200 overflow-hidden shadow-lg p-6">
      <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-4 mb-4 italic flex items-center justify-between">
        System Alerts <Bell className="w-3 h-3 text-amber-500 animate-pulse" />
      </h4>
      <div className="space-y-5">
        {communications.length > 0 ? communications.slice(0, 4).map((comm, i) => (
          <div key={i} className="space-y-1.5 group cursor-pointer">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-blue-600 font-black uppercase italic tracking-tight group-hover:text-blue-700 transition-colors">{comm.type}</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{new Date(comm.date).toLocaleDateString()}</p>
            </div>
            <h5 className="text-slate-900 font-bold text-xs uppercase italic tracking-tight leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{comm.title}</h5>
            <p className="text-[10px] text-slate-500 font-black leading-tight line-clamp-2">{comm.content}</p>
          </div>
        )) : <p className="text-slate-400 text-[10px] uppercase font-bold text-center py-6 italic leading-none">Zero system notifications.</p>}
      </div>
      <Link href="/student/messages">
        <Button variant="ghost" className="w-full mt-6 h-10 text-[9px] text-slate-500 hover:text-blue-600 font-black uppercase tracking-widest bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all rounded-xl">
          Access Message Vault
        </Button>
      </Link>
      </Card>
    </SmoothView>
  )
}

