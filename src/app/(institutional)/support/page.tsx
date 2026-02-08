"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { HelpCircle, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <UtilityTemplate 
      title="Support Center"
      subtitle="Resources and help for your academic journey."
      icon={<HelpCircle className="w-8 h-8" />}
      content={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-slate-900">Email Support</h3>
              <p className="text-sm text-slate-500">Response within 24 hours.</p>
              <Button variant="link" className="p-0 h-auto text-blue-600 font-bold">support@university.edu</Button>
            </div>
          </div>
        </div>
      }
    />
  )
}
