import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Download, 
  FileText, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Info
} from "lucide-react"
import { getFacultyAdminData } from "@/lib/actions"
import { Button } from "@/components/ui/button"

export default async function FacultyPayroll() {
  const faculty = await getFacultyAdminData()
  if (!faculty) return <div className="p-10 text-white">Unauthorized.</div>

  const payrolls = faculty.payrolls || []
  const latest = payrolls[0]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Institutional Payroll</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Compensation, Allowances & Tax Ledger</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge className="bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 uppercase font-black text-[9px]">FY 2025-26 Active</Badge>
           <Button variant="outline" className="bg-white/5 border-white/10 text-white font-black uppercase text-[10px] tracking-widest px-6 h-12 rounded-2xl">
              <Download className="w-4 h-4 mr-2" /> Annual Statement
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            {/* LATEST SALARY CARD */}
            <Card className="bg-gradient-to-br from-indigo-600 to-purple-800 border-none overflow-hidden relative group shadow-2xl p-1">
                 <div className="bg-[#0A0A0B]/90 rounded-3xl p-8 backdrop-blur-3xl relative z-10">
                     <div className="flex items-center justify-between mb-8">
                         <div className="space-y-1">
                             <p className="text-[10px] text-gray-500 uppercase font-black leading-none">Net Payable ({latest?.month} {latest?.year})</p>
                             <h4 className="text-5xl font-black text-white italic tracking-tighter">₹{(latest?.netPay || 0).toLocaleString()}</h4>
                         </div>
                         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                             <TrendingUp className="w-8 h-8" />
                         </div>
                     </div>
                     
                     <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                         <DetailItem label="Base Component" value={`₹${(latest?.basePay || 0).toLocaleString()}`} />
                         <DetailItem label="Total Allowances" value={`₹${(latest?.allowances || 0).toLocaleString()}`} color="text-emerald-400" />
                         <DetailItem label="Statutory Deductions" value={`- ₹${(latest?.deductions || 0).toLocaleString()}`} color="text-rose-400" />
                     </div>

                     <div className="mt-8 flex items-center gap-4">
                        <Button className="flex-1 bg-white text-black hover:bg-indigo-400 transition-all font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">
                            Download Pay-slip (.PDF)
                        </Button>
                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white hover:text-black transition-all font-black uppercase text-[10px] tracking-widest h-12 rounded-xl px-8">
                            Audit Details
                        </Button>
                     </div>
                 </div>
            </Card>

            {/* PAYROLL HISTORY */}
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden shadow-2xl mt-8">
                <CardHeader className="bg-black/40 border-b border-white/5 py-4">
                    <CardTitle className="text-white text-sm uppercase font-black italic tracking-widest flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" /> Remuneration History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-white/5">
                        {payrolls.map((p, i) => (
                            <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-all group cursor-pointer">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-indigo-400 transition-colors">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-white font-black text-sm uppercase italic tracking-tight">{p.month} {p.year}</p>
                                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Status: {p.status}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-md font-black text-white italic">₹{(p.netPay / 1000).toFixed(1)}k</p>
                                        <p className="text-[9px] text-gray-700 font-black uppercase tracking-tight">Disbursed</p>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-gray-800 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
         </div>

         {/* SIDEBAR: TAX & ADMIN */}
         <div className="space-y-8">
            <Card className="bg-[#0A0A0B] border-white/10 overflow-hidden">
                <CardHeader className="bg-black/10 border-b border-white/5">
                    <CardTitle className="text-white text-xs uppercase font-black italic tracking-widest">Tax & Compliance</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                     <ComplianceCard label="Form 16 (Current)" status="AVAILABLE" />
                     <ComplianceCard label="TDS Declarations" status="VERIFIED" />
                     <ComplianceCard label="Investments (80C)" status="SUBMITTED" />
                </CardContent>
            </Card>

            <div className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/10 space-y-4">
                 <ShieldCheck className="w-10 h-10 mx-auto text-indigo-500/20" />
                 <div className="text-center space-y-1">
                    <p className="text-white font-black text-xs uppercase italic tracking-tighter leading-none">Safe-Pay Audit</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tight">Financial data is encrypted end-to-end</p>
                 </div>
                 <Button variant="ghost" className="w-full text-[9px] text-indigo-400 font-black uppercase hover:bg-white/5 h-8">View Security Certificate</Button>
            </div>

            <Card className="bg-white/5 border-white/10 p-6 space-y-4">
                 <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 italic">Payroll Support</h4>
                 <div className="space-y-3">
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[10px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">Raise Query</p>
                         <ChevronRight className="w-3 h-3 text-gray-800" />
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[10px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">Bank Details Update</p>
                         <ChevronRight className="w-3 h-3 text-gray-800" />
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                         <p className="text-[10px] text-gray-500 font-bold uppercase group-hover:text-white transition-colors">PF Statement</p>
                         <ChevronRight className="w-3 h-3 text-gray-800" />
                     </div>
                 </div>
            </Card>
         </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value, color = "text-white" }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[8px] text-gray-600 uppercase font-black tracking-widest leading-none">{label}</p>
            <p className={`text-xl font-black italic tracking-tighter ${color}`}>{value}</p>
        </div>
    )
}

function ComplianceCard({ label, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all cursor-default">
             <div className="space-y-0.5">
                <p className="text-[10px] text-gray-300 font-black uppercase italic leading-none">{label}</p>
                <p className="text-[8px] text-emerald-500/50 font-bold uppercase tracking-widest">{status}</p>
             </div>
             <FileText className="w-4 h-4 text-gray-800 group-hover:text-indigo-400 transition-colors" />
        </div>
    )
}
