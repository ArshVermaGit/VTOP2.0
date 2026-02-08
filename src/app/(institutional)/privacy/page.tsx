"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { ShieldCheck } from "lucide-react"

export default function PrivacyPage() {
  return (
    <UtilityTemplate 
      title="Privacy Policy"
      subtitle="How we handle and protect your institutional data."
      icon={<ShieldCheck className="w-8 h-8" />}
      content={
        <>
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use the CampusHub University portal.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Data Collection</h2>
          <p>
            We collect information strictly necessary for academic and administrative functions, including registration details, academic records, and attendance logs.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Data Security</h2>
          <p>
            We use industry-standard encryption and security protocols to ensure your sensitive academic and personal data remains protected against unauthorized access.
          </p>
        </>
      }
    />
  )
}
