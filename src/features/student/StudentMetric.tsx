import { Card, CardContent } from "@/components/ui/card"

interface StudentMetricProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'indigo' | 'emerald' | 'amber' | 'rose';
}

export function StudentMetric({ label, value, subtitle, icon, color }: StudentMetricProps) {
  const colorMap = {
     indigo: "text-blue-600 border-blue-200 bg-blue-50",
     emerald: "text-emerald-600 border-emerald-200 bg-emerald-50",
     amber: "text-amber-600 border-amber-200 bg-amber-50",
     rose: "text-rose-600 border-rose-200 bg-rose-50",
  }
  return (
    <Card className="bg-white border-slate-200 group hover:border-slate-300 transition-all shadow-lg overflow-hidden relative">
      <div className={`absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform ${colorMap[color].split(' ')[0]}`}>
        {icon}
      </div>
      <CardContent className="p-6 relative z-10 space-y-1">
        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{label}</p>
        <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{value}</p>
        <p className="text-[9px] text-slate-500 font-bold uppercase">{subtitle}</p>
        <div className="pt-4">
           <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full border ${colorMap[color]}`}>SYNCED</span>
        </div>
      </CardContent>
    </Card>
  )
}

