import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ParentWithDetails } from "@/types"

interface WardInfoRowProps {
  label: string;
  value: string;
}

function WardInfoRow({ label, value }: WardInfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[8px] text-gray-600 uppercase font-black tracking-wider leading-none">{label}</p>
      <p className="text-[11px] text-gray-300 font-bold uppercase leading-tight truncate">{value}</p>
    </div>
  )
}

export function WardOverview({ student }: { student: NonNullable<ParentWithDetails['student']> }) {
  return (
    <Card className="bg-gradient-to-br from-[#121214] to-[#0A0A0B] border-white/10 overflow-hidden shadow-2xl">
      <div className="h-24 bg-indigo-600/20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl" />
      </div>
      <div className="p-6 -mt-16 relative">
        <div className="w-20 h-20 rounded-3xl bg-indigo-900 border-4 border-black flex items-center justify-center text-white mb-4 shadow-2xl overflow-hidden relative">
          {student.photoUrl ? (
            <Image 
              src={student.photoUrl} 
              alt={student.user.name} 
              width={80} 
              height={80} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <User className="w-8 h-8" />
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-black text-xl tracking-tight uppercase italic">{student.user.name}</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">{student.regNo} • {student.program}</p>
        </div>

        <div className="mt-8 space-y-4">
          <WardInfoRow label="School" value={student.school} />
          <WardInfoRow label="Proctor" value={student.proctor?.user?.name || 'Assigned Soon'} />
          <WardInfoRow label="Hostel" value={`${student.hostelBlock || 'N/A'} - ${student.hostelRoom || 'N/A'}`} />
          <WardInfoRow label="Batch" value={student.batch || 'N/A'} />
        </div>

        <Link href="/parent/ward-details">
          <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest h-12 shadow-xl shadow-indigo-600/20 transition-all rounded-xl">
            Full Ward Audit <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
