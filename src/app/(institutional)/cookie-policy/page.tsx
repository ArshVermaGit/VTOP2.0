"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Cookie } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <UtilityTemplate 
      title="Cookie Policy"
      subtitle="How we use cookies to improve your portal experience."
      icon={<Cookie className="w-8 h-8" />}
      content={
        <>
          <p>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4">Technical Cookies</h2>
          <p>
            Necessary cookies enable core functionality such as security, identity verification, and network management.
          </p>
        </>
      }
    />
  )
}
