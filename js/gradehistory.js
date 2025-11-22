import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function GradeHistory() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/grades`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const groupBySemester = () => {
    const grouped = {};
    grades.forEach(grade => {
      if (!grouped[grade.semester]) grouped[grade.semester] = [];
      grouped[grade.semester].push(grade);
    });
    return grouped;
  };

  const groupedGrades = groupBySemester();

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="grade-history-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="grade-history-title">Grade History</h1>

        <div className="space-y-6">
          {Object.keys(groupedGrades).map((semester, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`semester-history-card-${index}`}>
              <h2 className="text-2xl font-semibold text-white mb-4" data-testid={`semester-history-title-${index}`}>Semester {semester}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedGrades[semester].map((grade, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-lg" data-testid={`grade-history-${index}-${idx}`}>
                    <h3 className="text-lg font-semibold text-white" data-testid={`grade-history-course-${index}-${idx}`}>{grade.course_name}</h3>
                    <p className="text-gray-400" data-testid={`grade-history-code-${index}-${idx}`}>{grade.course_code}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-2xl font-bold text-cyan-400" data-testid={`grade-history-grade-${index}-${idx}`}>{grade.grade}</span>
                      <span className="text-gray-400" data-testid={`grade-history-credits-${index}-${idx}`}>{grade.credits} Credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}