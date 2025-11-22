import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("vtop_token");
      await axios.post(
        `${API}/change-password`,
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in" data-testid="change-password-container">
        <h1 className="text-4xl font-bold mb-8 gradient-text" data-testid="change-password-title">Change Password</h1>

        <Card className="glass-effect p-8 border-white/10 max-w-xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-4 rounded-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Update Your Password</h2>
              <p className="text-gray-400 text-sm">Keep your account secure</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="old-password" className="text-gray-300">Current Password</Label>
              <Input
                id="old-password"
                data-testid="old-password-input"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
              <Input
                id="new-password"
                data-testid="new-password-input"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
              <Input
                id="confirm-password"
                data-testid="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <Button
              data-testid="change-password-button"
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              Change Password
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}