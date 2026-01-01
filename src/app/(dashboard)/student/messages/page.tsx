import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, User, Clock, Filter, Paperclip, Send } from "lucide-react"

export default async function MessagesPage() {
  const messages = [
    { 
        sender: "Dr. John Smith", 
        subject: "Compilers Lab - Extra Session", 
        role: "FACULTY (SCSE)", 
        time: "10:30 AM", 
        content: "Dear Students, there will be an extra lab session on Saturday at 10 AM in SJT-402 to cover Code Optimization topics.",
        isNew: true 
    },
    { 
        sender: "Registrar Office", 
        subject: "Convocation Registration", 
        role: "ADMINISTRATION", 
        time: "Yesterday", 
        content: "Final year students are requested to complete their convocation registration on the portal before Jan 15.",
        isNew: false 
    },
    { 
        sender: "Prof. Sarah Lee", 
        subject: "Assignment 3 Deadline Extended", 
        role: "FACULTY (SCOPE)", 
        time: "2 Days ago", 
        content: "Following your requests, the deadline for AI Project Report is extended by 48 hours. Please submit via the LMS.",
        isNew: false 
    },
  ]

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
               <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                   <MessageSquare className="w-8 h-8 text-blue-400" /> Class Messages
               </h1>
               <p className="text-gray-400 mt-1">Internal academic communication and course announcements</p>
           </div>
           <div className="flex gap-2">
                <Button variant="outline" className="border-white/10 text-white bg-white/5 h-10">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 h-10 px-6 font-bold">Archive All</Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                {messages.map((msg, i) => (
                    <Card key={i} className={cn(
                        "bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group",
                        msg.isNew && "border-l-4 border-l-blue-500"
                    )}>
                        <CardHeader className="flex flex-row justify-between items-start pb-2">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center border border-white/5">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-base font-semibold group-hover:text-blue-400 transition-colors">{msg.subject}</CardTitle>
                                    <p className="text-xs text-gray-500 mt-0.5">{msg.sender} • <span className="text-blue-400/80">{msg.role}</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {msg.time}
                                </span>
                                {msg.isNew && <Badge className="bg-blue-600 text-[10px] px-1.5 h-4">NEW</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{msg.content}</p>
                             <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1 hover:text-white transition-colors"> <Paperclip className="w-3 h-3" /> View Attachments (0) </span>
                                <span className="flex items-center gap-1 hover:text-white transition-colors"> <Send className="w-3 h-3" /> Reply </span>
                             </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Active Discussions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {[
                            { title: "Compiler Design Project", members: 42, active: "5m ago" },
                            { title: "Machine Learning (C2 Slot)", members: 120, active: "1h ago" },
                            { title: "Research Honors Batch", members: 15, active: "Now" },
                         ].map((group, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-xs shadow-lg">#{group.title[0]}</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white font-medium">{group.title}</span>
                                        <span className="text-[10px] text-gray-500">{group.members} members</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-emerald-500 font-bold uppercase animate-pulse">{group.active}</span>
                            </div>
                         ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
