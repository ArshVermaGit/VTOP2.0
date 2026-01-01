import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, User, Mail, Phone, Calendar, Clock, MessageSquare, Plus, ShieldCheck, Heart, FileText, CheckCircle2, AlertCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFacultyProfile, getFacultyMeetings, getFacultyCounsellingRecords } from "@/lib/actions"
import Image from "next/image"

export default async function FacultyMentorPage() {
  const [profile, meetings, counselling] = await Promise.all([
    getFacultyProfile(),
    getFacultyMeetings(),
    getFacultyCounsellingRecords()
  ])

  if (!profile) return <div className="p-12 text-center text-gray-500">Log in to manage Mentor activities.</div>

  const proctees = profile.proctees || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Users className="w-8 h-8 text-indigo-400" /> Mentor-Mentee Administration
          </h1>
          <p className="text-gray-400 mt-1">Manage proctoring assignments and documentation</p>
        </div>
        <div className="flex gap-3">
             <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" /> New Meeting
             </Button>
             <Button variant="outline" className="border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10">
                <FileText className="w-4 h-4 mr-2" /> Annual Report
             </Button>
        </div>
      </div>

      <Tabs defaultValue="proctees" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start h-auto flex-wrap mb-6">
          <TabsTrigger value="proctees" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-6">My Proctees ({proctees.length})</TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6">Scheduled Meetings</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6">Counseling History</TabsTrigger>
        </TabsList>

        <TabsContent value="proctees" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proctees.map((student: any) => (
                    <Card key={student.id} className="bg-white/5 border-white/10 hover:border-indigo-500/30 transition-all group overflow-hidden">
                        <div className="h-1 bg-linear-to-r from-indigo-600 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                                {student.photoUrl ? (
                                    <Image src={student.photoUrl} alt={student.user.name} width={48} height={48} className="rounded-full object-cover" />
                                ) : (
                                    student.user.name[0]
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-white text-base truncate">{student.user.name}</CardTitle>
                                <CardDescription className="text-xs text-indigo-400 uppercase tracking-widest">{student.regNo}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                                <span className="p-2 rounded bg-black/20 border border-white/5 truncate"> {student.program} </span>
                                <span className="p-2 rounded bg-black/20 border border-white/5 text-center"> CGPA: {student.cgpa.toFixed(2)} </span>
                             </div>
                             <div className="flex justify-between items-center text-xs pt-4 border-t border-white/5">
                                 <div className="flex items-center gap-2 text-gray-400">
                                    <Mail className="w-3 h-3" /> {student.user.email}
                                 </div>
                                 <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-400">NORMAL</Badge>
                             </div>
                        </CardContent>
                        <div className="grid grid-cols-2">
                             <Button variant="ghost" className="rounded-none border-t border-r border-white/10 text-xs hover:bg-white/5 text-gray-400">
                                View Profile
                             </Button>
                             <Button variant="ghost" className="rounded-none border-t border-white/10 text-xs hover:bg-indigo-600 hover:text-white transition-colors">
                                Message
                             </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Active Meeting Schedule</CardTitle>
                    <CardDescription>Upcoming interactions with mentees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {meetings.length > 0 ? meetings.map((meeting) => (
                        <div key={meeting.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center gap-4 hover:border-blue-500/30 transition-all group">
                             <div className="p-3 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 shrink-0 h-fit">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{meeting.title}</h4>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                            With <span className="text-blue-400 font-medium">{meeting.student.user.name}</span> ({meeting.student.regNo})
                                        </p>
                                    </div>
                                    <Badge className={meeting.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600'}>
                                        {meeting.status}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 mt-3 text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                                    <span className="flex items-center gap-1"> <Calendar className="w-3 h-3" /> {new Date(meeting.date).toLocaleDateString()} </span>
                                    <span className="flex items-center gap-1"> <Clock className="w-3 h-3" /> {meeting.time} </span>
                                    <span className="flex items-center gap-1"> <MapPin className="w-3 h-3" /> {meeting.venue} </span>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-12 text-center text-gray-500">No meetings scheduled.</div>
                    )}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {counselling.map((record) => (
                    <Card key={record.id} className="bg-white/5 border-white/10 overflow-hidden">
                        <div className="bg-purple-600/10 p-4 border-b border-white/10 flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                                    {record.student.user.name[0]}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{record.student.user.name}</p>
                                    <p className="text-[10px] text-gray-500 uppercase">{record.student.regNo}</p>
                                </div>
                             </div>
                             <Badge variant="outline" className="border-purple-500/30 text-purple-400">{new Date(record.date).toLocaleDateString()}</Badge>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="p-2 rounded bg-indigo-500/10 text-indigo-400">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Counseling Summary</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{record.summary}</p>
                                </div>
                            </div>
                            {record.actionTaken && (
                                <div className="flex gap-4 items-start pt-4 border-t border-white/5">
                                    <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Action Items</p>
                                        <p className="text-white text-sm">{record.actionTaken}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
