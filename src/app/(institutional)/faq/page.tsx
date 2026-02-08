"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <UtilityTemplate 
      title="Frequently Asked Questions"
      subtitle="Quick answers to common questions about the portal."
      icon={<HelpCircle className="w-8 h-8" />}
      content={
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">How do I reset my password?</h3>
            <p>You can reset your password through the &apos;Troube signing in?&apos; link on the login board using your registered email.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Where can I see my attendance?</h3>
            <p>Attendance records are available in the Student Dashboard under the &apos;Attendance&apos; section.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Who can I contact for technical support?</h3>
            <p>Please reach out to the university IT Help Desk for any technical issues at support@university.edu.</p>
          </div>
        </div>
      }
    />
  )
}
