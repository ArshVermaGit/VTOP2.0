import { getClassesForAttendance } from "@/lib/actions"
import MarksEntryClient from "./MarksEntryClient"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

export default async function FacultyMarksPage() {
  const courses = await getClassesForAttendance()

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
           <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 uppercase font-black text-[9px] mb-2 tracking-widest">Academic Ledger v2.1</Badge>
           <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
              Marks <span className="text-indigo-500">Validation</span> Matrix
           </h1>
           <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-none mt-1">
             Secure Grade Posting Portal • Winter 2024-25
           </p>
        </div>
      </div>

      <MarksEntryClient courses={courses} />
    </div>
  )
}
