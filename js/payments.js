import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Calendar, CreditCard, CheckCircle } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("vtop_token");
      const response = await axios.get(`${API}/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="payments-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="payments-title">Payment History</h1>

        <div className="grid grid-cols-1 gap-6">
          {payments.map((payment, index) => (
            <Card key={index} className="glass-effect p-6 border-white/10" data-testid={`payment-card-${index}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2" data-testid={`payment-description-${index}`}>{payment.description}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm" data-testid={`payment-transaction-id-${index}`}>{payment.transaction_id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm" data-testid={`payment-date-${index}`}>{payment.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-400 mb-2" data-testid={`payment-amount-${index}`}>₹{payment.amount.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm" data-testid={`payment-status-${index}`}>{payment.status}</span>
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