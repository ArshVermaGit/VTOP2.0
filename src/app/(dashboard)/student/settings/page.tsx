"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Shield, Smartphone, Key, Download } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Security Settings</h1>
           <p className="text-gray-400 mt-1">Manage your password and 2FA backup codes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Lock className="w-5 h-5 text-rose-400" /> Change Password
                    </CardTitle>
                    <CardDescription>Ensure your account is secure by using a strong password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Current Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-black/20 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">New Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-black/20 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Confirm New Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-black/20 border-white/10 text-white" />
                    </div>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700">Update Password</Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                         <CardTitle className="text-white flex items-center gap-2">
                            <Shield className="w-5 h-5 text-emerald-400" /> Backup Codes
                         </CardTitle>
                         <CardDescription>Use these codes if you lose access to your 2FA device.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {["8920 1234", "5567 8901", "2345 6789", "1234 5678"].map((code, i) => (
                                <div key={i} className="font-mono text-center p-2 rounded bg-black/40 border border-white/5 text-gray-300 tracking-wider">
                                    {code}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                                <Download className="w-4 h-4 mr-2" /> Download
                            </Button>
                             <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
                                <Key className="w-4 h-4 mr-2" /> Generate New
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/20">
                     <CardHeader>
                         <CardTitle className="text-blue-400 flex items-center gap-2">
                            <Smartphone className="w-5 h-5" /> 2FA Status
                         </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex justify-between items-center">
                             <div className="text-white font-medium">Authentication App</div>
                             <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">Enabled</Badge>
                         </div>
                         <p className="text-xs text-gray-400 mt-2">To disable, please contact the Proctor.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
