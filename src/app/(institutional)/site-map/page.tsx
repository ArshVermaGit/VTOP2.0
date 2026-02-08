"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Map } from "lucide-react"
import Link from "next/link"

export default function SitemapPage() {
  return (
    <UtilityTemplate 
      title="Sitemap"
      subtitle="A complete index of the CampusHub portal structure."
      icon={<Map className="w-8 h-8" />}
      content={
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Main Portal</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-600">Login Board</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About Developer</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Legal & Support</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>
        </div>
      }
    />
  )
}
