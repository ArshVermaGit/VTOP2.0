"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { ShieldAlert } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <UtilityTemplate 
      title="Disclaimer"
      subtitle="Important notes regarding information accuracy and use."
      icon={<ShieldAlert className="w-8 h-8" />}
      content={
        <>
          <p>
            The information provided on CampusHub is for general institutional purposes only.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Inforamtion Accuracy</h2>
          <p>
            While we strive for accuracy, the university does not warrant that all portal data is error-free or current at all times. Official university records take precedence.
          </p>
        </>
      }
    />
  )
}
