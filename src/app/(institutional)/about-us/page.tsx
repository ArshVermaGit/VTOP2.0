"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Info, Users, Target } from "lucide-react"

export default function AboutUsPage() {
  return (
    <UtilityTemplate 
      title="About Us"
      subtitle="The mission and vision behind the CampusHub portal."
      icon={<Info className="w-8 h-8" />}
      content={
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-600" /> Our Mission
            </h2>
            <p>
              To provide a seamless, secure, and sophisticated digital interface for modern university management, empowering students and faculty alike.
            </p>
          </div>
        </div>
      }
    />
  )
}
