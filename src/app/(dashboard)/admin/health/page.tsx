import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, CircuitBoard, Gauge, Server, Thermometer } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <Activity className="w-8 h-8 text-rose-500" /> System Vitality
            </h1>
            <p className="text-gray-400 mt-1">Real-time infrastructure health monitoring</p>
         </div>
         <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1">ALL SYSTEMS OPERATIONAL</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <HealthMetric label="CPU Usage" value="24%" sub="12 Cores Active" icon={Cpu} color="blue" />
         <HealthMetric label="Memory " value="12.4 GB" sub="of 64 GB Total" icon={CircuitBoard} color="purple" />
         <HealthMetric label="System Load" value="0.42" sub="15m Avg" icon={Gauge} color="amber" />
         <HealthMetric label="Uptime" value="12d 4h" sub="Since last patch" icon={Server} color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="bg-white/5 border-white/10 lg:col-span-2">
            <CardHeader>
               <CardTitle className="text-white">Resource Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <ResourceRow label="Application Server (Next.js)" usage={35} color="bg-blue-500" />
                <ResourceRow label="Database Engine (Postgres)" usage={62} color="bg-emerald-500" />
                <ResourceRow label="Cache Layer (Redis)" usage={12} color="bg-rose-500" />
                <ResourceRow label="Job Queue Worker" usage={45} color="bg-amber-500" />
            </CardContent>
         </Card>

         <Card className="bg-white/5 border-white/10">
            <CardHeader>
               <CardTitle className="text-white">Thermal Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent rotate-45" />
                  <div className="text-center">
                      <Thermometer className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                      <p className="text-3xl font-bold text-white">42°C</p>
                      <p className="text-xs text-gray-500 font-bold uppercase">Optimal</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 w-full mt-8">
                   <div className="text-center p-3 bg-black/20 rounded-xl">
                       <p className="text-xs text-gray-500">Zone A</p>
                       <p className="text-white font-mono">41°C</p>
                   </div>
                   <div className="text-center p-3 bg-black/20 rounded-xl">
                       <p className="text-xs text-gray-500">Zone B</p>
                       <p className="text-white font-mono">43°C</p>
                   </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  )
}

function HealthMetric({ label, value, sub, icon: Icon, color }: any) {
     const colorMap: any = {
        emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
        amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    }
    return (
        <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{label}</p>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-[10px] text-gray-600 font-mono">{sub}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function ResourceRow({ label, usage, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs">
                <span className="text-white font-medium">{label}</span>
                <span className="text-gray-400 font-mono">{usage}%</span>
            </div>
            <Progress value={usage} className={`h-2 bg-white/5 [&>div]:${color}`} />
        </div>
    )
}
