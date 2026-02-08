"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Zap, Shield, MousePointer2 } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <UtilityTemplate 
      title="How it Works"
      subtitle="Navigating the digital campus with ease."
      icon={<Zap className="w-8 h-8" />}
      content={
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">1</div>
              <h3 className="font-bold text-slate-900">Secure Sign-In</h3>
              <p className="text-sm">Use your institutional credentials to access your personalized dashboard.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black">2</div>
              <h3 className="font-bold text-slate-900">Resource Access</h3>
              <p className="text-sm">Manage attendance, view materials, and track academic progress in real-time.</p>
            </div>
          </div>
        </div>
      }
    />
  )
}
