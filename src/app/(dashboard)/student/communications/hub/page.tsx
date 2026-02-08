import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  MessageSquare, 
  Search, 
  ShieldAlert, 
  Newspaper, 
  Mail, 
  Megaphone, 
  Users, 
  FileText, 
  ChevronRight, 
  Clock, 
  User, 
  ArrowUpRight 
} from "lucide-react"
import { getCommunications } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default async function CommunicationHubPage() {
  const data = await getCommunications()
  const { communications = [], councilAnnouncements = [] } = (data || {}) as { communications: any[], councilAnnouncements: any[] }

  const spotlightItems = communications.filter((c: any) => c.type === 'SPOTLIGHT')
  const circulars = communications.filter((c: any) => c.type === 'CIRCULAR')
  const messages = communications.filter((c: any) => (c.type === 'FACULTY_MESSAGE' || c.type === 'CLASS_MESSAGE'))

  return (
    <div className="space-y-6">
      {/* HEADER & SPOTLIGHT MARQUEE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
             <Megaphone className="w-8 h-8 text-blue-600" /> Communication Hub
          </h1>
          <p className="text-slate-500 mt-1">Official News, Circulars, Spotlight & Messages</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-600">
               <ShieldAlert className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Critical: Winter Fees Extended</span>
           </div>
           <Badge className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1 uppercase font-black text-[9px]">Live Alerts</Badge>
        </div>
      </div>

      {/* QUICK STATS & SEARCH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200 p-4 flex items-center gap-4 group hover:border-blue-300 transition-all cursor-pointer shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail className="w-5 h-5" />
              </div>
              <div>
                  <p className="text-slate-900 font-black text-xl leading-none">{messages.length}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">New Messages</p>
              </div>
          </Card>
          <Card className="bg-white border-slate-200 p-4 flex items-center gap-4 group hover:border-emerald-300 transition-all cursor-pointer shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <FileText className="w-5 h-5" />
              </div>
              <div>
                  <p className="text-slate-900 font-black text-xl leading-none">{circulars.length}</p>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Circulars</p>
              </div>
          </Card>
          <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                  placeholder="Search communications, circulars or announcements..." 
                  className="w-full h-full bg-white border-slate-200 pl-11 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-400 transition-all rounded-xl"
              />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN FEED (MESSAGES & CIRCULARS) */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-slate-200 overflow-hidden shadow-lg">
                <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <CardTitle className="text-slate-900 text-lg">Inbox & Faculty Messages</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[10px] text-slate-500 hover:text-blue-600 uppercase font-black">Mark all read</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {messages.length > 0 ? messages.map((m) => (
                            <div key={m.id} className="p-5 hover:bg-slate-50 transition-colors flex items-start justify-between group cursor-pointer">
                                <div className="flex items-start gap-5">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-all font-bold">
                                        {m.authorName.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-slate-900 font-bold text-sm tracking-tight">{m.title}</h4>
                                            {m.type === 'FACULTY_MESSAGE' && <Badge className="bg-amber-50 text-amber-600 border-amber-200 text-[7px] uppercase font-black h-4 px-1.5">Direct</Badge>}
                                        </div>
                                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{m.content}</p>
                                        <div className="flex items-center gap-3 pt-1">
                                            <p className="text-[9px] text-slate-400 uppercase font-black">{m.authorName}</p>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <p className="text-[9px] text-slate-400 uppercase font-black flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {new Date(m.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-all translate-x-1" />
                            </div>
                        )) : (
                           <div className="p-12 text-center text-slate-400 uppercase text-[10px] font-black tracking-widest">No direct messages</div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-slate-200 overflow-hidden shadow-lg">
                    <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-3">
                            <Newspaper className="w-5 h-5 text-emerald-600" />
                            <CardTitle className="text-slate-900 text-md">Digital Circulars</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="divide-y divide-slate-100 p-0">
                        {circulars.map((c) => (
                            <div key={c.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                                <h4 className="text-slate-900 font-bold text-xs line-clamp-1 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{c.title}</h4>
                                <div className="flex justify-between items-center mt-2">
                                     <p className="text-[9px] text-slate-400 uppercase font-black">Official Release</p>
                                     <p className="text-[9px] text-slate-400 uppercase font-black">{new Date(c.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full py-4 text-[10px] text-slate-500 hover:text-emerald-600 uppercase font-black tracking-widest rounded-none">View Archive <ArrowUpRight className="w-3 h-3 ml-2" /></Button>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 overflow-hidden shadow-lg">
                    <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-purple-600" />
                            <CardTitle className="text-slate-900 text-md">Student Council</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                         {councilAnnouncements.map((a) => (
                             <div key={a.id} className="p-5 space-y-3">
                                 <Badge className="bg-purple-50 text-purple-600 border-purple-200 text-[7px] uppercase font-black">{a.authorRole}</Badge>
                                 <div>
                                     <h4 className="text-slate-900 font-bold text-sm tracking-tight">{a.title}</h4>
                                     <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{a.content}</p>
                                 </div>
                                 <p className="text-[9px] text-slate-400 uppercase font-black italic">{new Date(a.date).toLocaleDateString()}</p>
                             </div>
                         ))}
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* SIDEBAR: SPOTLIGHT & QUICK LINKS */}
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
                     <Megaphone className="w-24 h-24 text-white" />
                </div>
                <CardHeader>
                    <p className="text-[10px] text-white/70 uppercase font-black tracking-widest italic">Live Spotlight</p>
                    <CardTitle className="text-white text-xl font-black">URGENT NOTICES</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10 py-2">
                    {spotlightItems.map((s) => (
                        <div key={s.id} className="p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 space-y-2 group hover:bg-white/30 transition-all cursor-pointer">
                            <h4 className="text-white font-black text-sm uppercase tracking-tight leading-tight">{s.title}</h4>
                            <p className="text-[10px] text-white/80 leading-relaxed font-medium line-clamp-2">{s.content}</p>
                            <div className="pt-2 flex justify-between items-center">
                                <span className="text-[8px] text-white/60 uppercase font-black">{s.authorName}</span>
                                <Badge className="bg-white/30 text-white text-[7px] uppercase font-black">Active</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
                <div className="h-2 bg-white/20" />
            </Card>

            <Card className="bg-white border-slate-200 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-slate-900 text-sm uppercase tracking-widest font-black">Important Notices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-rose-50 border border-rose-200">
                         <ShieldAlert className="w-4 h-4 text-rose-600 mt-0.5" />
                         <div className="space-y-0.5">
                             <p className="text-slate-900 font-bold text-[10px] uppercase">Compliance Status</p>
                             <p className="text-[10px] text-slate-500">Ensure APAAR / ABC ID integration is complete before registration.</p>
                         </div>
                    </div>
                </CardContent>
            </Card>

            <div className="p-8 rounded-3xl border border-slate-200 bg-white space-y-4 shadow-lg">
                 <h4 className="text-slate-900 font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-4">External Access</h4>
                 <div className="space-y-3">
                     <div className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-3">
                             <User className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                             <p className="text-[11px] text-slate-500 font-bold uppercase">Outlook Webmail</p>
                         </div>
                         <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                         <div className="flex items-center gap-3">
                             <Bell className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                             <p className="text-[11px] text-slate-500 font-bold uppercase">News Portal</p>
                         </div>
                         <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  )
}

