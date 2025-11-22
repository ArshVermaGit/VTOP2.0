import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function LeaveRequest() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    leave_type: "Sick Leave",
    from_date: "",
    to_date: "",
    reason: ""
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/leave-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("vtop_token");
      await axios.post(`${API}/leave-requests`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Leave request submitted successfully!");
      fetchLeaves();
      setFormData({ leave_type: "Sick Leave", from_date: "", to_date: "", reason: "" });
    } catch (error) {
      toast.error("Failed to submit leave request");
    }
  };

  const getStatusColor = (status) => {
    if (status === "Approved") return "text-green-400";
    if (status === "Rejected") return "text-red-400";
    return "text-yellow-400";
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="leave-request-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="leave-request-title">Leave Request</h1>

        <Card className="glass-effect p-6 border-white/10 mb-8" data-testid="leave-form-card">
          <h2 className="text-2xl font-semibold mb-6 text-white">Submit New Leave Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="leave-type" className="text-gray-300">Leave Type</Label>
              <Input
                id="leave-type"
                data-testid="leave-type-input"
                value={formData.leave_type}
                onChange={(e) => setFormData({...formData, leave_type: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from-date" className="text-gray-300">From Date</Label>
                <Input
                  id="from-date"
                  data-testid="from-date-input"
                  type="date"
                  value={formData.from_date}
                  onChange={(e) => setFormData({...formData, from_date: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="to-date" className="text-gray-300">To Date</Label>
                <Input
                  id="to-date"
                  data-testid="to-date-input"
                  type="date"
                  value={formData.to_date}
                  onChange={(e) => setFormData({...formData, to_date: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reason" className="text-gray-300">Reason</Label>
              <Textarea
                id="reason"
                data-testid="reason-textarea"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                rows={4}
                required
              />
            </div>
            <Button
              data-testid="submit-leave-button"
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Submit Request
            </Button>
          </form>
        </Card>

        <h2 className="text-2xl font-semibold mb-4 text-white">Previous Requests</h2>
        <div className="grid grid-cols-1 gap-6">
          {leaves.map((leave, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`leave-history-card-${index}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white" data-testid={`leave-type-${index}`}>{leave.leave_type}</h3>
                  <p className="text-gray-400" data-testid={`leave-dates-${index}`}>{leave.from_date} to {leave.to_date}</p>
                  <p className="text-gray-300 mt-2" data-testid={`leave-reason-${index}`}>{leave.reason}</p>
                </div>
                <span className={`font-semibold ${getStatusColor(leave.status)}`} data-testid={`leave-status-${index}`}>
                  {leave.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}