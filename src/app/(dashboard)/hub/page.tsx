"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  GraduationCap, 
  Users, 
  Shield, 
  Home,
  BookOpen,
  Calendar,
  CreditCard,
  Bell,
  BarChart3,
  FileText,
  Settings,
  Zap,
  ChevronRight,
  User,
  Award,
  Briefcase,
  Library,
  MessageSquare,
  ShieldCheck
} from "lucide-react"
import Link from "next/link"

const portalSections = {
  STUDENT: [
    { 
      title: "Academic Core", 
      icon: GraduationCap, 
      color: "indigo",
      items: [
        { label: "Dashboard", href: "/student/dashboard", desc: "Overview & stats" },
        { label: "Timetable", href: "/student/academics/timetable", desc: "Class schedule" },
        { label: "Attendance", href: "/student/academics/attendance", desc: "Track presence" },
        { label: "Marks & Grades", href: "/student/academics/marks", desc: "Assessment scores" },
        { label: "Course Content", href: "/student/academics/courses", desc: "Materials & syllabus" },
      ]
    },
    { 
      title: "Examinations", 
      icon: FileText, 
      color: "amber",
      items: [
        { label: "Exam Schedule", href: "/student/academics/exams", desc: "CAT/FAT dates" },
        { label: "Hall Ticket", href: "/student/academics/exams/hall-ticket", desc: "Download ticket" },
        { label: "Seat Locator", href: "/student/academics/exams/seats", desc: "Find your seat" },
        { label: "Results", href: "/student/academics/results", desc: "Grade reports" },
      ]
    },
    { 
      title: "Services", 
      icon: Settings, 
      color: "emerald",
      items: [
        { label: "Library Hub", href: "/student/services/library", desc: "Books & resources" },
        { label: "Career Portal", href: "/student/career/placements", desc: "Jobs & internships" },
        { label: "Feedback Center", href: "/student/services/feedback", desc: "Course feedback" },
        { label: "Club Hub", href: "/student/extracurricular/clubs", desc: "Join activities" },
      ]
    },
    { 
      title: "Finance & Admin", 
      icon: CreditCard, 
      color: "purple",
      items: [
        { label: "Fee Ledger", href: "/student/finance/ledger", desc: "Payment history" },
        { label: "Hostel", href: "/student/hostel/details", desc: "Accommodation" },
        { label: "Leave Requests", href: "/student/leaves/hub", desc: "Apply for leave" },
        { label: "Profile", href: "/student/profile", desc: "Personal info" },
      ]
    },
  ],
  FACULTY: [
    { 
      title: "Teaching Hub", 
      icon: BookOpen, 
      color: "indigo",
      items: [
        { label: "Oracle Dashboard", href: "/faculty/dashboard", desc: "Central command" },
        { label: "Mark Attendance", href: "/faculty/attendance", desc: "Log presence" },
        { label: "Marks Upload", href: "/faculty/marks", desc: "Enter grades" },
        { label: "Schedule", href: "/faculty/schedule", desc: "Your timetable" },
      ]
    },
    { 
      title: "Mentorship", 
      icon: Users, 
      color: "emerald",
      items: [
        { label: "Proctees", href: "/faculty/proctees", desc: "Your wards" },
        { label: "Mentor Hub", href: "/faculty/mentor", desc: "Guidance portal" },
        { label: "Messages", href: "/faculty/messages", desc: "Announcements" },
      ]
    },
    { 
      title: "Administration", 
      icon: Briefcase, 
      color: "amber",
      items: [
        { label: "Payroll", href: "/faculty/admin/payroll", desc: "Salary & slips" },
        { label: "Leave Ledger", href: "/faculty/admin/leaves", desc: "Apply for leave" },
        { label: "Profile", href: "/faculty/profile", desc: "Your details" },
      ]
    },
  ],
  PARENT: [
    { 
      title: "Ward Monitoring", 
      icon: User, 
      color: "indigo",
      items: [
        { label: "Guardian Dashboard", href: "/parent/dashboard", desc: "Overview" },
        { label: "Ward Details", href: "/parent/ward-details", desc: "Academic audit" },
        { label: "Performance", href: "/parent/performance", desc: "Progress charts" },
        { label: "Schedule", href: "/parent/schedule", desc: "Ward's timetable" },
      ]
    },
    { 
      title: "Communication", 
      icon: MessageSquare, 
      color: "purple",
      items: [
        { label: "Contact Proctor", href: "/parent/proctor", desc: "Direct line" },
        { label: "Fees & Dues", href: "/parent/payments", desc: "Payment status" },
      ]
    },
  ],
  ADMIN: [
    { 
      title: "System Control", 
      icon: Shield, 
      color: "rose",
      items: [
        { label: "Control Center", href: "/admin/dashboard", desc: "System overview" },
        { label: "Engine Forge", href: "/admin/engine", desc: "Backend ops" },
        { label: "User Management", href: "/admin/users", desc: "Manage accounts" },
        { label: "System Health", href: "/admin/health", desc: "Performance" },
      ]
    },
    { 
      title: "Data & Security", 
      icon: ShieldCheck, 
      color: "amber",
      items: [
        { label: "Attendance Control", href: "/admin/attendance", desc: "Bulk ops" },
        { label: "Database Hub", href: "/admin/database", desc: "Data management" },
        { label: "Security Matrix", href: "/settings/security", desc: "2FA & audit" },
      ]
    },
  ],
}

