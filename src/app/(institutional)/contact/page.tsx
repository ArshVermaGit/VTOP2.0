"use client"

import { UtilityTemplate } from "@/components/layout/UtilityTemplate"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <UtilityTemplate 
      title="Contact Us"
      subtitle="We're here to help with your institutional queries."
      icon={<Mail className="w-8 h-8" />}
      content={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-600">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>support@university.edu</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>VIT Bhopal University, Madhya Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}
