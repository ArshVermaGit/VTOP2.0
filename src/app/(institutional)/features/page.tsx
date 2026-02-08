"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Sparkles, Layers, Shield } from "lucide-react"

export default function FeaturesPage() {
  return (
    <UtilityTemplate 
      title="Portal Features"
      subtitle="A modern ecosystem designed for academic excellence."
      icon={<Sparkles className="w-8 h-8" />}
      content={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-2xl space-y-3">
             <Layers className="w-6 h-6 text-blue-600" />
             <h3 className="font-bold text-slate-900">Unified Dashboard</h3>
             <p className="text-sm">One place for academics, attendance, and campus life.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl space-y-3">
             <Shield className="w-6 h-6 text-emerald-600" />
             <h3 className="font-bold text-slate-900">Secure Access</h3>
             <p className="text-sm">Institutional-grade security for your personal information.</p>
          </div>
        </div>
      }
    />
  )
}
