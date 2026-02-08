"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, BookOpen, Bookmark, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IssuedBook, Reservation } from "@/types/library"

interface CirculationManagerProps {
  issuedBooks: IssuedBook[]
  reservations: Reservation[]
}

export function CirculationManager({ issuedBooks, reservations }: CirculationManagerProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <CardTitle className="text-white text-lg">Currently Issued Books</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {issuedBooks.length > 0 ? issuedBooks.map((issue) => (
              <div key={issue.id} className="p-6 hover:bg-white/[0.01] transition-colors group flex items-center justify-between">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-16 rounded bg-indigo-900/30 border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 group-hover:bg-indigo-600/20 transition-all">
                    <Book className="w-6 h-6" />
                    <p className="text-[7px] font-black uppercase mt-1">Ref</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-md tracking-tight">{issue.book.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium">By {issue.book.author}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <p className="text-[9px] text-gray-600 uppercase font-black flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due on {new Date(issue.dueDate).toLocaleDateString()}
                      </p>
                      <span className="text-gray-800">•</span>
                      <Badge className={`text-[7px] uppercase font-black h-4 px-2 ${issue.status === 'OVERDUE' ? 'bg-rose-600/10 text-rose-400 border-rose-500/20' : 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20'}`}>
                        {issue.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[9px] uppercase font-black text-gray-500 hover:text-white transition-all">Request Renewal</Button>
              </div>
            )) : (
              <div className="p-12 text-center text-gray-600 uppercase text-[10px] font-black">No books currently issued</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader className="bg-black/20 border-b border-white/5">
          <CardTitle className="text-white text-md flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" /> Pending Reservations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reservations.length > 0 ? reservations.map((res) => (
            <div key={res.id} className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-white font-bold text-xs truncate max-w-[200px]">{res.book.title}</p>
                <p className="text-[9px] text-gray-500 uppercase font-black">Queue: #{res.queuePosition}</p>
              </div>
              <Badge className="bg-white/5 text-gray-400 border-white/10 text-[7px] uppercase font-black">{res.status}</Badge>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-700 uppercase text-[9px] font-black italic">No reservations found</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
