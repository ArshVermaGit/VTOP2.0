"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { createLeaveRequest } from "@/lib/actions"
import { useRouter } from "next/navigation"

export default function GeneralLeavePage() {
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromDate || !toDate || !reason) {
        toast.error("Please fill all fields")
        return
    }

    setLoading(true)
    try {
        await createLeaveRequest({ 
            type: "GENERAL", // Hardcoded for general page
            fromDate, 
            toDate, 
            reason 
        })
        toast.success("Leave request submitted successfully!")
        router.push("/student/leaves/hub") // Redirect to hub
    } catch (error) {
        toast.error("Failed to submit request")
    } finally {
         setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">General Leave Application</h1>
        <p className="text-gray-400">Apply for leave for personal reasons, medical issues, or events.</p>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle>Leave Details</CardTitle>
          <CardDescription>Fill out the form below to request leave.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>From Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal bg-black/20 border-white/10",
                            !fromDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={fromDate}
                            onSelect={setFromDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>To Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal bg-black/20 border-white/10",
                            !toDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={toDate}
                            onSelect={setToDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
             </div>
             
             <div className="space-y-2">
                <Label>Reason for Leave</Label>
                <Textarea 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please explain why you need to take leave..." 
                    className="min-h-[100px] bg-black/20 border-white/10"
                />
             </div>

             <div className="space-y-2">
                <Label>Emergency Contact During Leave</Label>
                <Input placeholder="+91 98765 43210" className="bg-black/20 border-white/10" />
             </div>

             <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Submitting..." : "Submit Request"}
             </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
