import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Marks() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/marks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMarks(response.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="marks-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="marks-title">Internal Marks</h1>

        <div className="grid grid-cols-1 gap-6">
          {marks.map((record, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`marks-card-${index}`}>
              <h3 className="text-xl font-semibold text-white mb-4" data-testid={`marks-course-name-${index}`}>{record.course_name}</h3>
              <p className="text-gray-400 mb-4" data-testid={`marks-course-code-${index}`}>{record.course_code}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">CAT-1</p>
                  <p className="text-2xl font-bold text-cyan-400" data-testid={`cat1-${index}`}>{record.cat1}/50</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">CAT-2</p>
                  <p className="text-2xl font-bold text-cyan-400" data-testid={`cat2-${index}`}>{record.cat2}/50</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Assignment</p>
                  <p className="text-2xl font-bold text-cyan-400" data-testid={`assignment-${index}`}>{record.assignment}/20</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">FAT</p>
                  <p className="text-2xl font-bold text-cyan-400" data-testid={`fat-${index}`}>{record.fat}/100</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-lg">
                  <p className="text-sm text-white">Total</p>
                  <p className="text-2xl font-bold text-white" data-testid={`total-${index}`}>{record.total}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}