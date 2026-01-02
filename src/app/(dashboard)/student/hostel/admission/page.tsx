import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Wrench, AlertCircle, FileText, CheckCircle2, ChevronRight, Zap, HelpCircle, History, Plus, Wifi, Droplets, Paintbrush } from "lucide-react"
import { getHostelStatus } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdmissionHubPage() {
  const status = await getHostelStatus()
  const activeTickets = status?.maintenanceTickets.filter(t => t.status !== 'RESOLVED') || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <ShieldCheck className="w-8 h-8 text-blue-500" /> Accommodation Services
          </h1>
          <p className="text-gray-400 mt-1">Hostel Admissions, Maintenance & Digital Consent Hub</p>
        </div>
        <div className="flex items-center gap-3">
             <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-1 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED PORTAL
             </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <Card className="bg-white/5 border-white/10 group hover:border-blue-500/30 transition-all cursor-pointer">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <CardTitle className="text-white text-md">Room Change</CardTitle>
                        <Plus className="w-4 h-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-500">Apply for room or block change for the next semester.</p>
                    </CardContent>
                 </Card>
                 <Card className="bg-white/5 border-white/10 group hover:border-amber-500/30 transition-all cursor-pointer">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <CardTitle className="text-white text-md">Mess Change</CardTitle>
                        <History className="w-4 h-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-500">Update your dining preferences (Special/Veg/Non-Veg).</p>
                    </CardContent>
                 </Card>
            </div>

            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                    <div>
                        <CardTitle className="text-white text-lg">Report Room Issue</CardTitle>
                        <CardDescription className="text-xs">Submit a maintenance ticket for repairs or services</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Wifi, label: 'Network/WiFi', color: 'text-blue-400' },
                            { icon: Zap, label: 'Electrical', color: 'text-amber-400' },
                            { icon: Droplets, label: 'Plumbing', color: 'text-cyan-400' },
                            { icon: Paintbrush, label: 'Civil/Paint', color: 'text-rose-400' },
                        ].map((cat) => (
                            <Button key={cat.label} variant="outline" className="h-24 flex flex-col gap-2 border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20">
                                <cat.icon className={`w-8 h-8 ${cat.color}`} />
                                <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                            </Button>
                        ))}
                    </div>
                    <div className="mt-8 p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <AlertCircle className="w-4 h-4 text-blue-400" />
                             <p className="text-xs text-gray-400">Emergency issues (Leaking pipes, sparks)? Call the <span className="text-blue-400 font-bold">24/7 Helpline</span> immediately.</p>
                         </div>
                         <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black uppercase tracking-widest h-8 px-6">
                             044-2456-7890
                         </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                    <CardTitle className="text-white text-lg">Submission History</CardTitle>
                    <Badge variant="outline" className="border-white/10 text-gray-500 text-[10px] uppercase font-black">{status?.maintenanceTickets.length} Total Records</Badge>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {status?.maintenanceTickets.map((ticket) => (
                            <div key={ticket.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                                <div className="space-y-1">
                                    <h4 className="text-white font-bold text-sm tracking-tight">{ticket.issue}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-black">{ticket.category} • Ref: {ticket.id.substring(0,8)}</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[9px] text-gray-500 uppercase font-black">Status</p>
                                        <Badge className={`text-[8px] font-black px-4 ${ticket.status === 'OPEN' ? 'bg-orange-600/20 text-orange-400' : 'bg-emerald-600/20 text-emerald-400'}`}>
                                            {ticket.status}
                                        </Badge>
                                    </div>
                                    <Button size="icon" variant="ghost" className="text-gray-500 group-hover:text-white">
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
             <Card className="bg-rose-600/5 border-rose-500/10 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-white text-md flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-500" /> Digital Consent Forms
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                        {status?.consentForms.map((form) => (
                             <div key={form.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                                <div className="space-y-0.5">
                                    <p className="text-xs text-white font-bold">{form.type}</p>
                                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{form.status}</p>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-400 hover:bg-rose-600/10">
                                    <FileText className="w-4 h-4" />
                                </Button>
                             </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full text-gray-500 hover:text-white uppercase text-[10px] font-black tracking-widest">
                         New Consent Request <ChevronRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                    <h4 className="text-white font-bold text-sm uppercase">Hostel Office</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">"Our mission is to provide a home away from home with world-class facilities and safety protocols."</p>
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-500 uppercase">Office Hours</span>
                        <span className="text-white">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-gray-500 uppercase">Chief Warden</span>
                        <span className="text-white">Dr. Robert Chen</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
