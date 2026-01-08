"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import {
  BarChartHorizontal,
  History,
  MapPin,
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  CreditCard,
  MessageCircle,
  GraduationCap, 
  LogOut, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Users,
  Shield,
  ClipboardList,
  LayoutGrid,
  Activity,
  Award,
  UserCheck,
  Home,
  Plane,
  Wallet,
  FileCheck,
  Megaphone,
  Briefcase,
  Trophy,
  Zap,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"


interface SubItem {
  label: string;
  href: string;
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  subItems?: SubItem[];
}

const studentItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student/dashboard" },
  { icon: ClipboardList, label: "Time Table", href: "/student/timetable" },
  { icon: UserCheck, label: "Attendance", href: "/student/attendance" },
  { icon: Award, label: "Marks Hub", href: "/student/marks" },
  { icon: BookOpen, label: "Course Plan", href: "/student/courses" },
  { icon: MapPin, label: "Campus Map", href: "/student/map" },
  { icon: History, label: "Academics", href: "/student/history" },
  { icon: MessageCircle, label: "V-Topia", href: "/student/forum" },
];

const facultyItems: SidebarItem[] = [
  { icon: LayoutGrid, label: "Academic Hub", href: "/faculty/dashboard" },
  { icon: ClipboardList, label: "Duty Chart", href: "/faculty/timetable" },
  { icon: UserCheck, label: "Roll Call", href: "/faculty/attendance" },
  { icon: Award, label: "Grade Center", href: "/faculty/marks" },
  { icon: BookOpen, label: "My Queries", href: "/faculty/queries" },
  { icon: History, label: "Log Registry", href: "/faculty/history" },
];

const parentItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Ward Status", href: "/parent/dashboard" },
  { icon: UserCheck, label: "Ward Attendance", href: "/parent/attendance" },
  { icon: Award, label: "Academic Report", href: "/parent/marks" },
  { icon: CreditCard, label: "Fee Portal", href: "/parent/payments" },
  { icon: History, label: "Full Profile", href: "/parent/profile" },
];

const settingsItems: SidebarItem[] = [
  { icon: Settings, label: "Config Matrix", href: "/settings",
    subItems: [
        { label: "Identity Profile", href: "/settings/profile" },
        { label: "Security Vault", href: "/settings/security" },
        { label: "Notification Node", href: "/settings/notifications" },
        { label: "Communication Prefs", href: "/settings/preferences" },
    ]
  },
];

const adminItems: SidebarItem[] = [
  { icon: Shield, label: "Control Center", href: "/admin/dashboard" },
  { icon: Zap, label: "Engine Forge", href: "/admin/database" },
  { icon: Search, label: "Master Registry", href: "/admin/explorer" },
  { icon: ShieldCheck, label: "Attendance Control", href: "/admin/attendance" },
  { icon: Users, label: "Identity Hub", href: "/admin/users" },
  { icon: GraduationCap, label: "Student Matrix", href: "/admin/students" },
  { icon: User, label: "Faculty Matrix", href: "/admin/faculty" },
  { icon: Users, label: "Parent Matrix", href: "/admin/parents" },
  { icon: BookOpen, label: "Course Manager", href: "/admin/courses" },
  { icon: Award, label: "Academic Control", href: "/admin/marks" },
  { icon: CreditCard, label: "Financial Hub", href: "/admin/payments" },
  { icon: Activity, label: "System Health", href: "/admin/health" },
  { icon: Settings, label: "Matrix Settings", href: "/settings",
    subItems: [
        { label: "Security Matrix", href: "/settings/security" },
        { label: "System Alerts", href: "/admin/alerts" },
        { label: "Audit Logs", href: "/admin/engine" },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  const userRole = session?.user?.role || "STUDENT";

  const getMenuItems = () => {
    switch (userRole) {
      case "ADMIN": return adminItems;
      case "FACULTY": return facultyItems;
      case "PARENT": return parentItems;
      default: return studentItems;
    }
  };

  const navItems = getMenuItems();

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-[#050505] border-r border-white/5 z-50 flex flex-col"
    >
      {/* Branding */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20">
              V
            </div>
            <span className="font-black text-xl tracking-tighter text-white">VTOP <span className="text-indigo-500">2.0</span></span>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-white hover:bg-white/5"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
        <div>
          {!isCollapsed && (
            <p className="px-2 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500 opacity-50">
              Main Matrix
            </p>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                    pathname === item.href 
                      ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
                      : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                      toggleSubMenu(item.label);
                    }
                  }}
                >
                  <item.icon size={22} className={cn(
                    "transition-transform duration-300 group-hover:scale-110",
                    pathname === item.href ? "text-indigo-500" : ""
                  )} />
                  {!isCollapsed && (
                    <span className="font-semibold text-sm tracking-tight flex-1">{item.label}</span>
                  )}
                  {!isCollapsed && item.subItems && (
                    <motion.div
                      animate={{ rotate: openSubMenus.includes(item.label) ? 180 : 0 }}
                    >
                      <ChevronRight size={14} className="opacity-50" />
                    </motion.div>
                  )}
                </Link>

                {/* Sub Menu */}
                <AnimatePresence>
                  {!isCollapsed && item.subItems && openSubMenus.includes(item.label) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-9 mt-1 space-y-1"
                    >
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={cn(
                            "block py-2 text-xs font-medium transition-colors hover:text-white",
                            pathname === sub.href ? "text-indigo-400" : "text-gray-500"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>

        {/* Global Settings Section */}
        <div>
          {!isCollapsed && (
            <p className="px-2 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500 opacity-50">
              Environment
            </p>
          )}
          <nav className="space-y-1">
             {settingsItems.map((item) => (
                <div key={item.label}>
                   <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                      pathname === item.href 
                        ? "bg-white/5 text-white" 
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    )}
                    onClick={(e) => {
                        if (item.subItems) {
                          e.preventDefault();
                          toggleSubMenu(item.label);
                        }
                    }}
                  >
                    <item.icon size={22} className="group-hover:text-white transition-colors" />
                    {!isCollapsed && <span className="font-medium text-sm tracking-tight flex-1">{item.label}</span>}
                    {!isCollapsed && item.subItems && (
                        <motion.div
                           animate={{ rotate: openSubMenus.includes(item.label) ? 180 : 0 }}
                        >
                           <ChevronRight size={14} className="opacity-50" />
                        </motion.div>
                    )}
                  </Link>

                  <AnimatePresence>
                    {!isCollapsed && item.subItems && openSubMenus.includes(item.label) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-9 mt-1 space-y-1"
                      >
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={cn(
                              "block py-2 text-xs font-medium transition-colors hover:text-white",
                              pathname === sub.href ? "text-indigo-400" : "text-gray-500"
                            )}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             ))}
          </nav>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-indigo-400 font-bold flex-shrink-0">
                  {session?.user?.name?.[0] || "U"}
               </div>
               <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate leading-none mb-1">{session?.user?.name}</p>
                  <p className="text-[10px] text-gray-400 truncate opacity-50 uppercase font-bold tracking-widest">{userRole}</p>
               </div>
            </div>
          )}
          {isCollapsed ? (
             <Button variant="ghost" size="icon" onClick={() => signOut()} className="text-rose-500 hover:bg-rose-500/10">
                <LogOut size={20} />
             </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => signOut()} className="text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 h-8 w-8 ml-2">
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
