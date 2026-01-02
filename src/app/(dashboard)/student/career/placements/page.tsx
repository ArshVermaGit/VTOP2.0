import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building2, 
  DollarSign, 
  Zap, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  GraduationCap, 
  Globe, 
  ExternalLink 
} from "lucide-react"
import { getCareerStatus } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default async function CareerPortalPage() {
  const data = await getCareerStatus()
  const { drives = [], opportunities = [] } = (data || {}) as { drives: any[], opportunities: any[] }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Briefcase className="w-8 h-8 text-blue-500" /> Career & Placements
          </h1>
          <p className="text-gray-400 mt-1">Placement Drives, Internship Portals & Career Opportunities</p>
        </div>
        <div className="flex items-center gap-3">
             <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 shadow-lg">
                <Globe className="w-4 h-4 mr-2" /> Global Postings
             </Button>
             <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-1 uppercase font-black text-[9px]">Placement Season 2025</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* ACTIVE PLACEMENT DRIVES */}
            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <CardTitle className="text-white text-lg">Active Placement Drives</CardTitle>
                        </div>
                        <Badge variant="outline" className="border-amber-500/20 text-amber-400 uppercase text-[8px] font-black">Urgent Applications</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {drives.length > 0 ? drives.map((drive) => (
                            <div key={drive.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3">
                                            <Building2 className="w-8 h-8 text-gray-500 group-hover:text-amber-400 transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-white font-black text-lg tracking-tight uppercase">{drive.companyName}</h4>
                                            <div className="flex items-center gap-3">
                                                <p className="text-[12px] text-gray-400 font-bold">{drive.jobTitle}</p>
                                                <span className="text-gray-700">•</span>
                                                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-wider">{drive.salaryPackage}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-[9px] text-gray-600 uppercase font-black mb-1">Application Deadline</p>
                                            <div className="flex items-center gap-2 text-rose-400 text-[10px] font-black uppercase">
                                                <Clock className="w-3.5 h-3.5" /> 
                                                {new Date(drive.deadline).toLocaleDateString()}
                                            </div>
                                        </div>
                                        {drive.applications.length > 0 ? (
                                            <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 uppercase font-black text-[9px]">
                                                {drive.applications[0].status}
                                            </Badge>
                                        ) : (
                                            <Button className="bg-white/10 border border-white/10 text-white hover:bg-white hover:text-black font-black uppercase text-[9px] tracking-widest h-10 px-6 transition-all">
                                                Apply Now
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4">
                                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-[9px] text-gray-400 font-bold uppercase cursor-default">
                                         <AlertCircle className="w-3.5 h-3.5" /> {drive.eligibility}
                                     </div>
                                     <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-[9px] text-gray-400 font-bold uppercase cursor-default">
                                         <Calendar className="w-3.5 h-3.5" /> Drive: {new Date(drive.driveDate).toLocaleDateString()}
                                     </div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-gray-600 uppercase text-[10px] font-black">No active drives found</div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* OPPORTUNITY HUB (INTERNSHIPS & JOBS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                    <CardHeader className="bg-black/20 border-b border-white/5 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-white text-md flex items-center gap-2">
                             <GraduationCap className="w-5 h-5 text-indigo-400" /> Internship Hub
                        </CardTitle>
                        <Badge className="bg-indigo-600/20 text-indigo-400 text-[8px] uppercase">Summer 2025</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                         {opportunities.filter(o => o.type === 'INTERNSHIP').map((o) => (
                             <div key={o.id} className="p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 group">
                                 <div className="flex justify-between items-start mb-2">
                                     <h4 className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{o.company}</h4>
                                     <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                                 </div>
                                 <p className="text-[11px] text-gray-400 font-medium mb-3">{o.title} — {o.location}</p>
                                 <div className="flex items-center justify-between">
                                     <p className="text-[10px] text-indigo-500 font-black uppercase tracking-tight">{o.stipend}</p>
                                     <p className="text-[8px] text-gray-600 font-black uppercase">Until {new Date(o.deadline).toLocaleDateString()}</p>
                                 </div>
                             </div>
                         ))}
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 overflow-hidden">
                    <CardHeader className="bg-black/20 border-b border-white/5 flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-white text-md flex items-center gap-2">
                             <Building2 className="w-5 h-5 text-emerald-400" /> Direct Job Roles
                        </CardTitle>
                        <Badge className="bg-emerald-600/20 text-emerald-400 text-[8px] uppercase">Full Time</Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                         {opportunities.filter(o => o.type === 'JOB').map((o) => (
                             <div key={o.id} className="p-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 group">
                                 <div className="flex justify-between items-start mb-2">
                                     <h4 className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{o.company}</h4>
                                     <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
                                 </div>
                                 <p className="text-[11px] text-gray-400 font-medium mb-3">{o.title} — {o.location}</p>
                                 <div className="flex items-center justify-between">
                                     <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tight">{o.salaryPackage}</p>
                                     <p className="text-[8px] text-gray-600 font-black uppercase">Until {new Date(o.deadline).toLocaleDateString()}</p>
                                 </div>
                             </div>
                         ))}
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* SIDEBAR PLACEMENT STATS */}
        <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 shadow-2xl border-none relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                     <GraduationCap className="w-32 h-32 text-white" />
                 </div>
                 <CardHeader>
                     <p className="text-[10px] text-white/50 uppercase font-black tracking-widest italic leading-tight">Current Profile Status</p>
                     <CardTitle className="text-white text-2xl font-black">PLACEMENT READY</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-6 relative z-10 py-2">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                             <p className="text-white font-black text-2xl tracking-tighter italic">9.24</p>
                             <p className="text-[9px] text-white/50 font-black uppercase">Core CGPA</p>
                         </div>
                         <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                             <p className="text-white font-black text-2xl tracking-tighter italic">00</p>
                             <p className="text-[9px] text-white/50 font-black uppercase">Arrears</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <div className="space-y-0.5">
                              <p className="text-white font-bold text-[10px] uppercase">Compliance Status</p>
                              <p className="text-[9px] text-white/50">Verified by T&P cell for Dream Roles.</p>
                          </div>
                      </div>
                 </CardContent>
                 <div className="h-2 bg-white/20" />
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-sm uppercase tracking-widest font-black">T&P Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                         Upload Verified Resume <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                         Experience Feedback <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                         Rules & Eligibility <ExternalLink className="w-4 h-4" />
                    </Button>
                </CardContent>
            </Card>

            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6">
                 <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <h4 className="text-white font-bold text-sm uppercase">Recruitment Hub</h4>
                 </div>
                 <div className="space-y-1">
                     <p className="text-gray-400 text-xs italic leading-snug">"Final year students must report to AB2-Auditorium for Google Pre-Placement Talk at 9:00 AM завтра."</p>
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span className="text-gray-500">Upcoming PPT</span>
                        <span className="text-white">Google (Feb 15)</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  )
}
