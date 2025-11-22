import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Progress } from "@/components/ui/progress";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const getColorClass = (percentage) => {
    if (percentage >= 85) return "text-green-400";
    if (percentage >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="attendance-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="attendance-title">Class Attendance</h1>

        <div className="grid grid-cols-1 gap-6">
          {attendance.map((record, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`attendance-card-${index}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white" data-testid={`course-name-${index}`}>{record.course_name}</h3>
                  <p className="text-gray-400" data-testid={`course-code-${index}`}>{record.course_code}</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${getColorClass(record.percentage)}`} data-testid={`attendance-percentage-${index}`}>
                    {record.percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-400" data-testid={`attendance-ratio-${index}`}>
                    {record.attended_classes}/{record.total_classes}
                  </p>
                </div>
              </div>
              <Progress value={record.percentage} className="h-2" />
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}