"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function PreferencesPage() {
  const handleSave = () => {
    toast.success("Preferences saved successfully!")
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Preferences</h1>
        <p className="text-gray-400">Customize your VTOP experience.</p>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control how you receive alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-400">Receive daily digest of academic updates.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-400">Instant alerts for marks and announcements.</p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">SMS Alerts</Label>
                    <p className="text-sm text-gray-400">Urgent alerts on your registered mobile.</p>
                </div>
                <Switch />
            </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
            <CardTitle>Display</CardTitle>
            <CardDescription>Adjust visual settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">Reduced Motion</Label>
                    <p className="text-sm text-gray-400">Minimize animations across the dashboard.</p>
                </div>
                <Switch />
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label className="text-base">High Contrast</Label>
                    <p className="text-sm text-gray-400">Increase contrast for better readability.</p>
                </div>
                <Switch />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
        </Button>
      </div>
    </div>
  )
}
