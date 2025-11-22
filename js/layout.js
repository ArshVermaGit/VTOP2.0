import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  FileText,
  Home as HomeIcon,
  BarChart,
  LogOut,
  Menu,
  X,
  Lock,
  GraduationCap,
  History
} from "lucide-react";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("vtop_token");
    localStorage.removeItem("vtop_student");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/dashboard" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Attendance", icon: Calendar, path: "/attendance" },
    { name: "Marks", icon: BarChart, path: "/marks" },
    { name: "Grades", icon: Award, path: "/grades" },
    { name: "Grade History", icon: History, path: "/grade-history" },
    { name: "Time Table", icon: Clock, path: "/timetable" },
    { name: "Curriculum", icon: GraduationCap, path: "/curriculum" },
    { name: "Exam Schedule", icon: BookOpen, path: "/exams" },
    { name: "Payments", icon: CreditCard, path: "/payments" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Leave Request", icon: FileText, path: "/leave" },
    { name: "Hostel", icon: HomeIcon, path: "/hostel" },
    { name: "Change Password", icon: Lock, path: "/change-password" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation */}
      <nav className="glass-effect border-b border-white/10 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                data-testid="menu-toggle"
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <h1 className="text-2xl font-bold gradient-text" data-testid="nav-title">VTOP 2.0</h1>
            </div>
            <Button
              data-testid="logout-button"
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 glass-effect border-r border-white/10 transition-transform duration-300 z-40 overflow-y-auto`}
          data-testid="sidebar"
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                data-testid={`nav-item-${item.name.toLowerCase().replace(/ /g, '-')}`}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                variant="ghost"
                className={`w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 ${
                  location.pathname === item.path ? "bg-white/10 text-white" : ""
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8" data-testid="main-content">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}