const colorMap: any = {
  indigo: "bg-indigo-600/10 border-indigo-500/20 text-indigo-400",
  emerald: "bg-emerald-600/10 border-emerald-500/20 text-emerald-400",
  amber: "bg-amber-600/10 border-amber-500/20 text-amber-400",
  purple: "bg-purple-600/10 border-purple-500/20 text-purple-400",
  rose: "bg-rose-600/10 border-rose-500/20 text-rose-400",
}

export default function UnifiedPortalHub() {
  const { data: session } = useSession()
  const role = ((session?.user as any)?.role || "STUDENT") as keyof typeof portalSections
  const sections = portalSections[role] || portalSections.STUDENT

  const roleLabels: any = {
    STUDENT: "Student Portal",
    FACULTY: "Faculty Oracle",
    PARENT: "Guardian Gateway",
    ADMIN: "Admin Command",
  }

  return (
    <div className="min-h-screen bg-[#09090B] p-8 space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <Badge className="bg-white/5 text-white/60 border-white/10 px-3 uppercase font-black text-[9px] tracking-widest">
            VTOP 2.0 • Unified Access
          </Badge>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">
            {roleLabels[role]} <span className="text-indigo-500">Hub</span>
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            Welcome, {session?.user?.name || "User"} • All your portals in one place
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/settings/security">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white hover:text-black transition-all rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </Link>
          <Link href={`/${role.toLowerCase()}/dashboard`}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-6 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20">
              <Zap className="w-4 h-4 mr-2" /> Quick Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* PORTAL SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section: any, i: number) => (
          <Card key={i} className="bg-[#0A0A0B]/80 border-white/10 overflow-hidden backdrop-blur-3xl group hover:border-white/20 transition-all">
            <CardHeader className="bg-black/40 border-b border-white/5 py-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${colorMap[section.color]}`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <CardTitle className="text-white text-lg uppercase font-black italic tracking-tight">
                  {section.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {section.items.map((item: any, j: number) => (
                  <Link key={j} href={item.href}>
                    <div className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group/item">
                      <div className="space-y-1">
                        <p className="text-white font-black text-sm uppercase italic tracking-tight group-hover/item:text-indigo-400 transition-colors">
                          {item.label}
                        </p>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                          {item.desc}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-800 group-hover/item:text-white transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* QUICK STATS FOOTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
        <QuickStat label="Active Sessions" value="1" />
        <QuickStat label="Notifications" value="3" />
        <QuickStat label="Last Login" value="Today" />
        <QuickStat label="System Status" value="Online" status="success" />
      </div>
    </div>
  )
}

function QuickStat({ label, value, status }: { label: string; value: string; status?: string }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
      <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">{label}</p>
      <p className={`text-lg font-black italic ${status === 'success' ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
    </div>
  )
}
