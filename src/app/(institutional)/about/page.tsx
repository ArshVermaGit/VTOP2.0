"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowLeft, 
  Code2, 
  Gamepad2, 
  GraduationCap, 
  Sparkles, 
  ExternalLink,
  Cpu,
  Layers,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <main className="min-h-screen w-full bg-slate-50 flex flex-col items-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-full max-w-6xl mb-8"
      >
        <Link href="/">
          <Button variant="ghost" className="group text-slate-500 hover:text-blue-600 font-bold px-0 hover:bg-transparent">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Portal
          </Button>
        </Link>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* HERO SECTION: Who is Arsh? */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-8 bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden group border border-slate-800"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" /> Full-Stack Digital Creator
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] italic italic-none">
              HI, I&apos;M <br />
              <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">ARSH VERMA</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
              A Tech Gaming Technology student at VIT Bhopal blending <span className="text-white">creative vision</span> with <span className="text-white">technical precision</span>.
            </p>
          </div>
          <div className="relative z-10 pt-10 flex gap-6">
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white italic">2026</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Year of Design</span>
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white italic">001</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Source</span>
             </div>
          </div>
        </motion.div>

        {/* PHOTO SECTION */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-4 bg-white rounded-[2.5rem] p-4 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col"
        >
          <div className="relative flex-1 rounded-[2rem] overflow-hidden border-2 border-slate-50 shadow-inner group">
             <Image 
                src="/arsh.jpg" 
                alt="Arsh Verma" 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                   <Cpu className="w-4 h-4 text-blue-400" /> View System Components
                </p>
             </div>
          </div>
        </motion.div>

        {/* BIO SECTION */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-5 bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-12 space-y-6 shadow-xl shadow-slate-200/50"
        >
          <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Layers className="w-6 h-6 text-blue-600" /> PHILOSOPHY
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed">
             My development philosophy is simple: turn great ideas into polished, engaging digital reality. Every project is an opportunity to push the boundaries of what&apos;s possible.
          </p>
          <div className="pt-6 border-t border-slate-50">
             <Link href="/features">
                <Button variant="outline" className="rounded-xl font-bold w-full group">
                   Explore My Expertise
                   <ArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Button>
             </Link>
          </div>
        </motion.div>

        {/* TECH SPECIALIZATION */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-3 bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-blue-500/20"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <Zap className="w-10 h-10 mb-8 animate-pulse" />
          <div className="space-y-4">
             <h3 className="text-2xl font-black tracking-tighter leading-none italic uppercase">
                Unity & <br />Full-Stack
             </h3>
             <p className="text-sm font-bold text-blue-100 uppercase tracking-widest">
                Primary Stack
             </p>
          </div>
        </motion.div>

        {/* SOCIAL & CONTACT MATRIX */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-4 grid grid-cols-2 grid-rows-2 gap-4"
        >
          <a href="https://github.com/ArshVermaGit" target="_blank" rel="noopener noreferrer" className="col-span-1 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-slate-900 hover:text-white transition-all group group-hover:shadow-xl">
             <Github className="w-8 h-8 group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noopener noreferrer" className="col-span-1 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-[#0077b5] hover:text-white transition-all group group-hover:shadow-xl">
             <Linkedin className="w-8 h-8 group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
          </a>
          <a href="https://x.com/TheArshVerma" target="_blank" rel="noopener noreferrer" className="col-span-2 bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-between hover:bg-black hover:text-white transition-all group group-hover:shadow-xl px-8">
             <div className="flex items-center gap-4">
                <Twitter className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Twitter (X)</span>
             </div>
             <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100" />
          </a>
        </motion.div>

        {/* FOOTER DIRECT CONTACT */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-12 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-200/50"
        >
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Direct Communication Protocol</p>
             <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">arshverma.dev@gmail.com</h2>
          </div>
          <a href="mailto:arshverma.dev@gmail.com">
             <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 px-10 rounded-2xl gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
                <Mail className="w-5 h-5" /> Start Conversation
             </Button>
          </a>
        </motion.div>
      </motion.div>
      
      <p className="mt-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        Institutional Digital Experience &bull; Ref. 2.0.4 &bull; 2026
      </p>
    </main>
  )
}
