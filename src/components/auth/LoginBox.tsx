"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Eye, EyeOff, Lock, User, ArrowRight, Github, Linkedin, Twitter, Info } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LoginBox() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock login for demo - "100% working" request
    // In a real app complexity, we'd use signIn from next-auth with callback
    // For now, client side redirect for speed if credentials match
    
    setTimeout(async () => {
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false
        })

        if (result?.ok) {
            toast.success("Authentication successful! Welcome to CampusHub.")
            router.push("/dashboard")
        } else {
            toast.error("Invalid credentials. Please check your username and password.")
        }
        setIsLoading(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="portal-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
          {/* Left Column: University Branding */}
          <div className="md:col-span-5 bg-slate-900 p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-4">
                <Image 
                    src="/crest-logo.png" 
                    alt="CampusHub Logo" 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 object-contain"
                />

                <h1 className="text-3xl font-black tracking-tighter uppercase italic">
                    Campus<span className="text-blue-400">Hub</span>
                </h1>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight leading-tight">
                  University Information <br />
                  <span className="text-blue-400">Management System</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Welcome to the unified digital gateway for students, faculty, and administrative staff. 
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-12 border-t border-white/10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">System Status: Operational</p>
              </div>
              <Link href="/about">
                <Button variant="outline" className="w-fit bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 font-bold rounded-xl gap-2">
                    <Info className="w-4 h-4" /> About the Developer
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Sign In Action */}
          <div className="md:col-span-7 p-10 md:p-14 bg-white flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Secure Sign In</h3>
                <p className="text-slate-500 font-medium">Please enter your credentials to proceed</p>
              </div>

              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 h-12 rounded-xl mb-8">
                  <TabsTrigger 
                    value="student" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold transition-all"
                  >
                    Student
                  </TabsTrigger>
                  <TabsTrigger 
                    value="faculty" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold transition-all"
                  >
                    Faculty
                  </TabsTrigger>
                  <TabsTrigger 
                    value="parent" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold transition-all"
                  >
                    Parent
                  </TabsTrigger>
                </TabsList>
                
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-bold text-slate-700">Registration Number / ID</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <Input 
                        id="username" 
                        placeholder="e.g. 21BCE0042" 
                        className="pl-12 h-14 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600/10 transition-all font-medium"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-bold text-slate-700">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-12 pr-12 h-14 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-blue-600/10 transition-all font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
    
                  <div className="flex items-center justify-between py-2">
                     <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Trouble signing in?</a>
                  </div>
    
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all text-white rounded-xl group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <span className="flex items-center gap-2">
                        Log In to Portal
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </Tabs>

              {/* Integrated Demo Helper Tray */}
              <div className="pt-8 border-t border-slate-100">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Demo Access</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-500 uppercase">PWD: password123</span>
                       <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">admin / admin123</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-blue-600 uppercase tracking-tighter">Students</p>
                      <div className="grid grid-cols-2 gap-2">
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">student.arjun</code>
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">student.priya</code>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter">Faculty</p>
                      <div className="grid grid-cols-2 gap-2">
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">faculty.anand</code>
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">faculty.meenakshi</code>
                      </div>
                    </div>
                    <div className="space-y-1 col-span-2">
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Parents</p>
                      <div className="grid grid-cols-3 gap-2">
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">parent.suresh</code>
                        <code className="text-[9px] text-slate-500 font-bold bg-white border border-slate-200/50 px-2 py-1 rounded text-center">parent.venkatesh</code>
                        <div className="flex items-center justify-center">
                          <span className="text-[8px] text-slate-400 italic">All use &apos;password123&apos;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-200 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm">
          {/* Column 1: Intro & Socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 opacity-50">
              <Image src="/crest-logo.png" alt="Logo" width={24} height={24} />
              <span className="font-extrabold uppercase tracking-tighter text-slate-900">CampusHub</span>
            </div>
            <p className="text-slate-400 font-medium text-xs leading-relaxed max-w-[200px]">
              Empowering institutional growth through digital precision.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/ArshVermaGit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://x.com/TheArshVerma" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-900">Platform</h4>
            <ul className="space-y-2 text-slate-500 font-bold">
              <li><Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/changelog" className="hover:text-blue-600 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-900">Support</h4>
            <ul className="space-y-2 text-slate-500 font-bold">
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              <li><Link href="/support" className="hover:text-blue-600 transition-colors">Support</Link></li>
              <li><Link href="/site-map" className="hover:text-blue-600 transition-colors">Sitemap</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors text-blue-600/80">About Developer</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-[10px] text-slate-900">Legal</h4>
            <ul className="space-y-2 text-slate-500 font-bold">
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-600 transition-colors">Disclaimer</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          <p>© 2026 University Information Systems. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built by <Link href="/about" className="text-blue-600 hover:underline">Arsh Verma</Link>
          </p>
        </div>
      </div>
    </motion.div>

  )
}
