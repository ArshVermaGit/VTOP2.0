import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Coffee, Utensils, Star, Info, RefreshCw, ChevronRight, Clock, MapPin, Search } from "lucide-react"
import { getMessMenus } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default async function MessServicesPage() {
  const menus = await getMessMenus()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <Utensils className="w-8 h-8 text-rose-500" /> Dining & Mess Services
          </h1>
          <p className="text-gray-400 mt-1">Special Mess • Block-L Annex • Winter Semester 2025</p>
        </div>
        <div className="flex items-center gap-3">
             <Button className="bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase text-[10px] tracking-widest px-6 h-10 shadow-lg">
                <RefreshCw className="w-4 h-4 mr-2" /> Change Mess
             </Button>
             <Badge className="bg-rose-600/20 text-rose-400 border border-rose-500/20 px-4 py-1">PREMIUM DINING</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                      <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight">Today's Schedule</h4>
              </div>
              <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 uppercase font-black">Breakfast</span>
                      <span className="text-white font-bold">07:00 - 09:00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 uppercase font-black">Lunch</span>
                      <span className="text-white font-bold">12:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 uppercase font-black">Dinner</span>
                      <span className="text-white font-bold">07:30 - 09:30</span>
                  </div>
              </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Star className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight">Chef's Special</h4>
              </div>
              <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-500/20">
                  <p className="text-white font-bold text-sm">Paneer Pasanda with Garlic Naan</p>
                  <p className="text-[10px] text-blue-400 uppercase font-black mt-1">Available at Dinner</p>
              </div>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6 space-y-4">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Info className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-tight">Mess Rebate</h4>
              </div>
              <p className="text-xs text-gray-500 leading-snug">Applied for holiday periods between Dec 20-30. Approved amount: <span className="text-emerald-400 font-bold">₹1,250</span></p>
          </Card>
      </div>

      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <Table>
            <TableHeader className="bg-white/[0.02]">
                <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[9px] text-gray-500 uppercase font-black px-6">Day</TableHead>
                    <TableHead className="text-[9px] text-gray-500 uppercase font-black">Breakfast</TableHead>
                    <TableHead className="text-[9px] text-gray-500 uppercase font-black">Lunch</TableHead>
                    <TableHead className="text-[9px] text-gray-500 uppercase font-black">Snacks</TableHead>
                    <TableHead className="text-[9px] text-gray-500 uppercase font-black pr-6">Dinner</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {menus.map((m) => (
                    <TableRow key={m.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <TableCell className="px-6 py-4">
                            <span className="text-white font-black text-xs uppercase tracking-tighter">{m.day}</span>
                        </TableCell>
                        <TableCell className="text-xs text-gray-400 max-w-[150px]">{m.breakfast}</TableCell>
                        <TableCell className="text-xs text-gray-400 max-w-[200px]">{m.lunch}</TableCell>
                        <TableCell className="text-xs text-gray-400 max-w-[150px]">{m.snacks}</TableCell>
                        <TableCell className="text-xs text-gray-300 font-medium max-w-[200px] pr-6">{m.dinner}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
              <CardHeader pb-3>
                  <CardTitle className="text-white text-md">Meal Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                   <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                        <span className="text-gray-500 font-bold uppercase">Plan Type</span>
                        <span className="text-white font-black">ANNUAL PREMIUM</span>
                   </div>
                   <div className="flex justify-between items-center text-xs py-2 border-b border-white/5">
                        <span className="text-gray-500 font-bold uppercase">Valid Until</span>
                        <span className="text-white font-black">MAY 2026</span>
                   </div>
                   <Button variant="outline" className="w-full border-white/10 text-rose-400 hover:bg-rose-500/10 text-[10px] uppercase font-black tracking-widest h-10">
                        Mess Feedback & Complaint
                   </Button>
              </CardContent>
          </Card>
          <div className="p-8 rounded-3xl bg-rose-600/5 border border-rose-500/10 flex items-start gap-4">
               <div className="w-12 h-12 rounded-2xl bg-rose-600/20 flex items-center justify-center text-rose-400">
                    <Coffee className="w-6 h-6" />
               </div>
               <div className="space-y-1">
                    <h4 className="text-white font-bold text-lg">Night Canteen</h4>
                    <p className="text-xs text-gray-400 max-w-sm">Block-L Annex night canteen is operational from <span className="text-rose-400 font-bold">10:00 PM - 02:30 AM</span>. Order via VTOP Mobile for delivery to your room.</p>
                    <Button variant="link" className="p-0 text-rose-400 text-[10px] font-black uppercase tracking-widest mt-2">
                        View Night Menu <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
               </div>
          </div>
      </div>
    </div>
  )
}
