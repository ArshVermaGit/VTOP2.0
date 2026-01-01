"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckSquare, Clock, FileText } from "lucide-react"

export default function AcknowledgementPage() {
  const acknowledgements = [
    { title: "Hostel Rules & Regulations 2024-25", date: "15 Aug 2024", status: "ACKNOWLEDGED" },
    { title: "Anti-Ragging Affidavit Submission", date: "12 Aug 2024", status: "ACKNOWLEDGED" },
    { title: "Placement Preference Form - 2025 Batch", date: "Due by 31 Dec 2024", status: "PENDING" },
  ]

  return (
    <div className="space-y-6">
       <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Acknowledgement View</h1>
           <p className="text-gray-400 mt-1">Review and acknowledge important university notifications</p>
        </div>

        <div className="space-y-4">
            {acknowledgements.map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4">
                        <div className="flex items-start gap-4">
                             <div className={`p-3 rounded-lg ${item.status === "ACKNOWLEDGED" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                                 <FileText className="w-6 h-6" />
                             </div>
                             <div>
                                 <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                                 <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                             </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant={item.status === "ACKNOWLEDGED" ? "secondary" : "destructive"} className={item.status === "ACKNOWLEDGED" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}>
                                {item.status}
                            </Badge>
                            {item.status === "PENDING" && (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                    <CheckSquare className="w-4 h-4 mr-2" /> Acknowledge
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  )
}
