import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Home, Calendar } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Hostel() {
  const [hostel, setHostel] = useState(null);

  useEffect(() => {
    fetchHostel();
  }, []);

  const fetchHostel = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/hostel`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHostel(response.data);
    } catch (error) {
      console.error("Error fetching hostel:", error);
    }
  };

  if (!hostel) return <Layout><div className="text-center">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="hostel-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="hostel-title">Hostel Room Allotment</h1>

        <Card className="glass-effect p-8 border-white/10">
          <div className="flex items-start space-x-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-6 rounded-2xl">
              <Home className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-6">Your Room Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Block</p>
                  <p className="text-2xl font-semibold text-cyan-400" data-testid="hostel-block">{hostel.block}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Room Number</p>
                  <p className="text-2xl font-semibold text-cyan-400" data-testid="hostel-room">{hostel.room_number}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Bed Number</p>
                  <p className="text-2xl font-semibold text-cyan-400" data-testid="hostel-bed">{hostel.bed_number}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Allotment Date</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <p className="text-xl font-semibold text-white" data-testid="hostel-date">{hostel.allotment_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}