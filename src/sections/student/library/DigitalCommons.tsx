"use client"

import { Card, CardTitle } from "@/components/ui/card"
import { Globe, ExternalLink } from "lucide-react"
import { EResource } from "@/types/library"

interface DigitalCommonsProps {
  resources: EResource[]
}

export function DigitalCommons({ resources }: DigitalCommonsProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none relative overflow-hidden group shadow-xl p-1">
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
        <Globe className="w-32 h-32 text-white" />
      </div>
      <div className="bg-white/10 rounded-2xl p-6 relative z-10 backdrop-blur-sm">
        <CardTitle className="text-white text-xl font-black uppercase italic tracking-tighter">Digital Commons</CardTitle>
        <p className="text-[10px] text-white/70 uppercase font-black mb-6">Global Scientific Repositories</p>
        
        <div className="space-y-3">
          {resources.map((res) => (
            <a key={res.id} href={res.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/20 transition-all group/item">
              <div className="space-y-0.5">
                <p className="font-bold text-[10px] uppercase truncate max-w-[150px]">{res.title}</p>
                <p className="text-[8px] opacity-70 font-black uppercase">{res.type} • {res.category}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/item:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </Card>
  )
}

