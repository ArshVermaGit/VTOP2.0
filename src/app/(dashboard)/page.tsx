import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, LayoutDashboard, Shield, GraduationCap, Briefcase, Users } from "lucide-react"
import Link from "next/link"

export default async function DashboardLanding() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/")
  }

  const role = (session.user as any).role
  const name = session.user.name

  const getRoleConfig = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return {
          label: 'Student Portal',
          href: '/student/dashboard',
          icon: GraduationCap,
          description: 'Access your coursework, attendance, and academic records.',
          color: 'text-emerald-400',
          gradient: 'from-emerald-500/20 to-teal-500/20',
          border: 'border-emerald-500/20'
        }
      case 'FACULTY':
        return {
          label: 'Faculty Cabin',
          href: '/faculty/dashboard',
          icon: Briefcase,
          description: 'Manage courses, attendance, and research activities.',
          color: 'text-blue-400',
          gradient: 'from-blue-500/20 to-indigo-500/20',
          border: 'border-blue-500/20'
        }
      case 'PARENT':
        return {
          label: 'Parent Guardian',
          href: '/parent/dashboard',
          icon: Users,
          description: 'Monitor your ward\'s progress and stay connected.',
          color: 'text-purple-400',
          gradient: 'from-purple-500/20 to-pink-500/20',
          border: 'border-purple-500/20'
        }
      case 'ADMIN':
        return {
          label: 'Admin Oracle',
          href: '/admin/dashboard',
          icon: Shield,
          description: 'System orchestration and institutional management.',
          color: 'text-rose-400',
          gradient: 'from-rose-500/20 to-red-500/20',
          border: 'border-rose-500/20'
        }
      default:
        return {
          label: 'Dashboard',
          href: '/',
          icon: LayoutDashboard,
          description: 'Access your dashboard.',
          color: 'text-white',
          gradient: 'from-gray-500/20 to-slate-500/20',
          border: 'border-white/20'
        }
    }
  }

  const config = getRoleConfig(role)
  const Icon = config.icon

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        
        <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Welcome back, <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{name}</span>
            </h1>
            <p className="text-gray-400 text-lg">Your digital campus Gateway is ready.</p>
        </div>

        <Link href={config.href} className="block group">
            <div className={`
                relative overflow-hidden rounded-3xl border ${config.border} bg-white/5 
                p-8 md:p-12 transition-all duration-500
                hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-${config.color.split('-')[1]}-500/10
            `}>
                <div className={`absolute inset-0 bg-linear-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className={`p-6 rounded-2xl bg-black/20 backdrop-blur-xl border ${config.border} shadow-xl`}>
                        <Icon className={`w-12 h-12 ${config.color}`} />
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">{config.label}</h2>
                        <p className="text-gray-400 max-w-md mx-auto">{config.description}</p>
                    </div>

                    <Button className={`
                        h-12 px-8 rounded-full text-base font-bold tracking-wide
                        bg-white text-black hover:bg-gray-200 transition-all
                        shadow-lg shadow-white/5 group-hover:shadow-white/20
                    `}>
                        Enter Portal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </Link>
      </div>
    </div>
  )
}
