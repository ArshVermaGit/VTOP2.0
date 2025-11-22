import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Login({ setIsAuthenticated }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        student_id: studentId,
        password: password,
      });

      localStorage.setItem("vtop_token", response.data.token);
      localStorage.setItem("vtop_student", JSON.stringify(response.data.student));
      setIsAuthenticated(true);
      toast.success("Login successful!");
      
      // Initialize demo data
      try {
        await axios.post(`${API}/init-demo-data`);
      } catch (err) {
        console.log("Demo data init:", err);
      }
      
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Try: 21BCE001 / demo123");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="glass-effect w-full max-w-md p-8 relative z-10 border-white/10" data-testid="login-card">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 gradient-text" data-testid="vtop-title">VTOP 2.0</h1>
          <p className="text-gray-400 text-sm" data-testid="login-subtitle">Student Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="student-id">Student ID</label>
            <Input
              id="student-id"
              data-testid="student-id-input"
              type="text"
              placeholder="Enter your Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300" htmlFor="password">Password</label>
            <Input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
              required
            />
          </div>

          <Button
            data-testid="login-button"
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-6 text-base"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500" data-testid="demo-credentials">
            Demo: 21BCE001 / demo123
          </p>
        </div>
      </Card>
    </div>
  );
}