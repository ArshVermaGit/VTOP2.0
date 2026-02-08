import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TimeTableWithCourse } from "@/types/student"
import { SmoothView } from "@/components/animations/SmoothView"

interface InstructionPipelineProps {
  todayClasses: TimeTableWithCourse[]
  delay?: number
}

export function InstructionPipeline({ todayClasses, delay = 0 }: InstructionPipelineProps) {
  return (
    <SmoothView delay={delay}>
      <Card className="bg-white border-slate-200 overflow-hidden shadow-lg">
      <CardHeader className="bg-slate-50 border-b border-slate-200 py-6 font-black italic uppercase tracking-tight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-slate-900 text-lg">Instruction Pipeline</CardTitle>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: '2-digit' })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {todayClasses.length > 0 ? todayClasses.map((cls, i) => (
            <div key={i} className="p-6 hover:bg-slate-50 transition-all group flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center">
                  <p className="text-[10px] text-slate-500 font-black uppercase leading-none">{cls.startTime.split(':')[0]}</p>
                  <p className="text-xl font-black text-blue-600 italic tracking-tighter">{cls.startTime.split(':')[1]}</p>
                  <div className="w-full bg-blue-600 h-0.5 mt-1" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-slate-900 font-black text-md uppercase italic tracking-tight group-hover:text-blue-600 transition-colors">{cls.course.title}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">{cls.course.code} • Slot: {cls.slot} • {cls.venue}</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge className="bg-slate-100 text-slate-500 border-none text-[7px] font-black uppercase">Theory</Badge>
                    <Badge className="bg-blue-50 text-blue-600 border-none text-[7px] font-black uppercase">A-Slot High Priority</Badge>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </div>
          )) : (
            <div className="p-20 text-center space-y-3">
              <Clock className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest italic leading-none">No classes scheduled for today.</p>
            </div>
          )}
        </div>
      </CardContent>
      </Card>
    </SmoothView>
  )
}

