"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UtilityPageProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  content: React.ReactNode
}

export function UtilityTemplate({ title, subtitle, icon, content }: UtilityPageProps) {
  return (
    <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Link href="/">
          <Button variant="ghost" className="mb-8 group text-slate-500 hover:text-blue-600 font-bold">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portal
          </Button>
        </Link>

        <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden p-10 md:p-16">
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                {icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase italic italic-none">
                {title}
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-xl">
                {subtitle}
              </p>
            </div>

            <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-6">
              {content}
            </div>
            
            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Last Updated: February 2026
              </p>
              <div className="flex gap-4">
                <Link href="/contact">
                  <Button variant="outline" className="rounded-xl font-bold gap-2">
                    <Mail className="w-4 h-4" /> Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
          University Information Systems &bull; 2026
        </p>
      </motion.div>
    </main>
  )
}
