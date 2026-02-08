import { CheckCircle, GraduationCap, BookOpen, Zap } from "lucide-react"
import { StudentMetric } from "@/features/student/StudentMetric"
import { SmoothView } from "@/components/animations/SmoothView"

interface MetricsGridProps {
  avgAttendance: string
  cgpa: number
  activeCourses: number
  delay?: number
}

export function MetricsGrid({ avgAttendance, cgpa, activeCourses, delay = 0 }: MetricsGridProps) {
  return (
    <SmoothView delay={delay} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StudentMetric 
        label="Avg. Attendance" 
        value={avgAttendance} 
        subtitle="Academic Record" 
        icon={<CheckCircle className="w-5 h-5" />}
        color="emerald"
      />
      <StudentMetric 
        label="Current GPA" 
        value={(cgpa || 0).toFixed(2)} 
        subtitle="Cumulative Index" 
        icon={<GraduationCap className="w-5 h-5" />}
        color="indigo"
      />
      <StudentMetric 
        label="Active Courses" 
        value={activeCourses} 
        subtitle="Winter 2024-25" 
        icon={<BookOpen className="w-5 h-5" />}
        color="amber"
      />
      <StudentMetric 
        label="NexGen Status" 
        value="ACTIVE" 
        subtitle="System Node 01" 
        icon={<Zap className="w-5 h-5" />}
        color="rose"
      />
    </SmoothView>
  )
}
