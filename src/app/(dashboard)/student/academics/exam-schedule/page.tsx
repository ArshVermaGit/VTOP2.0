import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Monitor } from "lucide-react"
import { getExamSchedule } from "@/lib/actions"

export default async function ExamSchedulePage() {
  const exams = await getExamSchedule()
  
  // Categorize based on some property or just display all
  // For demo, we'll split them or just list them all under one tab if data is limited
  const onlineExams = exams.filter(e => e.venue === "CodeTantra" || e.venue === "Moodle")
  const offlineExams = exams.filter(e => e.venue !== "CodeTantra" && e.venue !== "Moodle")

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Exam Schedule</h1>
           <p className="text-gray-400 mt-1">View your upcoming online and offline examinations</p>
        </div>

        <Tabs defaultValue="online" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start overflow-x-auto">
                <TabsTrigger value="online" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white min-w-[120px]">Online Exams</TabsTrigger>
                <TabsTrigger value="offline" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white min-w-[120px]">Offline Exams</TabsTrigger>
            </TabsList>

            <TabsContent value="online" className="mt-6 space-y-4">
                {onlineExams.length > 0 ? onlineExams.map((exam, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-blue-400 border-blue-500/30 font-mono">{exam.courseId}</Badge>
                                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white">{exam.type}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-white">Course ID: {exam.courseId}</h3>
                            </div>
                            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    {new Date(exam.examDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-purple-400" />
                                    {exam.slot}
                                </div>
                                 <div className="flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-green-400" />
                                    {exam.venue}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : <p className="text-center py-12 text-gray-500 italic">No online exams scheduled.</p>}
            </TabsContent>

            <TabsContent value="offline" className="mt-6 space-y-4">
                 {offlineExams.length > 0 ? offlineExams.map((exam, i) => (
                    <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-purple-400 border-purple-500/30 font-mono">{exam.courseId}</Badge>
                                    <Badge className="bg-purple-600 hover:bg-purple-700 text-white">{exam.type}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-white">Course ID: {exam.courseId}</h3>
                            </div>
                            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    {new Date(exam.examDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-purple-400" />
                                    {exam.slot}
                                </div>
                                 <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-amber-400" />
                                    {exam.venue}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : <p className="text-center py-12 text-gray-500 italic">No offline exams scheduled.</p>}
            </TabsContent>
        </Tabs>
    </div>
  )
}
