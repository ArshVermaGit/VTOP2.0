"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { History } from "lucide-react"

export default function ChangelogPage() {
  return (
    <UtilityTemplate 
      title="Changelog"
      subtitle="Tracking improvements and updates to the CampusHub portal."
      icon={<History className="w-8 h-8" />}
      content={
        <div className="space-y-12">
          <div className="border-l-4 border-blue-500 pl-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">v2.0.4 - Premium Infrastructure</h3>
            <p className="text-sm font-bold text-slate-400">February 8, 2026</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Complete redesign of the Login Experience</li>
              <li>New institutional "Institutional Portal" aesthetic</li>
              <li>Expanded footer and utility infrastructure</li>
              <li>Enhanced developer profile integration</li>
            </ul>
          </div>
          <div className="border-l-4 border-slate-200 pl-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-700">v2.0.0 - The Core Migration</h3>
            <p className="text-sm font-bold text-slate-400">January 2026</p>
            <p>Initial release of the Next.js driven campus portal.</p>
          </div>
        </div>
      }
    />
  )
}
