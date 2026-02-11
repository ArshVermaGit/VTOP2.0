import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ChevronRight, LayoutGrid } from "lucide-react"
import { getCourses, getAttendance } from "@/lib/actions"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string;
  code: string;
  title: string;
  type: string;
  credits: number;
  faculty?: {
    user: {
      name: string;
    }
  } | null;
}

interface AttendanceItem {
  courseId: string;
  percentage: number;
}

export default async function StudentCoursesPage() {
  const [courses, attendance] = await Promise.all([
    getCourses(),
    getAttendance()
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <LayoutGrid className="w-8 h-8 text-blue-400" /> My Academic Courses
          </h1>
          <p className="text-gray-400 mt-1">Official course registrations for Fall Semester 2024-25</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Total Credits</p>
                <p className="text-xl font-bold text-blue-400">
                    {courses.reduce((acc: number, c: Course) => acc + c.credits, 0)}
                </p>
             </div>
             <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-1">ACADEMIC HUB</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => {
          const attendanceItem = (attendance as unknown as AttendanceItem[]).find((a) => a.courseId === course.id)
          const percentage = attendanceItem?.percentage || 0

          return (
            <Link href={`/student/academics/courses/${course.id}`} key={course.id}>
              <Card className="bg-white/5 border-white/10 overflow-hidden group hover:bg-white/[0.08] transition-all cursor-pointer">
                <div className={`h-1.5 w-full ${percentage >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                         <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] font-bold uppercase tracking-widest">{course.code}</Badge>
                         <div className="text-right">
                            <span className="text-[10px] text-gray-500 uppercase font-bold">{course.type}</span>
                         </div>
                    </div>
                    <CardTitle className="text-white text-md mt-2 line-clamp-1 group-hover:text-blue-400 transition-colors">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                             <span className="text-gray-500 font-bold uppercase">Attendance Progress</span>
                             <span className={`font-black ${percentage >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>{Math.round(percentage)}%</span>
                        </div>
                        <Progress value={percentage} className="h-1 bg-black/20" />
                    </div>
                    
                    <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                            <User className="w-3 h-3" /> {course.faculty?.user.name}
                        </div>
                        <div className="flex items-center gap-1 text-blue-400 font-bold text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                            View Content <ChevronRight className="w-3 h-3" />
                        </div>
                    </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
