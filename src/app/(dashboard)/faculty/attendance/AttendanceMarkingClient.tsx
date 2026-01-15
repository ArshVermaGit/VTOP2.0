"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Search, Clock, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { markAttendance, getCourseStudents } from "@/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function AttendanceMarkingClient({ courses }: { courses: { id: string, title: string, code: string, slot: string | null }[] }) {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || "")
  const [students, setStudents] = useState<{ id: string, regNo: string, user: { name: string } }[]>([])
  const [attendance, setAttendance] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [slot, setSlot] = useState("A1")

  useEffect(() => {
    const loadStudents = async () => {
      if (selectedCourse) {
        const data = await getCourseStudents(selectedCourse)
        setStudents(data)
        // Initialize all as Present
        const initial: Record<string, string> = {}
        data.forEach((s: { id: string }) => initial[s.id] = "PRESENT")
        setAttendance(initial)
      }
    }
    loadStudents()
  }, [selectedCourse])

  const toggleStatus = (studentId: string) => {
    setAttendance(prev => {
      const current = prev[studentId]
      const next = current === "PRESENT" ? "ABSENT" : current === "ABSENT" ? "ON_DUTY" : "PRESENT"
      return { ...prev, [studentId]: next }
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const studentData = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status
      }))
      await markAttendance({
        courseId: selectedCourse,
        date: new Date(),
        slot,
        students: studentData
      })
      toast.success("Attendance marked successfully!")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to mark attendance.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredStudents = students.filter(s => 
    s.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 md:col-span-1">
             <CardHeader>
                <CardTitle className="text-white text-lg">Select Course</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {courses.map(c => (
                    <div 
                        key={c.id} 
                        onClick={() => setSelectedCourse(c.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedCourse === c.id ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-900/40' : 'bg-black/20 border-white/5 hover:border-white/20'}`}
                    >
                        <h4 className="text-white font-bold text-sm">{c.title}</h4>
                        <div className="flex justify-between items-center mt-2">
                            <span className={`text-[10px] font-bold uppercase ${selectedCourse === c.id ? 'text-blue-100' : 'text-gray-500'}`}>{c.code}</span>
                            <Badge variant="outline" className={selectedCourse === c.id ? 'border-white/30 text-white' : 'border-white/10 text-gray-500'}>
                                {c.slot}
                            </Badge>
                        </div>
                    </div>
                ))}

                <div className="pt-4 border-t border-white/5">
                   <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2">Active Slot</label>
                   <Input 
                        value={slot} 
                        onChange={(e) => setSlot(e.target.value)}
                        className="bg-black/20 border-white/5 text-white h-9"
                   />
                </div>
             </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 md:col-span-2">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-white text-lg">Student Roster</CardTitle>
                   <CardDescription>{filteredStudents.length} Students registered</CardDescription>
                </div>
                <div className="relative w-48">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-500" />
                    <Input 
                        placeholder="Search students..." 
                        className="pl-8 h-9 bg-black/20 border-white/5 text-xs text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
             </CardHeader>
             <CardContent className="space-y-2">
                {filteredStudents.map((student) => {
                    const status = attendance[student.id]
                    return (
                        <div key={student.id} className="p-3 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400 border border-white/10 font-bold text-xs uppercase">
                                    {student.user.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-bold text-sm truncate">{student.user.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">{student.regNo}</p>
                                </div>
                             </div>

                             <div className="flex items-center gap-2">
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => toggleStatus(student.id)}
                                    className={`px-4 font-bold text-[10px] uppercase tracking-widest ${
                                        status === 'PRESENT' ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30' : 
                                        status === 'ABSENT' ? 'bg-rose-600/20 text-rose-400 hover:bg-rose-600/30' : 
                                        'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                                    }`}
                                >
                                    {status === 'PRESENT' ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : 
                                     status === 'ABSENT' ? <XCircle className="w-3.5 h-3.5 mr-2" /> : 
                                     <Clock className="w-3.5 h-3.5 mr-2" />}
                                    {status}
                                </Button>
                             </div>
                        </div>
                    )
                })}

                {filteredStudents.length === 0 && (
                    <div className="p-12 text-center text-gray-600 italic">No students found.</div>
                )}
             </CardContent>
             <div className="p-6 border-t border-white/5 bg-black/20">
                <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11"
                    disabled={isSubmitting || students.length === 0}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? "Submitting..." : <><Save className="w-4 h-4 mr-2" /> FINAL SUBMIT ATTENDANCE</>}
                </Button>
                <p className="text-[10px] text-gray-500 text-center mt-3 uppercase font-bold italic tracking-wider">Note: Once submitted, records are updated in real-time for students/parents.</p>
             </div>
          </Card>
      </div>
    </div>
  )
}
