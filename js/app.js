import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Attendance from "@/pages/Attendance";
import Marks from "@/pages/Marks";
import Grades from "@/pages/Grades";
import TimeTable from "@/pages/TimeTable";
import ExamSchedule from "@/pages/ExamSchedule";
import Payments from "@/pages/Payments";
import Messages from "@/pages/Messages";
import LeaveRequest from "@/pages/LeaveRequest";
import Hostel from "@/pages/Hostel";
import ChangePassword from "@/pages/ChangePassword";
import Curriculum from "@/pages/Curriculum";
import GradeHistory from "@/pages/GradeHistory";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vtop_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marks"
            element={
              <ProtectedRoute>
                <Marks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <ProtectedRoute>
                <Grades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/timetable"
            element={
              <ProtectedRoute>
                <TimeTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <ExamSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <LeaveRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hostel"
            element={
              <ProtectedRoute>
                <Hostel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/curriculum"
            element={
              <ProtectedRoute>
                <Curriculum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grade-history"
            element={
              <ProtectedRoute>
                <GradeHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;