"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LibraryDue } from "@/types/library"

interface LibraryDuesProps {
  dues: LibraryDue[]
}

export function LibraryDues({ dues }: LibraryDuesProps) {
  const totalDues = dues.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="bg-black/20 border-b border-white/5">
        <CardTitle className="text-white text-md flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400" /> Library Dues
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 flex flex-col items-center justify-center gap-3">
        <div className="text-center space-y-1">
          <p className="text-[10px] text-gray-500 uppercase font-black">Outstanding Balance</p>
          <p className={`text-3xl font-black italic ${totalDues > 0 ? 'text-rose-500' : 'text-emerald-400'}`}>${totalDues.toFixed(2)}</p>
        </div>
        {totalDues > 0 && (
          <Button className="w-full bg-rose-600/10 text-rose-500 border border-rose-500/20 hover:bg-rose-600 hover:text-white font-black uppercase text-[9px] tracking-widest h-9 transition-all">
            Clear Dues
          </Button>
        )}
        {totalDues === 0 && (
          <div className="flex items-center gap-2 p-2 px-4 rounded-full bg-emerald-600/10 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <p className="text-[9px] text-emerald-400 uppercase font-black">Account Clear</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
