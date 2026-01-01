"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertCircle, CheckCircle } from "lucide-react"

export default function AcademicServicesPage() {
  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Academic Services</h1>
           <p className="text-gray-400 mt-1">Course registration, SEM requests, and exam applications</p>
        </div>

        <Tabs defaultValue="registration" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 p-1 w-full justify-start flex-wrap h-auto">
                <TabsTrigger value="registration" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white min-w-[140px]">Course Registration</TabsTrigger>
                 <TabsTrigger value="sem" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white min-w-[140px]">SEM Request</TabsTrigger>
                <TabsTrigger value="exams" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white min-w-[140px]">Re-Exam / Arrear</TabsTrigger>
                <TabsTrigger value="review" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white min-w-[140px]">Paper Review</TabsTrigger>
            </TabsList>

            <TabsContent value="registration" className="mt-6 space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Winter Semester 2024-25</CardTitle>
                        <CardDescription>Course registration status and details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <div>
                                <h3 className="text-white font-medium">Registration Completed</h3>
                                <p className="text-xs text-gray-400">Registered for 24 credits on 12 Dec 2024</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">View Registered Courses</Button>
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">Modify Registration</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="sem" className="mt-6 space-y-6">
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">Semester Special Request (SEM)</CardTitle>
                        <CardDescription>Apply for special permissions like course withdrawals or additional credits.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label className="text-gray-300">Request Type</Label>
                             <Select>
                                <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="withdraw">Course Withdrawal</SelectItem>
                                    <SelectItem value="credits">Extra Credits</SelectItem>
                                    <SelectItem value="lab">Lab Slot Change</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-300">Justification</Label>
                            <Input placeholder="Reason for request..." className="bg-black/20 border-white/10 text-white" />
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">Submit Request</Button>
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="exams" className="mt-6 space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                             <CardTitle className="text-white">Arrear / ReFAT Application</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg bg-black/20 border border-white/5 text-center text-gray-400 text-sm">
                                No backlog courses eligible for Re-Exam.
                            </div>
                            <Button className="w-full bg-rose-600 hover:bg-rose-700" disabled>Apply for Re-Exam</Button>
                        </CardContent>
                    </Card>
                 </div>
            </TabsContent>

             <TabsContent value="review" className="mt-6 space-y-6">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                         <CardTitle className="text-white">Paper See / Review (FAT)</CardTitle>
                         <CardDescription>Apply to view answer scripts or request re-evaluation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label className="text-gray-300">Select Exam</Label>
                             <Select>
                                <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                    <SelectValue placeholder="Select Exam" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fat-fall-24">Fall Semester FAT 2024</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="space-y-2">
                             <Label className="text-gray-300">Select Course</Label>
                             <Select>
                                <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                    <SelectValue placeholder="Select Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cse3002">CSE3002 - Compiler Design</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <Button variant="outline" className="border-amber-500/50 text-amber-400 hover:bg-amber-500/10">Paper See (₹500)</Button>
                             <Button variant="outline" className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10">Re-Evaluation (₹1000)</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
