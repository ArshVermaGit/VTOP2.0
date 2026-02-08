"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <UtilityTemplate 
      title="Terms of Service"
      subtitle="The rules and guidelines for using our digital campus."
      icon={<FileText className="w-8 h-8" />}
      content={
        <>
          <p>
            By accessing CampusHub, you agree to abide by the university&apos;s digital conduct policies.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">User Responsibilities</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their credentials and for all activities that occur under their account.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Prohibited Conduct</h2>
          <p>
            Unauthorized access, data mining, or any activity that disrupts the portal&apos;s institutional functions is strictly prohibited.
          </p>
        </>
      }
    />
  )
}
