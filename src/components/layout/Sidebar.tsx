"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navigationConfig } from "@/config/navigation"

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

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const userRole = session?.user?.role || "STUDENT";

  const getMenuItems = (): SidebarItem[] => {
    switch (userRole) {
      case "ADMIN": return navigationConfig.admin;
      case "FACULTY": return navigationConfig.faculty;
      case "PARENT": return navigationConfig.parent;
      default: return navigationConfig.student;
    }
  };

  const navItems = getMenuItems();
  const settingsItems = navigationConfig.settings;

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-[60]">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 rounded-xl shadow-lg"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={isMobile ? { x: -280 } : false}
        animate={{ 
          x: isMobile ? (isOpen ? 0 : -280) : 0,
          width: isCollapsed ? 80 : 280 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 150 }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-slate-50/50 backdrop-blur-xl border-r border-slate-200/60 z-50 flex flex-col transition-all duration-300 shadow-[1px_0_0_0_rgba(0,0,0,0.02)]",
          !isMobile && "relative"
        )}
      >
        {/* Branding */}
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100 overflow-hidden">
                <NextImage 
                  src="/crest-logo.png" 
                  alt="CampusHub Logo" 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-contain"
                />


              </div>
              <span className="font-black text-xl tracking-tighter text-slate-900 uppercase italic">Campus <span className="text-blue-600">Hub</span></span>

            </motion.div>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8 scrollbar-hide">
          <div>
            {!isCollapsed && (
              <p className="px-2 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Explore
              </p>
            )}
            <nav className="space-y-1">
              {navItems.map((item: SidebarItem) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                      pathname === item.href 
                        ? "bg-white text-blue-600 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/10" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50 border border-transparent"
                    )}
                    onClick={(e) => {
                      if (isMobile) setIsOpen(false);
                      if (item.subItems) {
                        e.preventDefault();
                        toggleSubMenu(item.label);
                      }
                    }}
                  >
                    <item.icon size={22} className={cn(
                      "transition-transform duration-300 group-hover:scale-110",
                      pathname === item.href ? "text-blue-600" : ""
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
                        {item.subItems.map((sub: SubItem) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => isMobile && setIsOpen(false)}
                            className={cn(
                              "block py-2 text-xs font-medium transition-colors hover:text-slate-900",
                              pathname === sub.href ? "text-blue-600" : "text-slate-500"
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

          {/* Environment Section */}
          <div>
            {!isCollapsed && (
              <p className="px-2 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Personal
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
                          ? "bg-slate-100 text-slate-900" 
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      )}
                      onClick={(e) => {
                          if (isMobile) setIsOpen(false);
                          if (item.subItems) {
                            e.preventDefault();
                            toggleSubMenu(item.label);
                          }
                      }}
                    >
                      <item.icon size={22} className="group-hover:text-slate-900 transition-colors" />
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
                              onClick={() => isMobile && setIsOpen(false)}
                              className={cn(
                                "block py-2 text-xs font-medium transition-colors hover:text-slate-900",
                                pathname === sub.href ? "text-blue-600" : "text-slate-500"
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
        <div className="p-4 border-t border-slate-200">
          <div className={cn(
            "flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden">
                 <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold flex-shrink-0 uppercase italic">
                    {session?.user?.name?.[0] || "U"}
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-slate-900 truncate leading-none mb-1">{session?.user?.name}</p>
                    <p className="text-[10px] text-slate-400 truncate uppercase font-black tracking-widest">{userRole}</p>
                 </div>
              </div>
            )}
            {isCollapsed ? (
               <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })} className="text-rose-500 hover:bg-rose-50">
                  <LogOut size={20} />
               </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 h-8 w-8 ml-2">
                <LogOut size={16} />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
