import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUp, ShieldCheck, AlertCircle, FileText, CheckCircle2, ChevronRight, GraduationCap, Gavel, Info, Lock } from "lucide-react"
import { getResearchProfile } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ThesisHubPage() {
  const profile = await getResearchProfile()
  if (!profile) return null

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             < GraduationCap className="w-8 h-8 text-blue-500" /> Electronic Thesis Portal
          </h1>
          <p className="text-gray-400 mt-1">Research Status: <span className="text-blue-400 font-bold uppercase">{profile.thesisStatus}</span></p>
        </div>
        <div className="flex items-center gap-3">
             <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-1 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" /> SECURE UPLOAD
             </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
                <h3 className="text-white font-black text-xs uppercase tracking-widest px-1">Active Submission Workflows</h3>
                
                {/* Synopsis Section */}
                <Card className="bg-white/5 border-white/10 overflow-hidden group hover:border-blue-500/30 transition-all">
                    <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                         <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                <FileText className="w-8 h-8" />
                         </div>
                         <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-white font-bold text-lg">Ph.D Synopsis Submission</h4>
                                    <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-black">OPEN</Badge>
                                </div>
                                <p className="text-xs text-gray-500 max-w-md leading-relaxed">Submit the research synopsis after the mandatory mid-term review and DRC approval. Must include Turnitin plagiarism report.</p>
                         </div>
                         <div className="flex items-center gap-4">
                               <Button className="bg-blue-600 hover:bg-blue-700 text-white uppercase text-[10px] font-black tracking-widest px-8 shadow-lg">
                                    Upload Synopsis
                               </Button>
                         </div>
                    </div>
                </Card>

                {/* Main Thesis Section */}
                <Card className="bg-white/5 border-white/10 overflow-hidden group relative">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="flex flex-col items-center text-center space-y-4 max-w-xs">
                             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                                 <Lock className="w-6 h-6" />
                             </div>
                             <p className="text-[10px] text-white font-bold uppercase tracking-widest">Locked: Synopsis Approval Required</p>
                         </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center p-6 gap-6 grayscale group-hover:grayscale-0 transition-all opacity-40">
                         <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                <GraduationCap className="w-8 h-8" />
                         </div>
                         <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-white font-bold text-lg">Final Doctoral Dissertation</h4>
                                    <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] uppercase font-black">LOCKED</Badge>
                                </div>
                                <p className="text-xs text-gray-500 max-w-md leading-relaxed">Final thesis submission for external examiners. Requires prior synopsis approval and public defense completion.</p>
                         </div>
                         <div className="flex items-center gap-4">
                               <Button disabled className="bg-white/10 text-gray-500 uppercase text-[10px] font-black tracking-widest px-8">
                                    Submit Thesis
                               </Button>
                         </div>
                    </div>
                </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white text-md">General Document Upload</CardTitle>
                    <CardDescription className="text-xs">Upload non-confidential research artifacts, workshop certificates, or fieldwork logs</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 hover:border-blue-500/30 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <FileUp className="w-8 h-8" />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-white font-bold text-sm">Release to Supervisor</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Supports PDF, DOCX, ZIP (Max 50MB)</p>
                        </div>
                     </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
             <Card className="bg-amber-600/5 border-amber-500/10 shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-white text-md flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-500" /> Plagiarism Policy
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                            <p className="text-[11px] text-gray-400 leading-tight">Similarity index must be <span className="text-emerald-400 font-bold">below 10%</span> excluding bibliography.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                            <p className="text-[11px] text-gray-400 leading-tight">Turnitin similarity report is mandatory for all major submissions.</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full text-gray-500 hover:text-white uppercase text-[10px] font-black tracking-widest">
                         Submission Rules <ChevronRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-blue-600/5 border border-blue-500/10 space-y-4">
                <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-bold text-sm uppercase">Help Center</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Having trouble with the digital upload? Contact the University Library Dissertation Cell for assistance with electronic formatting.</p>
            </div>
        </div>
      </div>
    </div>
  )
}
