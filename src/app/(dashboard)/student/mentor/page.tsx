import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Calendar, MapPin, Building, MessageSquare, Send, Clock, ShieldCheck, Info, FileText, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getStudentProfile, getMeetings, getCounsellingRecords } from "@/lib/actions"
import Image from "next/image"

export default async function StudentMentorPage() {
  const [profile, meetings, counselling] = await Promise.all([
    getStudentProfile(),
    getMeetings(),
    getCounsellingRecords()
  ])

  if (!profile) return <div className="p-12 text-center text-gray-500">Log in to view Mentor details.</div>

  const proctor = profile.proctor

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <UserCheck className="w-8 h-8 text-purple-400" /> Mentor & Proctor Module
          </h1>
          <p className="text-gray-400 mt-1">Official guidance and counselling hub</p>
        </div>
        <Badge className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-4 py-1">ACTIVE ASSIGNMENT</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Proctor Profile Sidebar */}
        <Card className="bg-white/5 border-white/10 lg:col-span-1 h-fit">
          <CardHeader className="text-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-tr from-purple-600 to-indigo-600 mx-auto mb-4 border-2 border-white/10 shadow-xl overflow-hidden relative">
               {proctor?.photoUrl ? (
                 <Image src={proctor.photoUrl} alt={proctor.user.name} fill className="object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">{proctor?.user.name[0]}</div>
               )}
            </div>
            <CardTitle className="text-white text-xl">{proctor?.user.name || "Dr. Assigning..."}</CardTitle>
            <CardDescription className="text-purple-400 font-medium">{proctor?.designation || "Faculty Mentor"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-1">
                <p className="text-[10px] text-gray-500 uppercase">School / Department</p>
                <p className="text-white text-sm font-medium">{proctor?.school || "N/A"}</p>
             </div>
             <div className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-1">
                <p className="text-[10px] text-gray-500 uppercase">Cabin / Office</p>
                <p className="text-white text-sm font-medium">{proctor?.cabin || "N/A"}</p>
             </div>
             <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-purple-400" /> {proctor?.user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Phone className="w-4 h-4 text-green-400" /> {proctor?.mobile}
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Main Content Areas */}
        <div className="lg:col-span-2 space-y-6">
           <Tabs defaultValue="communications" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start h-auto flex-wrap mb-6">
                <TabsTrigger value="communications" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6">Communications</TabsTrigger>
                <TabsTrigger value="meetings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6">Meeting Schedule</TabsTrigger>
                <TabsTrigger value="counselling" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white px-6">Counselling Records</TabsTrigger>
              </TabsList>

              <TabsContent value="communications" className="space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Mentor-Mentee Communication</CardTitle>
                        <CardDescription>Send a direct message or academic query to your Proctor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-gray-300">Subject</Label>
                            <Input placeholder="Enter subject of discussion..." className="bg-black/20 border-white/10 text-white placeholder:text-gray-600" />
                        </div>
                        <div className="space-y-2">
                             <Label className="text-gray-300">Message</Label>
                             <Textarea placeholder="Type your detailed message here..." className="bg-black/20 border-white/10 min-h-[150px] text-white placeholder:text-gray-600" />
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-white font-bold transition-all shadow-lg shadow-purple-900/20">
                            <Send className="w-4 h-4 mr-2" /> Dispatch Message
                        </Button>
                    </CardContent>
                 </Card>

                 <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white px-1">Recent History</h3>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                           <Info className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Auto-Welcome Message</p>
                            <p className="text-xs text-blue-400">Welcome to Semester 5. Please schedule your initial mentorship meeting by Friday.</p>
                        </div>
                        <span className="ml-auto text-[10px] text-gray-500 uppercase">2 days ago</span>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="meetings" className="space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                         <div>
                            <CardTitle className="text-white">Meeting Schedule</CardTitle>
                            <CardDescription>Scheduled and past interactions</CardDescription>
                         </div>
                         <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                            <Calendar className="w-4 h-4 mr-2" /> Request Meeting
                         </Button>
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
                        <CardTitle className="text-white">Academic Counselling & Wellness</CardTitle>
                        <CardDescription>Professional records of counselling sessions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {counselling.map((record) => (
                            <div key={record.id} className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                                <div className="flex justify-between items-center">
                                     <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-indigo-400" />
                                        <span className="text-gray-400 text-sm">{new Date(record.date).toLocaleDateString()}</span>
                                     </div>
                                     <Badge variant="outline" className="text-indigo-400 border-indigo-500/20">{record.priority} PRIORITY</Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Session Summary</p>
                                    <p className="text-white leading-relaxed">{record.summary}</p>
                                </div>
                                {record.actionTaken && (
                                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                        <p className="text-indigo-400 text-xs font-bold flex items-center gap-2 mb-1">
                                            <FileText className="w-3 h-3" /> Recommended Actions
                                        </p>
                                        <p className="text-white text-sm">{record.actionTaken}</p>
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
