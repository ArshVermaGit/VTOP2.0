import { 
  History,
  Search,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  MessageCircle,
  GraduationCap, 
  Settings, 
  User,
  ShieldCheck,
  Users,
  Shield,
  ClipboardList,
  LayoutGrid,
  Activity,
  Award,
  UserCheck,
  Zap
} from "lucide-react"

export type NavSubItem = {
  label: string
  href: string
}

export type NavItem = {
  icon: React.ElementType
  label: string
  href: string
  subItems?: NavSubItem[]
}

export const navigationConfig = {
  student: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student/dashboard" },
    { icon: ClipboardList, label: "Time Table", href: "/student/academics/timetable" },
    { icon: UserCheck, label: "Attendance", href: "/student/academics/attendance" },
    { icon: Award, label: "My Grades", href: "/student/academics/marks" },
    { icon: BookOpen, label: "Course Plan", href: "/student/academics/courses" },
    { icon: History, label: "Grade History", href: "/student/academics/grade-history" },
    { icon: MessageCircle, label: "Campus Community", href: "/student/communications/hub" },
  ],
  faculty: [
    { icon: LayoutGrid, label: "Academic Hub", href: "/faculty/dashboard" },
    { icon: BookOpen, label: "My Classes", href: "/faculty/courses" },
    { icon: ClipboardList, label: "Schedule", href: "/faculty/schedule" },
    { icon: UserCheck, label: "Attendance", href: "/faculty/attendance" },
    { icon: Award, label: "Grade Center", href: "/faculty/marks" },
    { icon: History, label: "Activity Logs", href: "/faculty/admin/leaves" },
  ],
  parent: [
    { icon: LayoutDashboard, label: "Student Status", href: "/parent/dashboard" },
    { icon: UserCheck, label: "Attendance", href: "/parent/attendance" },
    { icon: Award, label: "Academic Audit", href: "/parent/performance" },
    { icon: CreditCard, label: "Fees & Payments", href: "/parent/payments" },
    { icon: History, label: "Overview", href: "/parent/ward-details" },
  ],
  admin: [
    { icon: Shield, label: "Admin Panel", href: "/admin/dashboard" },
    { icon: Zap, label: "System Controls", href: "/admin/database" },
    { icon: Search, label: "Global Registry", href: "/admin/explorer" },
    { icon: ShieldCheck, label: "Attendance Admin", href: "/admin/attendance" },
    { icon: Users, label: "User Management", href: "/admin/users" },
    { icon: GraduationCap, label: "Student List", href: "/admin/students" },
    { icon: User, label: "Faculty List", href: "/admin/faculty" },
    { icon: Users, label: "Parent List", href: "/admin/parents" },
    { icon: BookOpen, label: "Course Manager", href: "/admin/courses" },
    { icon: Award, label: "Academic Control", href: "/admin/marks" },
    { icon: CreditCard, label: "Financial Hub", href: "/admin/payments" },
    { icon: Activity, label: "System Health", href: "/admin/health" },
    { 
      icon: Settings, 
      label: "System Settings", 
      href: "/settings",
      subItems: [
        { label: "Account Security", href: "/settings/security" },
        { label: "System Alerts", href: "/admin/alerts" },
        { label: "System Activity", href: "/admin/engine" },
      ]
    },
  ],
  settings: [
    { 
      icon: Settings, 
      label: "Settings", 
      href: "/settings",
      subItems: [
        { label: "My Profile", href: "/settings/profile" },
        { label: "Account Security", href: "/settings/security" },
        { label: "Alerts", href: "/settings/notifications" },
        { label: "Preferences", href: "/settings/preferences" },
      ]
    },
  ]
}
