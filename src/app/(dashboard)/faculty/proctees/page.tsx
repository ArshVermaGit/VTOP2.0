import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Mail, ExternalLink, CheckCircle2, AlertTriangle } from "lucide-react"

export default async function ProcteeViewPage() {
  const proctees = [
    { name: "Arsh Verma", regNo: "21BCE1001", cgpa: 9.05, attendance: 88.8, status: "Good", pendingRequests: 1 },
    { name: "Rahul Kumar", regNo: "21BCE1002", cgpa: 8.42, attendance: 72.5, status: "Critical", pendingRequests: 0 },
    { name: "Sneha Reddy", regNo: "21BCE1003", cgpa: 7.85, attendance: 91.2, status: "Average", pendingRequests: 2 },
  ]

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div>
               <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                   <Users className="w-8 h-8 text-blue-400" /> Proctee Management
               </h1>
               <p className="text-gray-400 mt-1">Monitor and mentor your assigned students</p>
           </div>
           <div className="flex gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input placeholder="Search proctee..." className="pl-9 bg-white/5 border-white/10 text-white w-[250px]" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Message All</Button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-400">Total Proctees</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">42</div>
                </CardContent>
            </Card>
            <Card className="bg-rose-500/10 border-rose-500/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-rose-400">Low Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-rose-500">08</div>
                </CardContent>
            </Card>
            <Card className="bg-amber-500/10 border-amber-500/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-amber-400">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-amber-500">03</div>
                </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-blue-400">Meeting Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-500">02</div>
                </CardContent>
            </Card>
        </div>

        <Card className="bg-white/5 border-white/10">
            <CardHeader>
                <CardTitle className="text-white">Student Roster</CardTitle>
                <CardDescription>Click on student to view deep performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
                    <Table>
                        <TableHeader className="bg-white/5">
                            <TableRow className="border-white/10 hover:bg-transparent">
                                <TableHead className="text-gray-300">Name / Reg No</TableHead>
                                <TableHead className="text-gray-300">CGPA</TableHead>
                                <TableHead className="text-gray-300">Attendance</TableHead>
                                <TableHead className="text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-300 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {proctees.map((student, i) => (
                                <TableRow key={i} className="border-white/10 hover:bg-white/5 group transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium group-hover:text-blue-400 transition-colors uppercase">{student.name}</span>
                                            <span className="text-xs text-gray-500">{student.regNo}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-white font-bold">{student.cgpa}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 rounded-full bg-black/40 overflow-hidden">
                                                <div 
                                                    className={cn("h-full", student.attendance < 75 ? "bg-rose-500" : "bg-emerald-500")} 
                                                    style={{ width: `${student.attendance}%` }} 
                                                />
                                            </div>
                                            <span className={cn("text-xs font-medium", student.attendance < 75 ? "text-rose-400" : "text-emerald-400")}>
                                                {student.attendance}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "font-bold px-2 py-0 border",
                                            student.status === "Critical" ? "bg-rose-500/20 text-rose-500 border-rose-500/30" : 
                                            student.status === "Good" ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : 
                                            "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                        )}>
                                            {student.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 text-gray-500 group-hover:text-white transition-colors">
                                           <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400 h-8 w-8">
                                                <Mail className="w-4 h-4" />
                                           </Button>
                                           <Button variant="ghost" size="icon" className="hover:bg-emerald-500/10 hover:text-emerald-400 h-8 w-8">
                                                <CheckCircle2 className="w-4 h-4" />
                                           </Button>
                                           <Button variant="ghost" size="icon" className="hover:bg-white/10 h-8 w-8">
                                                <ExternalLink className="w-4 h-4" />
                                           </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
