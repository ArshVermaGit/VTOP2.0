"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info, Clock, MessageSquare } from "lucide-react"
import { Communication } from "@prisma/client"

export function ParentAnnouncements({ announcements }: { announcements: Communication[] }) {
  return (
    <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl">
      <CardHeader className="bg-black/40 border-b border-white/5 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-indigo-500" />
            <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Institutional Feed for Parents</CardTitle>
          </div>
          <Badge className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px]">{announcements.length} Feed Items</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {announcements.length > 0 ? announcements.map((ann) => (
            <div key={ann.id} className="p-6 hover:bg-white/[0.02] transition-all group cursor-pointer flex gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${ann.category === 'URGENT' ? 'bg-rose-500/10 border-rose-500/20' : 'bg-white/5 border-white/10'} border`}>
                {ann.category === 'URGENT' ? <AlertTriangle className="w-5 h-5 text-rose-500" /> : <Info className="w-5 h-5 text-gray-500" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-black text-sm uppercase italic tracking-tight transition-colors ${ann.category === 'URGENT' ? 'text-rose-400' : 'text-white group-hover:text-indigo-400'}`}>{ann.title}</h4>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{new Date(ann.date).toLocaleDateString()}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-bold">{ann.content}</p>
                <div className="flex items-center gap-3 pt-2">
                  <p className="text-[9px] text-gray-700 uppercase font-black flex items-center gap-1"><Clock className="w-3 h-3" /> Published Recently</p>
                  <span className="text-gray-800">•</span>
                  <button className="text-[9px] text-indigo-400/50 hover:text-indigo-400 font-black uppercase transition-colors">Acknowledge</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center opacity-20">
              <MessageSquare className="w-12 h-12 mx-auto text-white mb-4" />
              <p className="text-[10px] text-white uppercase font-black tracking-widest italic">No announcements found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
