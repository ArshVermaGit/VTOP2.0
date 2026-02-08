"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, Zap } from "lucide-react"
import { StudentProfileWithUser, TimeTableWithCourse } from "@/types/student"
import { SmoothView } from "@/components/animations/SmoothView"

interface WelcomeHeroProps {
  profile: StudentProfileWithUser | null
  nextClass: TimeTableWithCourse | null
  delay?: number
}

export function WelcomeHero({ profile, nextClass, delay = 0 }: WelcomeHeroProps) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <SmoothView delay={delay} className="h-full">
      <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl shadow-blue-900/10">
        {/* Background Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-600/5 blur-3xl opacity-20" />
        
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
              <Zap className="w-3 h-3 animate-pulse" />
              System Status: Online
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.2 }}
              className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none"
            >
              {greeting},<br />
              <span className="text-blue-500">{profile?.user?.name.split(' ')[0]}</span>
            </motion.h2>
            
            <p className="mt-4 text-slate-400 text-xs font-bold uppercase tracking-widest max-w-[280px]">
                You&apos;re all up to date. You have {nextClass ? "one class coming up" : "no more classes"} today.
            </p>
          </div>

          {nextClass && (
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: delay + 0.4 }}
               className="mt-8 flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl"
            >
              <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white italic">
                {nextClass.startTime.split(':')[0]}
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Upcoming Next</p>
                <h4 className="text-sm font-black italic uppercase tracking-tight truncate max-w-[150px]">{nextClass.course.title}</h4>
                <div className="flex items-center gap-3 mt-1 opacity-50">
                  <span className="flex items-center gap-1 text-[8px] font-black uppercase"><MapPin className="w-2 h-2" /> {nextClass.venue}</span>
                  <span className="flex items-center gap-1 text-[8px] font-black uppercase"><Clock className="w-2 h-2" /> {nextClass.startTime}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SmoothView>
  )
}
