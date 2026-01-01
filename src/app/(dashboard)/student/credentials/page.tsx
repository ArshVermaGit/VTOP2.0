import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Download, ExternalLink, QrCode, CreditCard, Award } from "lucide-react"
import { getStudentProfile } from "@/lib/actions"

export default async function CredentialsPage() {
  const profile = await getStudentProfile()

  const docs = [
    { title: "University Identity Card", type: "ID_CARD", icon: CreditCard, color: "text-blue-400" },
    { title: "Bonafide Certificate", type: "CERTIFICATE", icon: ShieldCheck, color: "text-emerald-400" },
    { title: "Semester Grade Sheet", type: "MARK_SHEET", icon: Award, color: "text-purple-400" },
    { title: "Hostel Entry Pass", type: "PASS", icon: QrCode, color: "text-amber-400" },
  ]

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <ShieldCheck className="w-8 h-8 text-blue-500" /> Digital Credentials
           </h1>
           <p className="text-gray-400 mt-1">Access your verified academic documents and identity tokens</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {docs.map((doc, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                    <CardHeader className="pb-4">
                        <doc.icon className={`w-8 h-8 ${doc.color} mb-2`} />
                        <CardTitle className="text-sm text-white">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="flex-1 bg-white/5 hover:bg-blue-500/10 text-blue-400 h-8">
                                <Download className="w-3 h-3 mr-2" /> Download
                            </Button>
                            <Button size="sm" variant="ghost" className="bg-white/5 hover:bg-white/10 h-8">
                                <ExternalLink className="w-3 h-3" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-white">ABC Identity (Academic Bank of Credits)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-8 rounded-3xl bg-linear-to-br from-indigo-900/40 to-black border border-white/10 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Registration Number</p>
                                <p className="text-2xl font-bold text-white tracking-widest">{profile?.abcId || "ABC-123-456-789"}</p>
                                <p className="text-xs text-blue-400 mt-2 flex items-center gap-1 font-medium"> <ShieldCheck className="w-3 h-3" /> Verified by Digilocker</p>
                            </div>
                            <div className="p-4 bg-white rounded-2xl shadow-2xl shadow-indigo-500/20">
                                <QrCode className="w-24 h-24 text-black" />
                            </div>
                        </div>
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">Digital Signatures</CardTitle>
                    <CardDescription>Managed via university PKI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p className="text-xs text-gray-400 leading-relaxed">All documents downloaded from this portal are digitally signed by the Registrar, VIT University and are legally valid as per the IT Act.</p>
                     <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Last Sync</p>
                        <p className="text-sm text-white font-medium">31 Dec 2025, 10:45 AM</p>
                     </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
