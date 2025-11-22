import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { MessageSquare, Calendar, User } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="messages-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="messages-title">Class Messages</h1>

        <div className="grid grid-cols-1 gap-6">
          {messages.map((message, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`message-card-${index}`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1" data-testid={`message-course-name-${index}`}>{message.course_name}</h3>
                  <p className="text-gray-400 text-sm mb-3" data-testid={`message-course-code-${index}`}>{message.course_code}</p>
                  <p className="text-gray-300 mb-3" data-testid={`message-content-${index}`}>{message.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span data-testid={`message-faculty-${index}`}>{message.faculty}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span data-testid={`message-date-${index}`}>{message.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}