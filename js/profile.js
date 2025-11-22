import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { User, Mail, BookOpen, Hash, Calendar } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  if (!profile) return <Layout><div className="text-center">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="profile-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="profile-title">Student Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-effect p-8 border-white/10 lg:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2" data-testid="profile-name">{profile.name}</h2>
              <p className="text-gray-400" data-testid="profile-student-id">{profile.student_id}</p>
            </div>
          </Card>

          <Card className="glass-effect p-8 border-white/10 lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-white">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white" data-testid="profile-email">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Hash className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Registration Number</p>
                  <p className="text-white" data-testid="profile-reg-number">{profile.registration_number}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Program</p>
                  <p className="text-white" data-testid="profile-program">{profile.program}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Branch</p>
                  <p className="text-white" data-testid="profile-branch">{profile.branch}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-gray-400">Current Semester</p>
                  <p className="text-white" data-testid="profile-semester">{profile.semester}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}