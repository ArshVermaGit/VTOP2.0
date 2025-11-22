import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
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
  BarChart
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const studentData = localStorage.getItem("vtop_student");
    if (studentData) {
      setStudent(JSON.parse(studentData));
    }
  }, []);

  const quickLinks = [
    { name: "Profile", icon: User, path: "/profile", color: "from-cyan-500 to-blue-500" },
    { name: "Attendance", icon: Calendar, path: "/attendance", color: "from-blue-500 to-purple-500" },
    { name: "Marks", icon: BarChart, path: "/marks", color: "from-purple-500 to-pink-500" },
    { name: "Grades", icon: Award, path: "/grades", color: "from-pink-500 to-red-500" },
    { name: "Time Table", icon: Clock, path: "/timetable", color: "from-red-500 to-orange-500" },
    { name: "Exam Schedule", icon: BookOpen, path: "/exams", color: "from-orange-500 to-yellow-500" },
    { name: "Payments", icon: CreditCard, path: "/payments", color: "from-yellow-500 to-green-500" },
    { name: "Messages", icon: MessageSquare, path: "/messages", color: "from-green-500 to-teal-500" },
    { name: "Leave Request", icon: FileText, path: "/leave", color: "from-teal-500 to-cyan-500" },
    { name: "Hostel", icon: HomeIcon, path: "/hostel", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="dashboard-container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="welcome-message">
            Welcome back, {student?.name || "Student"}
          </h1>
          <p className="text-gray-400" data-testid="student-id-display">{student?.student_id} | {student?.branch}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <Card
              key={index}
              data-testid={`quick-link-${link.name.toLowerCase().replace(/ /g, '-')}`}
              className="glass-effect p-6 cursor-pointer hover:scale-105 transition-all duration-300 border-white/10 group"
              onClick={() => navigate(link.path)}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <link.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {link.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}