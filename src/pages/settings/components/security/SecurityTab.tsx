
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const SecurityTab: React.FC = () => {
  const { toast } = useToast();

  const handleSavePassword = () => {
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your password and security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Two-Factor Authentication Section */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch id="two-factor" />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">
              <RotateCcw className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSavePassword} className="bg-primary">
              <Save className="mr-1 h-4 w-4" />
              Update Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SecurityTab;
