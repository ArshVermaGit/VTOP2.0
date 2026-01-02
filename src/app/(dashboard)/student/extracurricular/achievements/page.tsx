import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Search, 
  FileCheck, 
  Plus, 
  Clock, 
  Award, 
  Medal, 
  Star, 
  Dribbble, 
  Terminal, 
  ArrowUpRight, 
  Monitor, 
  ChevronRight 
} from "lucide-react"
import { getAchievementsData } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default async function VAchievePage() {
  const data = await getAchievementsData()
  const { achievements = [], activityPoints = [] } = (data || {}) as { achievements: any[], activityPoints: any[] }

  const totalEXC = activityPoints.filter(p => p.type === 'EXC').reduce((acc, curr) => acc + curr.points, 0)
  const totalCoCurr = activityPoints.filter(p => p.type === 'CO_CURRICULAR').reduce((acc, curr) => acc + curr.points, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Trophy className="w-8 h-8 text-amber-500" /> vAchieve Portal
          </h1>
          <p className="text-gray-400 mt-1">Digital Repository of Achievements & Activity Points</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="bg-amber-600 hover:bg-amber-700 text-white font-black uppercase text-[10px] tracking-widest px-6 h-10 shadow-lg">
              <Plus className="w-4 h-4 mr-2" /> Log Achievement
           </Button>
           <Badge className="bg-amber-600/20 text-amber-400 border border-amber-500/20 px-4 py-1 uppercase font-black text-[9px]">Verified Records</Badge>
        </div>
      </div>

      {/* POINTS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10 p-6 space-y-2 border-b-4 border-b-indigo-500">
              <div className="flex justify-between items-start">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <Badge variant="outline" className="text-[8px] font-black uppercase border-indigo-500/20 text-indigo-400">Target: 40</Badge>
              </div>
              <div>
                  <p className="text-3xl font-black text-white italic">{totalCoCurr}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Co-Curricular Points</p>
              </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6 space-y-2 border-b-4 border-b-rose-500">
              <div className="flex justify-between items-start">
                  <Dribbble className="w-5 h-5 text-rose-400" />
                  <Badge variant="outline" className="text-[8px] font-black uppercase border-rose-500/20 text-rose-400">Target: 20</Badge>
              </div>
              <div>
                  <p className="text-3xl font-black text-white italic">{totalEXC}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Extra-Curricular (EXC)</p>
              </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6 space-y-2 border-b-4 border-b-emerald-500">
              <div className="flex justify-between items-start">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <Badge className="bg-emerald-600/20 text-emerald-400 text-[8px] font-black uppercase border-emerald-500/20">Active</Badge>
              </div>
              <div>
                  <p className="text-3xl font-black text-white italic">{achievements.length}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Global Achievements</p>
              </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6 space-y-2 border-b-4 border-b-amber-500">
              <div className="flex justify-between items-start">
                  <Star className="w-5 h-5 text-amber-400" />
                  <Badge className="bg-amber-600/20 text-amber-400 text-[8px] font-black uppercase border-amber-500/20">Level 8</Badge>
              </div>
              <div>
                  <p className="text-3xl font-black text-white italic">Elite</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Achievement Tier</p>
              </div>
          </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACHIEVEMENT LEDGER */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-amber-500" />
                        <div>
                            <CardTitle className="text-white text-lg">Verified Achievement Ledger</CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold text-gray-500">Official records used for placement eligibility</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {achievements.length > 0 ? achievements.map((ach) => (
                            <div key={ach.id} className="p-6 hover:bg-white/[0.02] transition-colors group cursor-pointer flex items-center justify-between">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-amber-600/20 group-hover:text-amber-400 transition-all">
                                        {ach.category === 'TECHNICAL' ? <Terminal className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-white font-bold text-md tracking-tight">{ach.title}</h4>
                                        <p className="text-[11px] text-gray-500 line-clamp-1">{ach.description}</p>
                                        <div className="flex items-center gap-3 pt-1">
                                            <p className="text-[9px] text-gray-600 uppercase font-bold">{new Date(ach.date).toLocaleDateString()}</p>
                                            <span className="text-gray-800">•</span>
                                            <Badge className={`text-[7px] uppercase font-black h-4 px-2 ${
                                                ach.status === 'VERIFIED' ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/20' : 
                                                ach.status === 'PENDING' ? 'bg-amber-600/10 text-amber-400 border-amber-500/20' : 
                                                'bg-rose-600/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                                {ach.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-all" />
                            </div>
                        )) : (
                           <div className="p-12 text-center text-gray-600 uppercase text-[10px] font-black">No achievements logged yet</div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-4">
                    <CardTitle className="text-white text-md flex items-center gap-2">
                        <Monitor className="w-5 h-5 text-indigo-400" /> Point Distribution Daily Log
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {activityPoints.map((p) => (
                            <div key={p.id} className="p-4 flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h5 className="text-white font-bold text-xs">{p.description}</h5>
                                    <p className="text-[9px] text-gray-600 uppercase font-black">{new Date(p.date).toLocaleDateString()} • {p.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-md text-emerald-400 font-black">+{p.points}</p>
                                    <p className="text-[8px] text-gray-700 uppercase font-black">Points Accrued</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* SIDEBAR: PROGRESS & ACTIONS */}
        <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
                <CardHeader>
                    <CardTitle className="text-white text-sm uppercase font-black tracking-widest">Global Benchmarks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                             <span>Co-Curricular (CC)</span>
                             <span className="text-white">62%</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 w-[62%]" />
                         </div>
                     </div>
                     <div className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] uppercase font-black text-gray-400">
                             <span>Extra-Curricular (EXC)</span>
                             <span className="text-white">75%</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-rose-500 w-[75%]" />
                         </div>
                     </div>
                     <div className="pt-4 border-t border-white/10">
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                             <Medal className="w-5 h-5 text-indigo-400" />
                             <div>
                                 <p className="text-white font-black text-[10px] uppercase italic">Top 5% of School</p>
                                 <p className="text-[9px] text-gray-500">Based on aggregate activity points.</p>
                             </div>
                         </div>
                     </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-white text-sm uppercase font-black tracking-widest">Quick Submission</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                         Upload Certificate <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1" />
                     </Button>
                     <Button variant="outline" className="w-full justify-between h-12 bg-white/5 border-white/10 text-white font-bold uppercase text-[9px] tracking-widest hover:bg-white hover:text-black transition-all group">
                         Request Points (Non-Listed) <Plus className="w-4 h-4" />
                     </Button>
                </CardContent>
            </Card>

            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 space-y-4">
                 <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/10 pb-4">Policies & Guidelines</h4>
                 <div className="space-y-3">
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[11px] text-gray-400 font-bold uppercase group-hover:text-white transition-colors">EXC Point Mapping Rules</p>
                         <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[11px] text-gray-400 font-bold uppercase group-hover:text-white transition-colors">Verification Deadlines</p>
                         <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[11px] text-gray-400 font-bold uppercase group-hover:text-white transition-colors">Honor Code (vAchieve)</p>
                         <ChevronRight className="w-3.5 h-3.5 text-gray-700" />
                     </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  )
}
