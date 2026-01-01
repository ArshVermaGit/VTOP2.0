import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, Send, AlertCircle, FileText } from "lucide-react"
import { getLeaveRequests } from "@/lib/actions"

export default async function ScholarLeavePage() {
  const leaves = await getLeaveRequests()
  const scholarLeaves = leaves.filter(l => l.type === "Scholar")

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Scholar Leave</h1>
           <p className="text-gray-400 mt-1">Request leave for research conferences, field work or symposiums</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white/5 border-white/10 lg:col-span-2">
                <CardHeader>
                    <CardTitle className="text-white">Apply for Scholar Leave</CardTitle>
                    <CardDescription>All scholar leaves require approval from Proctor and Dean.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-gray-300">From Date</Label>
                            <Input type="date" className="bg-black/20 border-white/10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">To Date</Label>
                            <Input type="date" className="bg-black/20 border-white/10 text-white" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Reserch/Conference Details</Label>
                        <Input placeholder="International Conference on AI (ICAI 2024)" className="bg-black/20 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-300">Reason / Description</Label>
                        <Textarea placeholder="Presenting my paper on..." className="bg-black/20 border-white/10 min-h-[100px] text-white" />
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-400 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>Uploading a valid conference invitation or acceptance letter is mandatory for Scholar Leave approval.</p>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Send className="w-4 h-4 mr-2" /> Submit Application
                    </Button>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {scholarLeaves.length > 0 ? scholarLeaves.map((leave, i) => (
                            <div key={i} className="p-3 rounded-lg bg-black/20 border border-white/5 space-y-2">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-medium text-white">{leave.reason}</h4>
                                    <Badge className={leave.status === 'APPROVED' ? 'bg-green-600' : 'bg-amber-600'}>
                                        {leave.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                    <CalendarIcon className="w-3 h-3" />
                                    {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-8 text-gray-500 italic text-sm">No previous applications.</div>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-white/10">
                    <CardContent className="p-6 text-center">
                        <FileText className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <h3 className="text-white font-bold">Research Letters</h3>
                        <p className="text-xs text-gray-400 mt-2">Download official authorization letters for your approved research visits.</p>
                        <Button variant="outline" className="mt-4 border-blue-500/50 text-blue-400 hover:bg-blue-500/10 w-full">
                            View Letters
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
