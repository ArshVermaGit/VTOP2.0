"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Info, ChevronRight, ArrowUpRight } from "lucide-react"

export function LibraryTools() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-sm uppercase font-black tracking-widest border-b border-white/10 pb-4">Library Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
            Turnitin Report <ArrowUpRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
            Room Booking (GSR) <Clock className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
            Purchase Suggestion <Info className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-4 shadow-inner">
        <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4">Library Policies</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between group cursor-pointer">
            <p className="text-[11px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">Issuance & Duration</p>
            <ChevronRight className="w-3.5 h-3.5 text-gray-800" />
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <p className="text-[11px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">Fine Accumulation Rules</p>
            <ChevronRight className="w-3.5 h-3.5 text-gray-800" />
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <p className="text-[11px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">E-Access Eligibility</p>
            <ChevronRight className="w-3.5 h-3.5 text-gray-800" />
          </div>
        </div>
      </div>
    </div>
  )
}
