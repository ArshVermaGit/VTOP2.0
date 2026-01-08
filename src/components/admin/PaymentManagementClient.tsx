"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, Download, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Payment = {
  id: string
  amount: number
  status: string
  type: string
  referenceId: string | null
  createdAt: Date
  student: {
    regNo: string
    user: { name: string }
  }
}

export function PaymentManagementClient({ initialPayments }: { initialPayments: Payment[] }) {
  const [search, setSearch] = useState("")

  const filteredPayments = initialPayments.filter((p: Payment) => 
    p.referenceId?.toLowerCase().includes(search.toLowerCase()) ||
    p.student.regNo.toLowerCase().includes(search.toLowerCase()) ||
    p.student.user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
             <CreditCard className="w-8 h-8 text-amber-500" /> Financial Oversight
          </h1>
          <p className="text-gray-400 mt-1">Transaction monitoring and fee reconciliation engine</p>
        </div>
        <div className="flex items-center gap-3">
             <Button variant="outline" className="border-white/10 text-gray-400">
                <Download className="w-4 h-4 mr-2" /> Export Ledger
             </Button>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
         <CardHeader className="bg-black/40 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
               <CardTitle className="text-white text-lg">Transaction History</CardTitle>
               <CardDescription>Real-time audit of all university financial inflows</CardDescription>
            </div>
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Reference ID or Reg No..." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10 bg-black/20 border-white/5 text-white" 
                />
            </div>
         </CardHeader>
         <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
               <thead className="bg-black/20">
                  <tr>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Transaction Ref</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Payer Info</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Amount</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest">Payment Status</th>
                     <th className="p-4 text-[10px] text-gray-500 uppercase font-black tracking-widest text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredPayments.map((payment: Payment) => (
                    <tr key={payment.id} className="hover:bg-white/[0.02] transition-colors group">
                       <td className="p-4">
                            <p className="text-white font-mono text-xs">{payment.referenceId || payment.id.slice(0, 12)}</p>
                            <p className="text-[9px] text-gray-600">{new Date(payment.createdAt).toLocaleString()}</p>
                       </td>
                       <td className="p-4">
                            <p className="text-white font-bold text-sm">{payment.student.user.name}</p>
                            <p className="text-[10px] text-amber-500 font-black uppercase">{payment.student.regNo}</p>
                       </td>
                       <td className="p-4">
                            <p className="text-white font-black">₹{payment.amount.toLocaleString()}</p>
                            <p className="text-[10px] text-gray-500">{payment.type}</p>
                       </td>
                       <td className="p-4">
                            <Badge className={
                                payment.status === 'SUCCESS' ? 'bg-emerald-600/10 text-emerald-400' : 
                                payment.status === 'PENDING' ? 'bg-amber-600/10 text-amber-400' : 
                                'bg-rose-600/10 text-rose-400'
                            }>
                                {payment.status}
                            </Badge>
                       </td>
                       <td className="p-4 text-right">
                           <Button size="icon" variant="ghost" className="text-gray-500 hover:text-white">
                                <ExternalLink className="w-4 h-4" />
                           </Button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </CardContent>
      </Card>
    </div>
  )
}

// function StatCard used if needed...
