import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, BookOpen, AlertCircle, TrendingUp, Calendar, CreditCard } from "lucide-react"
import { getStudentProfile, getAttendance } from "@/lib/actions"

export default async function ParentDashboard() {
  const profile = await getStudentProfile() // Parent tracks this student
  const attendance = await getAttendance()

  const stats = [
    { label: "Student CGPA", value: profile?.cgpa?.toFixed(2) || "0.00", icon: TrendingUp, color: "text-blue-400" },
    { label: "Leaves Taken", value: "2", icon: Calendar, color: "text-purple-400" },
    { label: "Pending Fees", value: "₹0", icon: CreditCard, color: "text-green-400" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Parent Portal</h1>
          <p className="text-gray-400 mt-1">Monitoring academic progress for <span className="text-blue-400 font-bold">{profile?.user?.name}</span></p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
          <Badge variant="outline" className="text-purple-400 border-purple-400/30">Fall Sem 2024-25</Badge>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-sm text-gray-400">Reg No: {profile?.regNo}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Attendance Summary</CardTitle>
            <CardDescription className="text-gray-400">Course-wise attendance for current semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             {attendance.map((item, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-300 font-medium">{item.course.title}</span>
                    <span className={item.percentage < 75 ? "text-red-400" : "text-green-400"}>{item.percentage}%</span>
                 </div>
                 <Progress value={item.percentage} className={`h-1.5 ${item.percentage < 75 ? "bg-red-500/20" : "bg-black/30"}`} />
               </div>
             ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Proctor Communication</CardTitle>
            <CardDescription className="text-gray-400">Reach out to the assigned proctor for any concerns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/10 border border-blue-500/20">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {profile?.proctor?.user?.name[0]}
                </div>
                <div>
                    <h4 className="text-white font-bold">{profile?.proctor?.user?.name}</h4>
                    <p className="text-xs text-gray-400">{profile?.proctor?.designation}</p>
                </div>
             </div>
             <p className="text-sm text-gray-400 py-2">Last feedback: "Consistent performance in CAT-1. Encouraged to participate more in research projects."</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
