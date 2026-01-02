"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Key, 
  History, 
  AlertTriangle,
  Fingerprint,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Monitor,
  Smartphone as PhoneIcon,
  ChevronRight,
  ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { getSecurityStatus, toggle2FA } from "@/lib/actions"

export default function SecurityMatrixPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getSecurityStatus()
      setStatus(data)
      setLoading(false)
    }
    load()
  }, [])

  const handle2FAToggle = async (checked: boolean) => {
    const res = await toggle2FA(checked)
    if (res) {
        const newData = await getSecurityStatus()
        setStatus(newData)
    }
  }

  if (loading) return <div className="p-10 text-center text-[10px] text-gray-500 font-black uppercase tracking-widest animate-pulse">Initializing Security Matrix...</div>

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <Badge className="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Zero-Trust Environment</Badge>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
              Security <span className="text-indigo-500">Matrix</span>
           </h1>
           <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-none mt-1">
             Protect your identity, credentials and institutional access
           </p>
        </div>
        <div className="bg-[#0A0A0B] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest leading-none">Global Status</p>
                <p className="text-[11px] text-emerald-400 font-black uppercase">Standard Protection Active</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* AUTHENTICATION LAYERS */}
         <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl shadow-2xl">
                <CardHeader className="bg-black/40 border-b border-white/5 py-6">
                    <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-indigo-500" />
                        <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">Multi-Factor Authentication</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="flex items-start justify-between gap-8">
                        <div className="space-y-2 flex-1">
                            <h4 className="text-white font-black text-sm uppercase italic">Authenticator App (TOTP)</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-bold">
                                Use an app like Google Authenticator or Authy to generate secure, time-based codes for every login attempt.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <Badge className={`bg-white/5 border border-white/10 text-[8px] font-black uppercase px-2 py-1 ${status?.twoFactorEnabled ? 'text-emerald-400 border-emerald-500/20' : 'text-gray-500'}`}>
                                    {status?.twoFactorEnabled ? 'Enabled & Synced' : 'Disabled'}
                                </Badge>
                                {status?.twoFactorEnabled && (
                                    <p className="text-[9px] text-gray-700 font-black uppercase tracking-tight">Setup on Jan 02, 2026</p>
                                )}
                            </div>
                        </div>
                        <Switch 
                            checked={status?.twoFactorEnabled} 
                            onCheckedChange={handle2FAToggle}
                        />
                    </div>

                    {status?.twoFactorEnabled && (
                        <div className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 space-y-4">
                            <div className="flex items-center justify-between">
                                <h5 className="text-[10px] text-white font-black uppercase tracking-widest italic">Emergency Backup Codes</h5>
                                <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase text-indigo-400 hover:text-white transition-all">Regenerate</Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {JSON.parse(status?.backupCodes || '[]').map((code: string, i: number) => (
                                    <div key={i} className="bg-black/40 border border-white/5 p-3 rounded-lg text-center font-mono text-[11px] text-gray-400 font-bold hover:text-white transition-colors cursor-default">
                                        {code}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[8px] text-rose-400/50 uppercase font-black text-center pt-2 italic tracking-widest">CRITICAL: Save these codes in a secure, offline location.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden">
                <CardHeader className="bg-black/40 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Lock className="text-amber-400 w-5 h-5" />
                        <CardTitle className="text-white text-md uppercase font-black italic">Credential Management</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-6">
                        <div className="space-y-1">
                            <p className="text-white font-black text-sm uppercase italic group-hover:text-indigo-400 transition-colors">Change Account Password</p>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight leading-none">Last rotated 3 months ago</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-800" />
                    </div>
                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="space-y-1">
                            <p className="text-white font-black text-sm uppercase italic group-hover:text-amber-400 transition-colors">Security Information (Personal)</p>
                            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tight leading-none">Verification email, recovery mobile</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-800" />
                    </div>
                </CardContent>
            </Card>
         </div>

         {/* SECURITY AUDIT & DEVICES */}
         <div className="space-y-8">
            <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
                 <CardHeader className="bg-black/10 border-b border-white/5">
                     <CardTitle className="text-white text-xs uppercase font-black italic tracking-widest flex items-center gap-2">
                        <History className="w-4 h-4 text-blue-400" /> Access Audit Trail
                     </CardTitle>
                 </CardHeader>
                 <CardContent className="p-0">
                     <div className="divide-y divide-white/5">
                         {status?.securityAudits.map((audit: any) => (
                             <div key={audit.id} className="p-4 space-y-2 hover:bg-white/[0.01] transition-all group">
                                 <div className="flex items-center justify-between">
                                     <Badge className="bg-white/5 text-[7px] font-black uppercase border-white/10 px-1.5 h-4 italic">
                                         {audit.event.replace('_', ' ')}
                                     </Badge>
                                     <p className="text-[8px] text-gray-700 font-black uppercase">{new Date(audit.timestamp).toLocaleDateString()} • {new Date(audit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                 </div>
                                 <div className="flex items-center gap-2">
                                     {audit.device?.toLowerCase().includes('mac') ? <Monitor className="w-3 h-3 text-gray-600" /> : <PhoneIcon className="w-3 h-3 text-gray-600" />}
                                     <p className="text-[9px] text-gray-500 font-bold uppercase truncate max-w-[150px]">{audit.device}</p>
                                 </div>
                                 <div className="flex items-center gap-1">
                                     <Globe className="w-2.5 h-2.5 text-gray-800" />
                                     <p className="text-[8px] text-gray-700 font-black uppercase">{audit.ipAddress}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                     <Button variant="ghost" className="w-full h-12 text-[9px] text-gray-600 font-black uppercase hover:bg-white/5 tracking-widest border-t border-white/5">
                         View Complete Audit History
                     </Button>
                 </CardContent>
            </Card>

            <div className="p-8 rounded-[2rem] bg-rose-600/5 border border-rose-500/10 text-center space-y-4">
                 <ShieldAlert className="w-10 h-10 mx-auto text-rose-500/20" />
                 <div className="space-y-1">
                    <p className="text-[10px] text-rose-400 uppercase font-black leading-tight italic">Emergency Zone</p>
                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-tight">Restrict or terminate access sessions</p>
                 </div>
                 <div className="space-y-2">
                     <Button className="w-full bg-rose-600/10 text-rose-500 border border-rose-500/20 hover:bg-rose-600 hover:text-white font-black uppercase text-[9px] tracking-widest h-10 transition-all rounded-xl">
                        Terminate Other Sessions
                     </Button>
                     <p className="text-[7px] text-gray-800 uppercase font-black">Logged in on 3 other devices</p>
                 </div>
            </div>

            <Card className="bg-[#0A0A0B] border-white/5 p-6">
                <h4 className="text-white font-black text-xs uppercase tracking-widest border-b border-white/5 pb-4 mb-4 italic">Privacy Hub</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <p className="text-[10px] text-gray-400 font-black uppercase">Visible to Proctor</p>
                         <Switch checked />
                    </div>
                    <div className="flex items-center justify-between">
                         <p className="text-[10px] text-gray-400 font-black uppercase">Public Profile</p>
                         <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                         <p className="text-[10px] text-gray-400 font-black uppercase">Searchable by ID</p>
                         <Switch checked />
                    </div>
                </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
