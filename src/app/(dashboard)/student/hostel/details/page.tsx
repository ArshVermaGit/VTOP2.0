import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Home, Users, CreditCard, Wrench, Coffee, ShieldCheck, Info, ChevronRight, MapPin, Zap, Wifi } from "lucide-react"
import { getHostelStatus } from "@/lib/actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function HostelDetailsPage() {
  const status = await getHostelStatus()
  if (!status?.admission) return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 bg-white/5 border border-white/10 rounded-3xl">
          <Home className="w-16 h-16 text-gray-500 mb-4" />
          <h2 className="text-2xl font-bold text-white">No Hostel Allotment Found</h2>
          <p className="text-gray-400 max-w-sm">You haven't applied for hostel accommodation yet, or your application is still pending review.</p>
          <Link href="/student/hostel/admission">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 h-10 px-6 font-bold uppercase tracking-wider text-[10px]">Hostel Admission Hub</Button>
          </Link>
      </div>
  )

  const admission = status.admission

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Home className="w-8 h-8 text-amber-500" /> Residency Dashboard
          </h1>
          <p className="text-gray-400 mt-1">{admission.block} • Room 402 • {admission.roomPref || 'Single AC'}</p>
        </div>
        <div className="flex items-center gap-3">
             <Link href="/student/hostel/maintenance">
                <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white font-bold uppercase text-[10px] tracking-widest px-6 h-10">
                    <Zap className="w-4 h-4 mr-2" /> Maintenance Hub
                </Button>
             </Link>
             <Badge className="bg-amber-600/20 text-amber-400 border border-amber-500/20 px-4 py-1 uppercase font-black text-[10px]">ALLOTTED</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Home className="w-16 h-16 text-amber-500" />
              </div>
              <CardHeader className="pb-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Room Number</p>
                  <CardTitle className="text-4xl font-black text-white">402</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5" /> {admission.block} • Flor 4
                  </div>
              </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users className="w-16 h-16 text-blue-500" />
              </div>
              <CardHeader className="pb-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Occupancy</p>
                  <CardTitle className="text-4xl font-black text-white">Single</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-xs text-blue-400/80 font-bold uppercase">Private Residency</p>
              </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Coffee className="w-16 h-16 text-rose-500" />
              </div>
              <CardHeader className="pb-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Mess Type</p>
                  <CardTitle className="text-4xl font-black text-white">Spl</CardTitle>
              </CardHeader>
              <CardContent>
                  <Link href="/student/hostel/mess" className="text-rose-400 text-xs font-bold flex items-center gap-1 hover:underline">
                      View Mess Services <ChevronRight className="w-3 h-3" />
                  </Link>
              </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CreditCard className="w-16 h-16 text-emerald-500" />
              </div>
              <CardHeader className="pb-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Hostel Fees</p>
                  <CardTitle className="text-4xl font-black text-white">Paid</CardTitle>
              </CardHeader>
              <CardContent>
                  <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase">NO OUTSTANDING</Badge>
              </CardContent>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-4 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-white text-lg">Active Maintenance Logs</CardTitle>
                        <CardDescription className="text-xs">Tracking open facility & room repair tickets</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {status.maintenanceTickets.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {status.maintenanceTickets.map((ticket) => (
                                <div key={ticket.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                                            {ticket.category === 'WIFI' ? <Wifi className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-white font-bold text-sm tracking-tight">{ticket.issue}</h4>
                                            <p className="text-[10px] text-gray-500 uppercase font-black">{ticket.category} • {new Date(ticket.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge className={`text-[8px] font-black px-4 ${ticket.status === 'OPEN' ? 'bg-orange-600/20 text-orange-400' : 'bg-emerald-600/20 text-emerald-400'}`}>
                                            {ticket.status}
                                        </Badge>
                                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <ShieldCheck className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-500 font-bold uppercase text-[10px]">All Systems Operational</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 group hover:border-amber-500/30 transition-all cursor-pointer">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white text-md">Room Change Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-500 mb-4">Request a change in room type, roommate, or block for the upcoming semester.</p>
                        <Button variant="ghost" className="p-0 text-amber-500 text-[10px] font-black uppercase tracking-widest hover:bg-transparent">
                            Apply for change <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 group hover:border-rose-500/30 transition-all cursor-pointer">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-white text-md">Hostel Vacating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-gray-500 mb-4">Digitally submit your vacating form for projects, internships, or graduation.</p>
                        <Button variant="ghost" className="p-0 text-rose-500 text-[10px] font-black uppercase tracking-widest hover:bg-transparent">
                            Apply for vacating <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="space-y-6">
             <Card className="bg-amber-600/5 border-amber-500/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Coffee className="w-24 h-24 text-amber-500" />
                </div>
                <CardHeader>
                    <CardTitle className="text-white text-md">Mess & Dining</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                     <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-gray-500 uppercase font-black">Today's Dinner</p>
                            <p className="text-white font-bold text-sm">Veg Biryani, Salan, Raita, Gulab Jamun</p>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-gray-500 uppercase font-black">Timings</span>
                            <span className="text-amber-400 font-bold">07:30 PM - 09:30 PM</span>
                        </div>
                     </div>
                     <Link href="/student/hostel/mess" className="block">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white uppercase text-[10px] font-black h-11 tracking-wider">
                            Full Mess Menu <ChevronRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                     </Link>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-md">Facility Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-400 leading-tight">Curfew time is 09:30 PM. Late entry requires biometric verification and proctor approval.</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-400 leading-tight">Electronic appliances above 500W are not permitted in residential blocks for safety.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
