import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [gpa, setGpa] = useState(0);

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
      calculateGPA(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const calculateGPA = (gradesData) => {
    const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0 };
    let totalPoints = 0;
    let totalCredits = 0;
    gradesData.forEach(g => {
      totalPoints += gradePoints[g.grade] * g.credits;
      totalCredits += g.credits;
    });
    setGpa((totalPoints / totalCredits).toFixed(2));
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="grades-container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text" data-testid="grades-title">Grades</h1>
          <Card className="glass-effect px-6 py-4 border-white/10">
            <p className="text-sm text-gray-400">Current GPA</p>
            <p className="text-3xl font-bold text-cyan-400" data-testid="current-gpa">{gpa}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {grades.map((record, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`grade-card-${index}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white" data-testid={`grade-course-name-${index}`}>{record.course_name}</h3>
                  <p className="text-gray-400" data-testid={`grade-course-code-${index}`}>{record.course_code}</p>
                  <p className="text-sm text-gray-500 mt-1" data-testid={`grade-semester-${index}`}>Semester {record.semester}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" data-testid={`grade-value-${index}`}>
                    {record.grade}
                  </div>
                  <p className="text-sm text-gray-400 mt-1" data-testid={`grade-credits-${index}`}>{record.credits} Credits</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}