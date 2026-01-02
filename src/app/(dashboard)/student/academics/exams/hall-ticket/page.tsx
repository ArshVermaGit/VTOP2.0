import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Download, Printer, QrCode, User, FileCheck, AlertCircle, Calendar } from "lucide-react"
import { getHallTicketEligibility, getStudentProfile, getExamSchedules } from "@/lib/actions"
import { format } from "date-fns"

export default async function HallTicketPage() {
  const [eligibility, profile, schedules] = await Promise.all([
    getHallTicketEligibility(),
    getStudentProfile(),
    getExamSchedules()
  ])

  // Only show FAT and CAT exams in Hall Ticket
  const eligibleExams = schedules.filter(s => s.type === 'CAT-1' || s.type === 'CAT-2' || s.type === 'FAT')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <ShieldCheck className="w-8 h-8 text-indigo-500" /> Digital Hall Ticket
          </h1>
          <p className="text-gray-400 mt-1">Winter Semester 2025-26 • Official Examination Credential</p>
        </div>
        <div className="flex items-center gap-3">
             <Button variant="outline" className="border-white/10 text-gray-400 hover:text-white h-10 px-6 uppercase text-[10px] font-black tracking-widest">
                <Printer className="w-4 h-4 mr-2" /> Print PDF
             </Button>
             <Badge className={eligibility.eligible ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-4 py-1" : "bg-rose-600/20 text-rose-400 border border-rose-500/20 px-4 py-1"}>
                {eligibility.eligible ? "ELIGIBLE" : "LOCKED"}
             </Badge>
        </div>
      </div>

      {!eligibility.eligible ? (
        <Card className="bg-rose-600/5 border-rose-500/10 overflow-hidden shadow-2xl">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600/20 flex items-center justify-center text-rose-500">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                    <CardTitle className="text-white text-lg">Download Blocked</CardTitle>
                    <CardDescription className="text-rose-400 font-bold uppercase text-[10px]">Policy Violation Detected</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                    Access to the digital hall ticket has been restricted due to <span className="text-white font-bold">{eligibility.blockers?.join(', ') || 'policy violations'}</span>.
                </p>
                {eligibility.blockers && eligibility.blockers.length > 0 && (
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                        <p className="text-[10px] text-gray-500 uppercase font-black">Compliance Issues</p>
                        <div className="flex flex-wrap gap-2">
                            {eligibility.blockers.map((item: string, i: number) => (
                                <Badge key={i} variant="outline" className="border-rose-500/30 text-rose-400 text-[9px]">{item}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                <p className="text-[10px] text-gray-600 italic">Please resolve these issues at the Dean's office (Room AB2-104) to unlock your credentials.</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 rounded-3xl bg-white border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* watermark background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <h2 className="text-[100px] font-black uppercase rotate-[-15deg] whitespace-nowrap">VIT OFFICIAL CREDENTIAL</h2>
            </div>

            <div className="lg:col-span-1 space-y-6 relative z-10 border-r border-gray-100 pr-8">
                <div className="space-y-4">
                    <div className="w-32 h-32 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden mx-auto">
                        <img src={profile?.photoUrl || ""} alt="Student" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-1">
                        <h2 className="text-gray-900 font-black text-xl uppercase tracking-tight">{profile?.user.name}</h2>
                        <p className="text-indigo-600 font-bold text-sm">{profile?.regNo}</p>
                        <Badge className="bg-indigo-600 text-white border-none text-[10px] font-black uppercase px-4">{profile?.program.split(' ')[0]}</Badge>
                    </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Auth Token</span>
                        <span className="text-[10px] text-gray-900 font-bold uppercase tracking-widest">HT-2025-01-A2</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center gap-4">
                        <QrCode className="w-32 h-32 text-gray-900" />
                        <p className="text-[9px] text-gray-400 text-center leading-tight">Scan for real-time verification at exam gate</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2 relative z-10 space-y-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-gray-900 font-black text-lg uppercase tracking-tight">Assessment Schedule</h3>
                        <p className="text-gray-400 text-xs">Student is permitted to appear for the following sessions</p>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <FileCheck className="w-5 h-5" />
                    </div>
                </div>

                <div className="space-y-3">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-900">
                                <th className="py-3 text-[10px] text-gray-900 uppercase font-black tracking-widest">Date / Slot</th>
                                <th className="py-3 text-[10px] text-gray-900 uppercase font-black tracking-widest">Course Detail</th>
                                <th className="py-3 text-[10px] text-gray-900 uppercase font-black tracking-widest text-right">Venue</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {eligibleExams.map((exam: any) => (
                                <tr key={exam.id}>
                                    <td className="py-4">
                                        <p className="text-gray-900 font-black text-sm">{format(new Date(exam.examDate), 'dd MMM yyyy')}</p>
                                        <p className="text-indigo-600 font-bold text-[10px] uppercase">{exam.slot}</p>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-gray-900 font-bold text-xs">{exam.courseTitle}</p>
                                        <Badge variant="outline" className="border-gray-200 text-gray-400 text-[9px] font-bold p-0 border-none">{exam.courseCode} • {exam.type}</Badge>
                                    </td>
                                    <td className="py-4 text-right">
                                        <p className="text-gray-900 font-black text-sm">{exam.venue}</p>
                                        <p className="text-[9px] text-gray-400 uppercase font-bold">Main Campus</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-end">
                    <div className="space-y-4 max-w-sm">
                        <div className="space-y-1">
                            <h4 className="text-gray-900 font-black text-xs uppercase">Important Instructions</h4>
                            <p className="text-[10px] text-gray-400 leading-relaxed italic">The candidate must reach the exam hall at least 30 minutes before the commencement of the exam. Bringing any electronic gadgets including mobile phones, smartwatches is strictly prohibited.</p>
                        </div>
                    </div>
                    <div className="text-right space-y-1">
                         <div className="w-32 h-12 border-b-2 border-gray-100 mx-auto mb-2 opacity-20">
                             {/* Signature placeholder */}
                         </div>
                         <p className="text-[10px] text-gray-900 font-black uppercase">Controller of Examinations</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}
