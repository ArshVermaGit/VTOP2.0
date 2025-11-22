import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Clock, MapPin, User } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function TimeTable() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/timetable`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimetable(response.data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  const groupByDay = () => {
    const grouped = {};
    timetable.forEach(item => {
      if (!grouped[item.day]) grouped[item.day] = [];
      grouped[item.day].push(item);
    });
    return grouped;
  };

  const groupedTimetable = groupByDay();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="timetable-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="timetable-title">Time Table</h1>

        <div className="space-y-6">
          {days.map((day, dayIndex) => (
            <Card key={dayIndex} className="glass-effect p-6 border-white/10" data-testid={`day-card-${day.toLowerCase()}`}>
              <h2 className="text-2xl font-semibold text-white mb-4" data-testid={`day-title-${day.toLowerCase()}`}>{day}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedTimetable[day]?.map((slot, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg" data-testid={`slot-${day.toLowerCase()}-${index}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400" data-testid={`slot-time-${day.toLowerCase()}-${index}`}>{slot.slot}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white" data-testid={`slot-course-${day.toLowerCase()}-${index}`}>{slot.course_name}</h3>
                    <p className="text-gray-400 text-sm" data-testid={`slot-code-${day.toLowerCase()}-${index}`}>{slot.course_code}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400" data-testid={`slot-faculty-${day.toLowerCase()}-${index}`}>{slot.faculty}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400" data-testid={`slot-venue-${day.toLowerCase()}-${index}`}>{slot.venue}</span>
                      </div>
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