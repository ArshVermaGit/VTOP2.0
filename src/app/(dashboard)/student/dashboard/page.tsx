import { getStudentProfile, getAttendance, getTimetable, getCommunications } from "@/lib/actions"
import { WelcomeHero } from "@/sections/student/WelcomeHero"
import { AttendancePulse } from "@/sections/student/AttendancePulse"
import { BentoStatCard } from "@/sections/student/BentoStatCard"
import { QuickActions } from "@/sections/student/QuickActions"
import { InstructionPipeline } from "@/sections/student/InstructionPipeline"
import { SystemAlerts } from "@/sections/student/SystemAlerts"
import { AcademicHealth } from "@/sections/student/AcademicHealth"
import { CampusPulse } from "@/sections/student/CampusPulse"
import { StudentProfileWithUser, TimeTableWithCourse, Attendance } from "@/types/student"
import { GraduationCap, BookOpen } from "lucide-react"

export default async function DashboardPage() {
  const profile = await getStudentProfile() as StudentProfileWithUser | null
  const attendance = await getAttendance() as Attendance[]
  const timetable = await getTimetable()
  const { communications } = await getCommunications()

  const avgAttendanceValue = attendance.length > 0 
    ? (attendance.reduce((acc: number, curr: Attendance) => acc + (curr.percentage || 0), 0) / attendance.length).toFixed(1) + "%"
    : "0.0%"

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const todayClasses = (timetable.filter((t: any) => t.day === today).sort((a: any, b: any) => a.startTime.localeCompare(b.startTime))) as TimeTableWithCourse[]
  const nextClass = todayClasses.length > 0 ? todayClasses[0] : null

  if (!profile) return <div className="p-10 text-white font-black uppercase text-xs">Unauthorized or Student Profile not found.</div>

  return (
    <div className="space-y-8 pb-10">
      {/* Top Section: Bento Grid Main Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6 min-h-[600px]">
        {/* Welcome Area - Desktop: Spans 2x2 */}
        <div className="md:col-span-2 md:row-span-2">
            <WelcomeHero profile={profile} nextClass={nextClass} delay={0.1} />
        </div>

        {/* Attendance Widget - Spans 1x1 on Large but could be taller */}
        <div className="lg:col-span-1 lg:row-span-2">
            <AttendancePulse percentage={avgAttendanceValue} delay={0.2} />
        </div>

        {/* Quick Stats - Individual Bento Blocks */}
        <BentoStatCard 
            label="Current GPA" 
            value={(profile.cgpa || 0).toFixed(2)} 
            icon={<GraduationCap className="w-5 h-5" />} 
            color="indigo" 
            delay={0.3} 
        />
        
        <BentoStatCard 
            label="Active Courses" 
            value={attendance.length} 
            icon={<BookOpen className="w-5 h-5" />} 
            color="amber" 
            delay={0.4} 
        />
      </div>

      {/* Middle Section: Schedule & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <InstructionPipeline todayClasses={todayClasses} delay={0.5} />
        </div>
        <div className="lg:col-span-1">
            <QuickActions delay={0.6} />
        </div>
      </div>

      {/* Bottom Section: Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
            <AcademicHealth delay={0.7} />
        </div>
        <div className="lg:col-span-1">
            <CampusPulse delay={0.8} />
        </div>
        <div className="lg:col-span-2">
            <SystemAlerts communications={communications} delay={0.9} />
        </div>
      </div>
    </div>
  )
}

