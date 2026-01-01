import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, Clock, MessageSquare, Send, ShieldCheck, Info, UserCheck, Activity, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getStudentProfileByParent, getParentWardMeetings, getCounsellingRecords } from "@/lib/actions"
import Image from "next/image"

export default async function ParentMentorPage() {
  const [student, meetings, counselling] = await Promise.all([
    getStudentProfileByParent(),
    getParentWardMeetings(),
    getCounsellingRecords() // This usually works as it checks wardId if parent
  ])

  if (!student) return <div className="p-12 text-center text-gray-500">Ward information not available.</div>

  const proctor = student.proctor

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <UserCheck className="w-8 h-8 text-blue-400" /> Ward's Mentor (Proctor)
          </h1>
          <p className="text-gray-400 mt-1">Direct communication with {student.user.name}'s academic guide</p>
        </div>
        <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1">OFFICIAL ASSIGNMENT</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proctor Profile Sidebar */}
        <Card className="bg-white/5 border-white/10 lg:col-span-1 h-fit">
          <CardHeader className="text-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 mx-auto mb-4 border-2 border-white/10 shadow-xl overflow-hidden relative">
               {proctor?.photoUrl ? (
                 <Image src={proctor.photoUrl} alt={proctor.user.name} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">{proctor?.user.name[0]}</div>
               )}
            </div>
            <CardTitle className="text-white text-xl">{proctor?.user.name}</CardTitle>
            <CardDescription className="text-blue-400 font-medium">{proctor?.designation}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-blue-400" /> {proctor?.user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Phone className="w-4 h-4 text-green-400" /> {proctor?.mobile}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Activity className="w-4 h-4 text-rose-400" /> Cabin: {proctor?.cabin}
                </div>
             </div>
             <div className="pt-4 border-t border-white/10">
                 <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10 text-xs">
                    <MessageSquare className="w-3 h-3 mr-2" /> Message Proctor
                 </Button>
             </div>
          </CardContent>
        </Card>

        {/* Main Content Areas */}
        <div className="lg:col-span-2 space-y-6">
           <Tabs defaultValue="meetings" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start h-auto flex-wrap mb-6">
                <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6">Ward's Meetings</TabsTrigger>
                <TabsTrigger value="counselling" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6">Counselling History</TabsTrigger>
              </TabsList>

              <TabsContent value="meetings" className="space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Interaction Log</CardTitle>
                        <CardDescription>Scheduled and completed meetings for {student.user.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {meetings.map((meeting) => (
                            <div key={meeting.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center gap-4 hover:border-blue-500/30 transition-all group">
                                <div className="p-3 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 shrink-0 h-fit">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors uppercase tracking-tight">{meeting.title}</h4>
                                        <Badge className={meeting.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-600'}>
                                            {meeting.status}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1 mt-2 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"> <Calendar className="w-3 h-3" /> {new Date(meeting.date).toLocaleDateString()} </span>
                                        <span className="flex items-center gap-1"> <Clock className="w-3 h-3" /> {meeting.time} </span>
                                        <span className="flex items-center gap-1"> <MapPin className="w-3 h-3" /> {meeting.venue} </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                 </Card>
              </TabsContent>

              <TabsContent value="counselling" className="space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Academic Counselling Records</CardTitle>
                        <CardDescription>Guidance and progress logs maintained by the Proctor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {counselling.map((record) => (
                            <div key={record.id} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 flex items-center gap-2"> <ShieldCheck className="w-4 h-4 text-purple-400" /> {new Date(record.date).toLocaleDateString()} </span>
                                    <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">OFFICIAL LOG</Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Counseling Summary</p>
                                    <p className="text-white leading-relaxed text-sm">{record.summary}</p>
                                </div>
                                {record.actionTaken && (
                                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                        <p className="text-purple-400 text-[10px] font-bold uppercase mb-1">Mentor Guidance</p>
                                        <p className="text-white text-xs">{record.actionTaken}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                 </Card>
              </TabsContent>
           </Tabs>
        </div>
      </div>
    </div>
  )
}
